import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren
} from '@angular/core';
import { Router } from "@angular/router";
import { UnidadeMedida } from "../core/unidadeMedida/unidadeMedida";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { ItemService } from "../core/item/item.service";
import { Item } from "../core/item/item";

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit, AfterContentInit {

    @ContentChild(SolicitacaoCreateComponent, {read: ElementRef}) content: QueryList<SolicitacaoCreateComponent>;
    @ViewChildren('stepItem', {read: ElementRef}) stepItem;

    fields: FormArray;
    controlArray;
    findList: Item[] = [];

    constructor(private route: Router, private fb: FormBuilder, private itemService: ItemService, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.controlArray = this.fb.group({
            items: this.fb.array([this.createFormControl('items')]),
        });
    }

    cancel = () => this.route.navigate(['solicitacao']);

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
                descricao: '',
                unidade_medida: '',
                quantidade: ''
            });
        } else if (type == 'fabricantes') {
            return this.fb.group({
                fantasia: '',
            });
        }
    }

    removeFormGroup(type, i) {
        this.controlArray.get(type).removeAt(i) as FormGroup;
    }

    addField(event, type: string) {
        this.fields = this.controlArray.get(type) as FormArray;
        this.fields.push(this.createFormControl(type));
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
            let inputs = event.target.parentNode;
            let previousLength = 0;
            let nextLength = 0;
            let nextSibling;

            if (event.target.parentNode.previousSibling != null)
                previousLength = event.target.parentNode.previousSibling.childNodes.length;

            if (event.target.parentNode.nextSibling != null) nextSibling = event.target.parentNode.nextSibling.childNodes;

            if (nextSibling != undefined && nextSibling.item(0).childNodes.length > 0) nextLength = nextSibling.length;

            if (previousLength > 0 || nextLength > 0) {
                this.removeFormGroup(inputs.getAttribute('ng-reflect-name'), +inputs.id.slice(-1));
            }
        }
    }

    find(event, type) {
        const controlName = event.getAttribute('ng-reflect-name');
        const group = this.getFormGroup(event, type);
        let currentInput = this.getFormControl(group, controlName) != undefined ? this.getFormControl(group, controlName) : undefined;

        switch (controlName) {
            case 'descricao':
                currentInput.valueChanges
                    .debounceTime(1000)
                    .distinctUntilChanged()
                    .switchMap(searchTerm =>
                        this.itemService.search(searchTerm)
                    ).subscribe((itemList: Item[]) => {
                    this.findList = itemList;
                    this.rendererResult(event, group, controlName);
                });
                break;
        }
    }

    clearList(event) {
        if (event.value == '') {
            this.findList = [];
            this.deleteItensScrollbar(event.parentNode);
        }
    }

    getFormGroup(event, type) {
        let index = +event.id.slice(-1);
        return this.controlArray.get(type).controls[index] as FormGroup;
    }

    getFormControl(group: FormGroup, controlName) {
        return group.get(controlName);
    }

    setFormControl(group, controlName, value) {
        let control = this.getFormControl(group, controlName);
        control.setValue(value);
    }

    rendererResult(input, group, controlName) {
        const containerItems = input.nextSibling;
        const parentScroll = input.parentNode;
        this.deleteItensScrollbar(parentScroll);

        this.findList.forEach(e => {
            let contentItem = this.renderer.createElement('div');
            contentItem.innerText = e.descricao;
            this.renderer.addClass(contentItem, 'item');

            this.renderer.listen(contentItem, "click", () => {
                input.value = contentItem.innerText;
                this.setFormControl(group, controlName, contentItem.innerText);
                this.deleteItensScrollbar(parentScroll);
                this.renderer.setStyle(containerItems, 'opacity', 0);
            });

            containerItems.appendChild(contentItem);
        });

        this.renderer.setStyle(containerItems, 'opacity', 1);
        input.parentNode.appendChild(containerItems);
    }

    deleteItensScrollbar = (parentScroll) => {
        parentScroll.childNodes.forEach(p => {
            if (p.nodeName == 'DIV' && p.classList.contains('items')) {
                while (p.hasChildNodes()) p.childNodes.forEach(c => c.remove());
            }
        });
    };

    add(event) {
        console.log(this.controlArray.get('items').controls);
    }

    validatorStepItem() {
        let controls = this.controlArray.get('items').controls;

        for (let control of controls)
            if (control.get('descricao').value == "" || control.get('unidade_medida').value == "" || control.get('quantidade').value == "")
                return false;

        return true;
    }
}