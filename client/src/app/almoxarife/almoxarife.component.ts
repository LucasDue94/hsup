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
import { Authentic } from "../authentic";

@Component({
    selector: 'almoxarife',
    templateUrl: './almoxarife.component.html',
    styleUrls: ['./almoxarife.component.scss']
})
export class AlmoxarifeComponent extends Authentic implements OnInit {

    wpdProducts: Produto[] = [];
    solicitacao = new Solicitacao();
    errors: any[] = [];
    notFoundMessage: string;
    message: string;
    offset: number = 0;
    form;

    constructor(private almoxarifeService: AlmoxarifeService, private solicitacaoService: SolicitacaoService,
                private itemService: ItemService, private fb: FormBuilder, private route: ActivatedRoute,
                private router: Router, private render: Renderer2) {
        super();
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

    @HostListener('document:keydown', ['$event']) onKeydownHandler(e: KeyboardEvent) {
        if (e.key === 'F5' && !confirm('Você tem certeza que deseja atualizar a página? Seus dados não salvos serão perdidos.'))
            return false;
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
        this.solicitacao.itens.forEach((solicitacaoItem) => {
            if (solicitacaoItem.item.produto != undefined) {
                if (solicitacaoItem.item.produto.id == id) {
                    value = solicitacaoItem.item.produto.descricao;
                }
            }
        });
        return value;
    }

    undo(input) {
        const produtoId = this.getControls('produto', input)['id'];
        input.value = produtoId != '' ? this.getProduto(produtoId.value) : '';
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
        let item: Item = this.getItem(this.form.controls[input.id].controls.descricao.value);
        if (item.produto != undefined) item.produto.id = null;
        this.offNotFound(input);
    }

    getItem(itemName): any {
        let item = new Item();
        this.solicitacao.itens.forEach((solicitacaoItem) => {
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
        this.solicitacao.itens.forEach((solicitacaoItem) => {
            if (solicitacaoItem.item.produto != undefined) {
                delete solicitacaoItem.item.produto.estoque;
                delete solicitacaoItem.item.produto.descricao;
            }
            this.itemService.save(solicitacaoItem.item as Item).subscribe((item: Item) => {
                console.log(solicitacaoItem);

            }, (res: any) => {
                const json = res.error;
                if (json.hasOwnProperty('message')) {
                    this.errors = [json];
                } else {
                    this.errors = json._embedded.errors;
                }
            })
        });

        if (this.errors != undefined && this.errors.length == 0) {
            this.almoxarifeService.validaAlmoxarife(this.solicitacao).subscribe((solicitacao: Solicitacao) => {
                let r = this.router;
                this.message = 'Produtos associados com sucesso!';
                setTimeout(function () {
                    r.navigate(['/solicitacao']);
                }, 2000);
            });
        }
    }

    finish() {
        this.solicitacaoService.finish(this.solicitacao).subscribe((solicitacao: Solicitacao) => {
            let r = this.router;
            this.message = 'O solicitante retirou o produto.' + '/n' +  'Solicitação encerrada com sucesso!';
            setTimeout(function () {
                r.navigate(['/solicitacao']);
            }, 2000);
        });
    }

    checkPermission: (permission: string) => boolean;

}