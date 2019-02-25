import {
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    OnInit, Query,
    QueryList,
    Renderer2,
    ViewChildren
} from '@angular/core';
import { Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { ItemService } from "../core/item/item.service";
import { FabricanteService } from "../core/fabricante/fabricante.service";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit {

    @ContentChild(SolicitacaoCreateComponent, {read: ElementRef}) content: QueryList<SolicitacaoCreateComponent>;
    @ViewChildren('item', {read: ElementRef}) item: QueryList<any>;

    fields: FormArray;
    controlArray;
    findList = [];
    offsetList = 0;
    error = null;
    loading = false;

    constructor(private route: Router, private fb: FormBuilder, private itemService: ItemService,
                private fabricanteService: FabricanteService, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.controlArray = this.fb.group({
            item: this.fb.array([this.createFormControl('item')]),
            fabricante: this.fb.array([this.createFormControl('fabricante')]),
        });
    }

    cancel = () => this.route.navigate(['solicitacao']);

    createFormControl(type) {
        if (type === 'item') {
            return this.fb.group({
                id: '',
                descricao: '',
                unidade_medida: '',
                quantidade: ''
            });
        } else if (type === 'fabricante') {
            return this.fb.group({
                id: '',
                fantasia: '',
                item_fabricante: ''
            });
        } else if (type === 'fornecedor') {
            return this.fb.group({
                fantasia: '',
                item_fantasia: ''
            })
        }
    }

    removeFormGroup(type, i) {
        this.controlArray.get(type).removeAt(i) as FormGroup;
    }

    addField(type: string) {
        if (this.fields == undefined || this.fields.length < 10) {
            this.fields = this.controlArray.get(type) as FormArray;
            this.fields.push(this.createFormControl(type));
        }
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

    find(event, type, scroll = false) {
        const controlName = event.getAttribute('ng-reflect-name');
        const group = this.getFormGroup(event, type);
        const currentInput = this.getFormControl(group, controlName);

        if (currentInput == undefined) return false;

        if (!scroll) {
            this.offsetList = 0;
            switch (type) {
                case 'item':
                    this.searchItems(currentInput, event, this.itemService, type, controlName);
                    break;
                case 'fabricante':
                    this.searchItems(currentInput, event, this.fabricanteService, type, controlName);
                    break;
            }
        } else {
            this.offsetList += 10;
            switch (type) {
                case 'item':
                    this.itemService.search(event.value, this.offsetList + 10).subscribe((list: any[]) => {
                            list.forEach(i => {
                                this.findList.push(i);
                            });
                        }
                    );
                    break;
                case 'fabricante':
                    this.fabricanteService.search(event.value, this.offsetList).subscribe((list: any[]) => {
                            list.forEach(i => {
                                this.findList.push(i);
                            });
                        }
                    );
                    break;
            }
        }

        if (this.findList != undefined && this.findList.length > 0 && this.findList.includes(currentInput.value)) {
            console.log(currentInput.value);
        }
    }

    clearList() {
        this.findList.length = 0;
        const container = this.renderer.nextSibling(event.target);
        if (container != undefined) this.renderer.setProperty(container, 'hidden', true);
    }

    showList(containerList) {
        if (this.findList != undefined && this.findList.length > 0)
            this.renderer.setProperty(containerList, 'hidden', false);
    }

    getFormGroup(input, type) {
        let index = +input.id.match(/\d/g);
        const formGroup = this.controlArray.get(type).controls[index] as FormGroup;
        if (formGroup) return formGroup;
    }

    getFormControl(group: FormGroup, controlName) {
        return group.get(controlName);
    }

    setFormControl(group, controlName, value) {
        let control = this.getFormControl(group, controlName);
        control.setValue(value);
    }

    validatorStepItem() {
        let controls = this.controlArray.get('item').controls;

        for (let control of controls) {
            if (control.get('descricao').value == "" || control.get('unidade_medida').value == "" || control.get('quantidade').value == "") {
                return false;
            }
        }

        return true;
    }

    validatorStepFabricante(control) {
        const itemFabricante = control.get('item_fabricante').value;
        const fantasia = control.get('fantasia').value;
        if (fantasia != '' && itemFabricante == '' || fantasia == '' && itemFabricante != '')
            this.error = 'Verifique se todos os campos foram preenchidos';
    }

    setInputFindValue(type, element, value?) {
        const parent = this.renderer.parentNode(element);
        const parentPrevious = parent.previousSibling;
        console.log(parentPrevious);
        const controlName = parentPrevious != null ? parentPrevious.getAttribute('ng-reflect-name') : null;
        let group = parentPrevious != null ? this.getFormGroup(parentPrevious, type) : null;

        if (controlName != null) {
            if (value.hasOwnProperty('id')) {
                this.setFormControl(group, controlName, value[controlName]);
                this.setFormControl(group, 'id', value['id']);
            }
        }

        if (parentPrevious == null && element.nodeName == 'INPUT') {
            group = this.getFormGroup(element, type);
            this.getFormControl(group, 'id').reset('');
        }
    }

    add() {
        let controls = this.controlArray.get('fabricante').controls;

        if (!this.validatorStepItem()) {
            this.error = 'Verifique se todos os campos foram preenchidos';
        } else {
            this.error = null;
        }

        if (this.validatorStepItem()) {
            const tabNodes = event.target['parentNode'].parentNode.childNodes.item(0).childNodes.item(0).childNodes;
            for (const n of tabNodes) {
                if (n.classList != undefined && n.classList.contains('current') && n.id == 2) {
                    for (const c of controls) this.validatorStepFabricante(c);
                }
            }
        }
    }

    searchItems(input, event, service, type, field) {
        input.valueChanges.distinctUntilChanged().debounceTime(1000).subscribe(value => {
            if (value != '') {
                this.loading = true;
                service.search(value, this.offsetList).subscribe((list: any[]) => {
                    this.findList = list;
                    this.loading = false;
                    this.showList(event.nextSibling);
                    this.setInputFindValue(type, event, value);
                });
            }
        });
    }

    inList = (list, value, field) => {
        for (const i of list) if (value == i[field]) return true
    }
}