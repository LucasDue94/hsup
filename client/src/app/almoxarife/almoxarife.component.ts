import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
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
    currentInput;
    form;
    offset = 0;
    errors: any[];
    message;
    hasItems;

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

    createGroup(solicitacaoItem) {
        return this.fb.group({
                descricao: this.createControl(solicitacaoItem.item, 'descricao'),
                quantidade: this.createControl(solicitacaoItem,'quantidade'),
                produto: this.fb.group({
                    id: this.createControl(solicitacaoItem.item.produto, 'id'),
                    descricao: this.createControl(solicitacaoItem.item.produto, 'descricao'),
                    estoque: this.createControl(solicitacaoItem.item.produto, 'estoque')
                })
            }
        );
    }

    createControl(produto, value) {
        if (produto == null) return '';
        return new FormControl(produto[value]);
    }


    find(input, scrollActived = false) {
        this.currentInput = input;
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
            this.offset = 0;
            currentControl.valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .subscribe(inputValue => {
                    if (inputValue != '')
                        this.almoxarifeService.search(inputValue, this.offset)
                            .subscribe((produtos: Produto[]) => {
                                this.wpdProducts = produtos;
                                this.hasItems = produtos.length == 0 ? 'Nenhum item encontrado' : null;
                                produtos.forEach(produto => {
                                    if (produto.descricao == inputValue) {
                                        this.renderer.setProperty(input.nextSibling, 'hidden', true);
                                        this.wpdProducts.length = 0;
                                    }
                                });

                            });
                    else this.clearInputs();
                    if (this.wpdProducts.length > 0) {
                        this.renderer.setProperty(input.nextSibling, 'hidden', false)
                    }
                });
        }
    }

    clearInputs() {
        const controls = this.getControls('produto');
        for (const c of Object.keys(controls)) controls[c].reset('');
        this.wpdProducts.length = 0;
    }

    select(produtoWpd) {
        const controls = this.getControls('produto');
        for (const c of Object.keys(controls)) controls[c].setValue(produtoWpd[c]);
        this.attachProduto(produtoWpd);
        this.wpdProducts.length = 0;
    }

    getControls = (group) => this.form.controls[this.currentInput.id].controls[group].controls;

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
                this.message = 'Produtos associados com sucesso!';
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