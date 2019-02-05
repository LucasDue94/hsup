import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from "@angular/forms";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AlmoxarifeService } from "../core/almoxarife/almoxarife.service";
import { Produto } from "../core/produto/produto";
import { ActivatedRoute, Params } from "@angular/router";
import { Solicitacao } from "../core/solicitacao/solicitacao";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { ItemService } from "../core/item/item.service";
import { Item } from "../core/item/item";
import { Observable } from "rxjs";

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
    setor;
    offset = 0;
    limit = 10;
    errors: any[];

    constructor(private almoxarifeService: AlmoxarifeService, private solicitacaoService: SolicitacaoService, private itemService: ItemService,
                private fb: FormBuilder, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.cod = null;
        this.stock = null;
        this.setor = null;
        this.desc = null;
        this.create = true;

        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.solicitacaoService.get(params.id).subscribe((solicitacao: Solicitacao) => {
                    this.create = false;
                    this.solicitacao = solicitacao;
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
        console.log(this.form);
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
        if (scrollActived) {
            this.offset += 10;
            this.almoxarifeService.search(currentControl.value, this.offset, '').subscribe((produtos: Produto[]) => {
                this.almoxarifeList = produtos;
                if (this.almoxarifeList.length > 0) {
                    this.almoxarifeList.forEach(item => {
                        this.wpdProducts.push(item);
                    });
                }
            });
        } else {
            this.offset = 0;
            currentControl.valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .subscribe(inputValue => {
                    if (inputValue == '') {
                        this.wpdProducts.length = 0;
                    }
                    if (inputValue != '' && inputValue != null) {
                        this.almoxarifeService.search(inputValue, this.offset, '').subscribe((produtos: Produto[]) => {
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
            currentControl.valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .switchMap(v =>
                    this.almoxarifeService.countList(v, this.countTotal)).subscribe((count: number) => {
                this.countSearch = count;
            });
        }
    }

    setFields(index) {
        const currentGroup = this.form.controls as FormArray;
        this.cod = currentGroup[index].controls['produto'].controls['codigo'];
        this.desc = currentGroup[index].controls['produto'].controls['descricao'];
        this.stock = currentGroup[index].controls['produto'].controls['estoque'];
    }

    select(item) {
        this.setFields(this.currentInput.id);
        this.cod.setValue(item.codigo);
        this.desc.setValue(item.descricao);
        this.stock.setValue(item.estoque);
        this.offset = 0;
        this.wpdProducts.length = 0;
    }

    clearInputs() {
        const currentGroup = this.form.controls as FormArray;
        this.setFields(this.currentInput.id);
        if (this.cod.value == '' || this.desc.value == '') {
            console.log(currentGroup);
            currentGroup[this.currentInput.id].controls['produto'].reset();
            this.wpdProducts.length = 0;
            this.offset = 0;
        }
    }

    getProduto(wpdProd) {

        const novo = new Produto();
        novo.descricao = wpdProd.descricao;
        novo.estoque = wpdProd.estoque;
        novo.codigo = wpdProd.codigo;
        console.log(novo);
        return novo;
    }


    saveItems() {
        this.form.controls.forEach(group => {
            this.solicitacao.itens.forEach(item => {
                if (item.item.descricao == group.controls.itemSolicitacao.value.descricao)
                    item.item.produto = this.getProduto(group.controls.produto.value);
            });
        });
        this.solicitacao.itens.forEach(item => console.log(item.item));

        this.solicitacao.itens.forEach(item =>
            this.itemService.save(item.item as Item).subscribe((item: Item) => {}, (res) => {
                console.log(item);
                const json = res.error;
                if (json.hasOwnProperty('message')) {
                    this.errors = [json];
                } else {
                    this.errors = json._embedded.errors;
                }
            })
        );
    }

}