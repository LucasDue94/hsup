import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from "@angular/forms";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AlmoxarifeService } from "../core/almoxarife/almoxarife.service";
import { Produto } from "../core/produto/produto";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Solicitacao } from "../core/solicitacao/solicitacao";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { ItemService } from "../core/item/item.service";
import { Item } from "../core/item/item";

@Component({
    selector: 'almoxarife',
    templateUrl: './almoxarife.component.html',
    styleUrls: ['./almoxarife.component.scss']
})
export class AlmoxarifeComponent implements OnInit {

    wpdProducts: Produto[] = [];
    almoxarifeList: Produto[] = [];
    solicitacao = new Solicitacao();
    wpdProductsFiltered = new Map();
    form;
    currentInput;
    countTotal: number;
    countSearch = 0;
    create;
    cod: FormControl;
    stock: FormControl;
    desc: FormControl;
    offset = 0;
    limit = 10;
    errors: any[];

    constructor(private almoxarifeService: AlmoxarifeService, private solicitacaoService: SolicitacaoService,
                private itemService: ItemService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.cod = null;
        this.stock = null;
        this.desc = null;
        this.create = true;

        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.solicitacaoService.get(params.id).subscribe((solicitacao: Solicitacao) => {
                    this.create = false;
                    this.solicitacao = solicitacao;
                    console.log(this.solicitacao);
                    this.buildForm();
                });
            }
        });

        this.almoxarifeService.count().subscribe((quantity: number) => {
            this.countTotal = quantity;
        });
    }

    buildForm() {
        this.form = this.fb.array([]);
        this.solicitacao.itens.forEach(item => {
            this.form.push(this.createGroup(item));
        });
    }

    createGroup(item) {
        return this.fb.group({
            itemSolicitacao: this.fb.group({
                descricao: new FormControl(item.item.descricao),
                quantidade: new FormControl(item.quantidade)
            }),
            produto: this.fb.group({
                codigo: '',
                descricao: '',
                estoque: ''
            })
        })
    }

    find(input, scrollActived = false) {
        this.currentInput = input;
        const currentControl = this.form.get(input.id + '.produto.descricao');

        currentControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(v =>
                this.almoxarifeService.countList(v, this.countTotal)).subscribe((count: number) => {
            this.countSearch = count;
        });

        if (scrollActived) {
            this.offset += 10;
            console.log(this.offset);
            console.log(this.countSearch);
            if (this.offset < this.countSearch) {
                this.almoxarifeService.search(currentControl.value, this.offset, '').subscribe((produtos: Produto[]) => {
                    this.almoxarifeList = produtos;
                    if (this.almoxarifeList.length > 0) {
                        this.almoxarifeList.forEach(item => {
                            this.wpdProducts.push(item);
                        });
                    }
                });
            }
        } else {
            this.offset = 0;
            currentControl.valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .subscribe(inputValue => {
                    if (inputValue == '') this.clearInputs();
                    if (inputValue != '' && inputValue != null) {
                        this.almoxarifeService.search(inputValue, this.offset, this.limit)
                            .subscribe((produtos: Produto[]) => {
                                let current = '';
                                this.wpdProductsFiltered.clear();
                                this.wpdProducts.length = 0;
                                for (const a of produtos) {
                                    a['codigo'] = a['codigo'].replace(/\s/g, '');
                                    if (!this.wpdProductsFiltered.has(a['codigo'])) {
                                        this.wpdProductsFiltered.set(a['codigo'], a);
                                        current = this.wpdProductsFiltered.get(a['codigo']);
                                    } else {
                                        current['estoque'] = +current['estoque'] + +a['estoque'];
                                    }
                                }
                                this.wpdProductsFiltered.forEach(v => {
                                    if (this.currentInput.value != v.descricao) {
                                        this.wpdProducts.push(v)
                                    }
                                });
                            });
                    }
                });
        }
    }

    clearInputs() {
        this.setFields();
        if (this.cod.value == '' || this.desc.value == '') {
            this.cod.reset('');
            this.desc.reset('');
            this.stock.reset('');
            this.wpdProducts.length = 0;
            this.offset = 0;
        }
    }

    setFields() {
        let index = this.currentInput.id;
        const currentGroup = this.form.controls as FormArray;
        this.cod = currentGroup[index].controls['produto'].controls['codigo'];
        this.desc = currentGroup[index].controls['produto'].controls['descricao'];
        this.stock = currentGroup[index].controls['produto'].controls['estoque'];
    }

    select(produtoWpd) {
        this.setFields();
        this.cod.setValue(produtoWpd.codigo);
        this.desc.setValue(produtoWpd.descricao);
        this.stock.setValue(produtoWpd.estoque);
        this.offset = 0;
        this.wpdProducts.length = 0;
        this.attachProduto(this.currentInput.id);
    }

    attachProduto(index?) {

        /*let group = this.form.controls;
        for (let i = 0; i < this.form.controls.length; i++) {
            console.log(group[i]);
            this.solicitacao.itens.forEach((solicitacaoItem: any) => {
                if (solicitacaoItem.item.descricao == group[i].controls.itemSolicitacao.value.descricao)
                    solicitacaoItem.item.produto = group[i].controls.produto.value.codigo;
                console.log(solicitacaoItem.item.produto);
            });
        }*/
        this.form.controls.forEach(group => {
            console.log(group);
            this.solicitacao.itens.forEach((solicitacaoItem: any) => {
                if (solicitacaoItem.item.descricao == group.controls.itemSolicitacao.value.descricao)
                    solicitacaoItem.item.produto = group.controls.produto.value.codigo;
            });
        });
    }

    saveItems() {
        this.solicitacao.itens.forEach((solicitacaoItem: any) => {
            console.log(solicitacaoItem.item as Item);
            if (solicitacaoItem.item.codigo != '') {
                this.itemService.save(solicitacaoItem.item as Item).subscribe((item: Item) => {
                    let r = this.router;
                    setTimeout(function () {
                        r.navigate(['/almoxarife']);
                    }, 2000);
                }, (res: any) => {
                    const json = res.error;
                    if (json.hasOwnProperty('message')) {
                        this.errors = [json];
                    } else {
                        this.errors = json._embedded.errors;
                    }
                })
            }
        });

    }
}