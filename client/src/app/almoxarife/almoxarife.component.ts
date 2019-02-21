import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
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

    @ViewChild('scroll') scroll;
    wpdProducts: Produto[] = [];
    almoxarifeList: Produto[] = [];
    solicitacao = new Solicitacao();
    cod: FormControl;
    stock: FormControl;
    desc: FormControl;
    form;
    currentInput;
    offset = 0;
    errors: any[];

    constructor(private almoxarifeService: AlmoxarifeService, private solicitacaoService: SolicitacaoService,
                private itemService: ItemService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.solicitacaoService.get(params.id).subscribe((solicitacao: Solicitacao) => {
                    this.solicitacao = solicitacao;
                    this.buildForm();
                });
            }
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
                descricao: new FormControl(item.item.descricao),
                quantidade: new FormControl(item.quantidade),
                produto: this.fb.group({
                    codigo: item.item.produto != null || item.item.produto != undefined ? new FormControl(item.item.produto.id) : '',
                    descricao: item.item.produto != null || item.item.produto != undefined ? new FormControl(item.item.produto.descricao) : '',
                    estoque: item.item.produto != null || item.item.produto != undefined ? new FormControl(item.item.produto.estoque) : ''
                })
            }
        );
    }

    find(input, scrollActived = false) {
        this.currentInput = input;
        this.setFields();
        const currentControl = this.form.get(input.id + '.produto.descricao');

        if (scrollActived) {
            this.offset += 10;
            this.almoxarifeService.search(currentControl.value, this.offset).subscribe((produtos: Produto[]) => {
                this.almoxarifeList = produtos;
                if (this.almoxarifeList.length > 0) {
                    this.almoxarifeList.forEach(item => {
                        this.wpdProducts.push(item);
                    });
                }
            });
        } else {
            currentControl.valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .subscribe(inputValue => {
                    if (inputValue == '') this.clearInputs();
                    if (inputValue != null) {
                        this.almoxarifeService.search(inputValue, this.offset)
                            .subscribe((produtos: Produto[]) => {
                                this.wpdProducts = produtos;

                                if (this.wpdProducts.length > 0) {
                                    setTimeout(this.setScroll, 1000);
                                } else {
                                    alert('item não encontrado');
                                    this.clearInputs();
                                }
                                produtos.forEach(produto => {
                                    if (produto.descricao == inputValue) {
                                        this.renderer.setProperty(input.nextSibling, 'hidden', true);
                                        this.wpdProducts.length = 0;
                                    }
                                });
                            });
                        if (this.wpdProducts.length > 0) {
                            this.renderer.setProperty(input.nextSibling, 'hidden', false)
                        }
                    }
                });

        }
    }

    setScroll() {
        this.renderer.addClass(this.scroll.nativeElement, 'on');
    }
    removeScroll(){
        this.renderer.removeClass(this.scroll.nativeElement, 'off');
    }

    clearInputs() {
        this.removeScroll();
        if (this.cod.value == '' || this.desc.value == '') {
            this.cod.reset('');
            this.desc.reset('');
            this.stock.reset('');
            this.wpdProducts.length = 0;
            this.offset = 0;
        }
    }

    setFields() {
        const currentGroup = this.form.controls as FormArray;
        this.cod = currentGroup[this.currentInput.id].controls['produto'].controls['codigo'];
        this.desc = currentGroup[this.currentInput.id].controls['produto'].controls['descricao'];
        this.stock = currentGroup[this.currentInput.id].controls['produto'].controls['estoque'];
    }

    select(produtoWpd) {
        this.cod.setValue(produtoWpd.id);
        this.desc.setValue(produtoWpd.descricao);
        this.stock.setValue(produtoWpd.estoque);
        this.attachProduto(produtoWpd);
        this.offset = 0;
        this.wpdProducts.length = 0;
    }

    getItem(itemName): any {
        let item = new Item();
        this.solicitacao.itens.forEach((solicitacaoItem: any) => {
            if (itemName == solicitacaoItem.item.descricao) {
                item = solicitacaoItem.item;
            }
        });
        return item;
    }

    attachProduto(produtoWpd) {
        let item: Item = this.getItem(this.form.controls[this.currentInput.id].controls.descricao.value);
        item.produto = new Produto(produtoWpd);
        delete item.produto.estoque;
        delete item.produto.descricao;
    }

    save() {
        this.solicitacao.itens.forEach((solicitacaoItem: any) => {
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
        });
    }
}