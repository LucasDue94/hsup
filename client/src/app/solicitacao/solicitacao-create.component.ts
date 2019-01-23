import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { Router } from "@angular/router";
import { Item } from "../core/item/item";
import { UnidadeMedida } from "../core/unidadeMedida/unidadeMedida";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
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
    @ViewChild('iconContainer') iconContainer;
    @ViewChild('iconContent') iconContent;
    urgency: boolean = false;
    countItemInput = 1;
    countFabricanteInput = 1;
    countFornecedorInput = 1;
    items: Item[] = [];
    unidades: UnidadeMedida[] = [];
    formControl;
    message;
    errors: any[];
    solicitacaoList = [
        {id: '0001', setor: 'TI', solicitante: 'JOAQUIM', aprovacao: true},
        {id: '0002', setor: 'FINANCEIRO', solicitante: 'SOLICITADOR', aprovacao: false},
        {id: '0003', setor: 'FATURAMENTO', solicitante: 'MARIA', aprovacao: false},
        {id: '0004', setor: 'SUPRIMENTOS', solicitante: 'LARISSA', aprovacao: true},
        {id: '0005', setor: 'ALMOXARIFE', solicitante: 'ROBSON CARECA', aprovacao: true}
    ];

    constructor(private route: Router, private fb: FormBuilder, private render: Renderer2, private itemService: ItemService, private group: FormGroup) {
        this.formControl = this.fb.group({value: 'builder', disable: false});
        this.formControl.addControl('descricao', new FormControl());
    }

    ngOnInit() {
    }

    cancel = () => this.route.navigate(['solicitacao']);


    addField(event) {
        let parentNode = null;
        event.parentNode.childNodes.forEach(e => {
            if (e.classList.contains('solicitacao-group')) parentNode = e.cloneNode(true);
        });

        let i = 1;
        for (let parent of parentNode.childNodes) {
            for (let child of parent.childNodes) {
                if (child.nodeName == 'INPUT') {
                    i = i + 1;
                    let controlName = child.getAttribute('formControlName') + i;
                    if (typeof controlName == "number") controlName = child.getAttribute('name') + i;
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
        console.log(this.formControl);
    }

    inputBuilder(input, name) {
        input.setAttribute('formControlName', name);
        input.setAttribute('ng-reflect-name', name);
        input.name = name;
        input.id = name;
        input.value = '';
        input.previousElementSibling.setAttribute('for', name);

    }

    addFormControl(controlName) {
        this.formControl.addControl(controlName, new FormControl());
    }

    ngAfterContentInit(): void {
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.key === 'F5' && !confirm('Você tem certeza que deseja atualizar a página? Seus dados serão apagados.')) return false;
    }

    @HostListener('document:click', ['$event']) removeField(event) {
        if (event.target != null && event.target.parentNode != null && event.target.nodeName == 'BUTTON') {
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

    findItem(event) {
        let currentInput;
        currentInput = this.getFormControl(event.name);
        console.log(event);
        if (currentInput) {
            currentInput.valueChanges.debounceTime(1000).subscribe(e => this.items.push(e));
        }
    }

    getFormControl = (controlName) => this.formControl.get(controlName);


    setUrgency() {
        this.iconContent = document.getElementById('iconContent');
        this.urgency = !this.urgency;
        if (this.urgency == true) {
            this.render.addClass(this.iconContainer.nativeElement, 'enable-urgency-container');
            this.render.addClass(this.iconContent, 'enable');
        } else if (this.urgency == false) {
            this.render.removeClass(this.iconContainer.nativeElement, 'enable-urgency-container');
            this.render.removeClass(this.iconContent, 'enable');
        }
    }

    save() {
        for (let it of this.items) {
            console.log(it);
            this.itemService.save(it).subscribe((item: Item) => {
                if (it.id != null) {
                    this.message = `Item ${it.descricao} alterado com sucesso!`;
                } else {
                    this.message = `Item ${it.descricao} cadastrado com sucesso!`;
                }
                let r = this.route;
                setTimeout(function () {
                    r.navigate(['/item', 'show', item.id]);
                }, 3000);
            }, (res) => {
                const json = res.error;
                if (json.hasOwnProperty('message')) {
                    this.errors = [json];
                } else {
                    this.errors = json._embedded.errors;
                }
            });
        }
    }
}
