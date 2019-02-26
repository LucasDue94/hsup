import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
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
    solicitacao = new Solicitacao();
    currentInput;
    form;
    offset = 0;
    errors: any[];
    message;
    selected;
    itemsNotFound;
    last;

    constructor(private almoxarifeService: AlmoxarifeService, private solicitacaoService: SolicitacaoService,
                private itemService: ItemService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private render: Renderer2) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.solicitacaoService.get(params.id).subscribe((solicitacao: Solicitacao) => {
                    this.solicitacao = solicitacao;
                    this.buildForm();
                    this.solicitacao.itens.forEach(item => {
                    });
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
                quantidade: new FormControl(solicitacaoItem.quantidade + ' ' + solicitacaoItem.unidadeMedida),
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
        this.itemsNotFound = null;
        this.currentInput = input;
        this.last = this.currentInput.value;
        if (!scrollActived) {
            this.selected = false;
            this.offset = 0;
            this.getControls('produto')['descricao']
                .valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .subscribe(inputValue => {
                    if (inputValue != '') {
                        if (!this.selected) {
                            this.almoxarifeService.search(inputValue, this.offset)
                                .subscribe((produtos: Produto[]) => {
                                    this.wpdProducts = produtos;
                                    console.log(this.form.get(this.currentInput.id).value);
                                    this.setConfig();
                                });
                        }
                    } else {
                        this.clearControls();
                        this.attachProduto(null);
                        this.itemsNotFound = null;
                        this.last = ''
                    }
                });

        } else {
            this.offsetScroll();
        }
    }

    setConfig() {
        if (this.wpdProducts.length > 0) {
            this.itemsNotFound = null;
            this.openList();
        } else {
            this.itemsNotFound = 'Nenhum produto encontrado!';
        }
    }

    offsetScroll() {
        this.offset += 10;
        this.almoxarifeService.search(this.getControls('produto')['descricao'].value, this.offset).subscribe((produtos: Produto[]) => {
            const offsetList = produtos;
            if (offsetList.length > 0) {
                offsetList.forEach(item => {
                    this.wpdProducts.push(item);
                });
            }
        });
    }

    getInput = () => this.currentInput;

    closeList = () => setTimeout(() => {
        this.close();
    }, 400);

    close() {
        const scroll = document.getElementById('scroll' + this.getInput().id);
        this.render.setProperty(scroll, 'hidden', true);
        this.wpdProducts.length = 0;
        if (this.selected == false) this.currentInput.value = this.last;
    }

    openList() {
        const scroll = document.getElementById('scroll' + this.currentInput.id);
        this.render.setProperty(scroll, 'hidden', false);
    }

    select(produto) {
        this.selected = true;
        const controls = this.getControls('produto');
        for (const c of Object.keys(controls)) controls[c].setValue(produto[c]);
        this.attachProduto(produto.id);
        this.wpdProducts.length = 0;
        this.closeList();
    }

    getControls = (group) => this.form.controls[this.currentInput.id].controls[group].controls;

    clearControls() {
        const controls = this.getControls('produto');
        for (const c of Object.keys(controls)) {
            controls[c].reset('');
            console.log(controls[c]);
        }
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

    attachProduto(produtoId) {
        let item: Item = this.getItem(this.form.controls[this.currentInput.id].controls.descricao.value);
        item.produto = new Produto({id: produtoId});
        delete item.produto.estoque;
        delete item.produto.descricao;
    }

    save() {
        this.solicitacao.itens.forEach((solicitacaoItem: any) => {
            console.log(solicitacaoItem);
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