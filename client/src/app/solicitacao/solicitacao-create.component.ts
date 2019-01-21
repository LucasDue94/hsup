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
import { UnidadeMedida } from "../core/unidadeMedida/unidadeMedida";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { ItemService } from "../core/item/item.service";

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit, AfterContentInit {

    @ContentChild(SolicitacaoCreateComponent, {read: ElementRef}) content: QueryList<SolicitacaoCreateComponent>;
    @ViewChildren('stepItem', {read: ElementRef}) stepItem;

    controlArray: FormGroup;
    fields: FormArray;
    unidades: UnidadeMedida[] = [];
    controlArray;

    constructor(private route: Router, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.controlArray = this.fb.group({
            items: this.fb.array([this.fb.group({
                descricao0: '',
                quantidade0: ''
            })])
        });
    }

    cancel = () => this.route.navigate(['solicitacao']);

    /*addField(event) {
        let parentNode = null;
        event.parentNode.childNodes.forEach(e => {
            if (e.classList.contains('solicitacao-group')) parentNode = e.cloneNode(true);
        });

        for (let parent of parentNode.childNodes) {
            for (let child of parent.childNodes) {
                if (child.nodeName == 'INPUT') {
                    let controlName = child.getAttribute('name');
                    this.inputBuilder(child, controlName);
                    child.addEventListener("focus", event => this.findItem(event.target));
                    this.addFormControl(controlName);
                }
            }
        }

        if (this.countItemInput < 10 && parentNode.id == 'item') {
            event.parentElement.appendChild(parentNode);
        }
        if (parentNode.id == 'item') this.countItemInput += 1;
        if (parentNode.id == 'fabricante') {
            event.parentElement.appendChild(parentNode);
            this.countFabricanteInput += 1;
        } else if (parentNode.id == 'fornecedor') {
            event.parentElement.appendChild(parentNode);
            this.countFornecedorInput += 1;
        }
    }*/

    inputBuilder(input, name) {
        input.setAttribute('formControlName', name);
        input.setAttribute('ng-reflect-name', name);
        input.name = name;
        input.id = name;
        input.value = '';
        input.previousElementSibling.setAttribute('for', name);
    }

    createFormControl(type) {
        if (type == 'items') {
            return this.fb.group({
                descricao: ''
            });
        } else if (type == 'fabricantes') {
            return this.fb.group({
                fantasia: '',
            });
        }
    }

    addField(event, type: string) {
        this.fields = this.controlArray.get(type) as FormArray;
        this.fields.push(this.createFormControl(type));
        console.log(event.parentNode.childNodes.previousSibling);
    }

    remove(event, type: string) {
    }

    ngAfterContentInit(): void {
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.key === 'F5' && !confirm('Você tem certeza que deseja atualizar a página? Seus dados serão apagados.')) return false;
    }

    @HostListener('document:click', ['$event']) removeField(event) {
        if (event.target != null && event.target.parentNode != null && event.target.name == 'button-cancel') {
            const containerInput = event.target.parentNode.parentNode;
            let inputs = event.target.parentNode;
            let previousLength = 0;
            let nextLength = 0;
            let nextSibling;

            if (event.target.parentNode.previousSibling != null)
                previousLength = event.target.parentNode.previousSibling.childNodes.length;

            if (event.target.parentNode.nextSibling != null) nextSibling = event.target.parentNode.nextSibling.childNodes;

            if (nextSibling != undefined && nextSibling.item(0).childNodes.length > 0) nextLength = nextSibling.length;

            if (previousLength > 0 || nextLength > 0) containerInput.removeChild(inputs);
        }
    }

    add() {
        let firstStepNodes = this.stepItem._results[0].nativeElement.childNodes;
        firstStepNodes.forEach(e => {
            if (e.id == 'item') {
                e.childNodes.forEach(node => {
                    node.childNodes.forEach(n => {
                        if (n.nodeName == 'INPUT') {
                        }
                    })
                });
            }
        })
    }

    findItem(event) {
        let currentInput;
        currentInput = this.getFormControl(event.name).items.controls.controls;
        if (currentInput != undefined) {
            currentInput.valueChanges.debounceTime(1000).subscribe(e => console.log(e));
        }
    }

    getFormControl = (controlName) => this.controlArray.controls;

    findUnidadeMedida() {
    }
}
