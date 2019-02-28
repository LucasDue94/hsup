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
    errors: any[];
    notFoundMessage: string;
    message: string;
    offset: number = 0;
    form;

    constructor(private almoxarifeService: AlmoxarifeService, private solicitacaoService: SolicitacaoService,
                private itemService: ItemService, private fb: FormBuilder, private route: ActivatedRoute,
                private router: Router, private render: Renderer2) {
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
        if (!scrollActived) {
            this.getControls('produto', input)['descricao'].valueChanges.debounceTime(1000)
                .distinctUntilChanged()
                .switchMap(value => {
                    if (value == '') this.clearControls(input);
                    return this.almoxarifeService.search(value, 0);
                })
                .subscribe(produtos => {
                    this.wpdProducts = produtos;
                    this.loadResult(input);
                });
        } else {
            this.offsetScroll(input);
        }
    }

    offsetScroll(input) {
        this.offset += 10;
        this.almoxarifeService.search(this.getControls('produto', input)['descricao'].value, this.offset).subscribe((produtos: Produto[]) => {
            const offsetList = produtos;
            if (offsetList.length > 0) {
                offsetList.forEach(item => {
                    this.wpdProducts.push(item);
                });
            }
        });
    }

    loadResult(input) {
        if (this.wpdProducts.length > 0) {
            this.openList(input);
            this.offNotFound(input);
        } else {
            this.onNotFound(input);
        }
    }

    offNotFound(input) {
        this.notFoundMessage = null;
        this.render.setProperty(input.nextSibling.nextSibling, 'hidden', true);
    }

    onNotFound(input) {
        this.notFoundMessage = 'Nenhum produto encontrado!';
        this.render.setProperty(input.nextSibling.nextSibling, 'hidden', false);
    }

    openList = (input) => this.render.setProperty(input.nextSibling, 'hidden', false);

    closeList = (input) => setTimeout(() => {
        this.close(input);
        this.wpdProducts.length = 0;
        this.undo(input);
    }, 400);

    close = (input) => this.render.setProperty(input.nextSibling, 'hidden', true);

    getProduto(id) {
        let value = '';
        this.solicitacao.itens.forEach((solicitacaoItem: any) => {
            if (solicitacaoItem.item.produto.id == id) {
                value = solicitacaoItem.item.produto.descricao;
            }
        });
        return value;
    }

    undo(input) {
        const proId = this.getControls('produto', input)['id'];
        input.value = proId != '' ? this.getProduto(proId.value) : '';
    }

    select(produto, input) {
        const controls = this.getControls('produto', input);
        for (const c of Object.keys(controls)) controls[c].setValue(produto[c], {emitEvent: false});
        this.setProduto(produto, input);
        this.close(input);
        this.wpdProducts.length = 0;
    }

    getControls = (group, input) => this.form.controls[input.id].controls[group].controls;

    clearControls(input) {
        const controls = this.getControls('produto', input);
        for (const c of Object.keys(controls)) controls[c].reset('');
        this.closeList(input);
        this.setProduto(null, input);
        this.offNotFound(input);
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

    setProduto(produto, input) {
        let item: Item = this.getItem(this.form.controls[input.id].controls.descricao.value);
        item.produto = produto != null ? new Produto({
            id: produto.id,
            descricao: produto.descricao,
            estoque: produto.estoque
        }) : new Produto();
    }

    save() {
        this.solicitacao.itens.forEach((solicitacaoItem: any) => {
            delete solicitacaoItem.item.produto.estoque;
            delete solicitacaoItem.item.produto.descricao;
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