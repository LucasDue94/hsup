import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import { Router } from "@angular/router";
import { Item } from "../core/item/item";
import { UnidadeMedida } from "../core/unidadeMedida/unidadeMedida";

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit, AfterContentInit {

    @ContentChild(SolicitacaoCreateComponent, {read: ElementRef}) content: QueryList<SolicitacaoCreateComponent>;
    @ViewChildren('stepItem', {read: ElementRef}) stepItem;

    countItemInput = 1;
    countFabricanteInput = 1;
    countFornecedorInput = 1;
    items: Item[] = [];
    unidades: UnidadeMedida[] = [];

    constructor(private route: Router) {
    }

    ngOnInit() {
    }

    cancel = () => this.route.navigate(['solicitacao']);

    addField(event) {
        let parentNode = null;
        event.parentNode.childNodes.forEach(e => {
            if (e.classList.contains('solicitacao-group')) parentNode = e.cloneNode(true);
        });

        for (let parent of parentNode.childNodes) {
            for (let child of parent.childNodes) if (child.nodeName == 'INPUT') child.value = '';
        }

        if (this.countItemInput < 10 && parentNode.id == 'item') event.parentElement.appendChild(parentNode);
        if (parentNode.id == 'item') this.countItemInput += 1;
        if (parentNode.id == 'fabricante') {
            event.parentElement.appendChild(parentNode);
            this.countFabricanteInput += 1;
        } else if (parentNode.id == 'fornecedor') {
            event.parentElement.appendChild(parentNode);
            this.countFornecedorInput += 1;
        }
    }

    ngAfterContentInit(): void {
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.key === 'F5' && !confirm('Você tem certeza que deseja atualizar a página? Seus dados serão apagados.')) return false;
    }

    @HostListener('document:click', ['$event']) removeField(event) {
        if (event.target.parentNode != null) {
            const parentElement = event.target.parentNode.parentNode;
            let element = event.target.parentNode;
            if (event.target.name == 'button-cancel' && this.countItemInput > 1) {
                parentElement.removeChild(element);
                this.countItemInput -= 1;
            }

            if (event.target.name == 'button-cancel-2' && this.countFabricanteInput > 1) {
                parentElement.removeChild(element);
                this.countFabricanteInput -= 1;
            }

            if (event.target.name == 'button-cancel-3' && this.countFornecedorInput > 1) {
                parentElement.removeChild(element);
                this.countFornecedorInput -= 1;
            }
        }
    }

    add() {
        let firstStepNodes = this.stepItem._results[0].nativeElement.childNodes;
        firstStepNodes.forEach(e => {
            if (e.id == 'item') {
                e.childNodes.forEach(node => {
                    node.childNodes.forEach(n => {
                        if (n.nodeName == 'INPUT') {
                            if (n.id == 'unidade_medida') this.unidades.push(n.value);
                        }
                    })
                });
            }
        })
    }
}
