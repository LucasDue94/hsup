import {
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
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { ItemService } from "../core/item/item.service";
import { FabricanteService } from "../core/fabricante/fabricante.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit {

    @ContentChild(SolicitacaoCreateComponent, {read: ElementRef}) content: QueryList<SolicitacaoCreateComponent>;
    @ViewChildren('items', {read: ElementRef}) items;

    fields: FormArray;
    controlArray;
    findList;
    offsetList = 0;
    error = null;

    constructor(private route: Router, private fb: FormBuilder, private itemService: ItemService,
                private fabricanteService: FabricanteService, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.controlArray = this.fb.group({
            items: this.fb.array([this.createFormControl('items')]),
            fabricantes: this.fb.array([this.createFormControl('fabricantes')]),
        });
    }

    cancel = () => this.route.navigate(['solicitacao']);

    createFormControl(type) {
        if (type === 'items') {
            return this.fb.group({
                id: '',
                descricao: '',
                unidade_medida: '',
                quantidade: ''
            });
        } else if (type === 'fabricantes') {
            return this.fb.group({
                fantasia: '',
                item_fabricante: ''
            });
        } else if (type === 'fornecedores') {
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
            switch (controlName) {
                case 'descricao':
                    this.searchItems(currentInput, event, this.itemService, controlName);
                    break;
                case 'fantasia':
                    this.searchItems(currentInput, event, this.fabricanteService, controlName);
                    break;
            }
        } else {
            this.offsetList += 10;
            switch (type) {
                case 'items':
                    this.itemService.search(event.value, this.offsetList + 10).subscribe((list: any[]) => {
                            list.forEach(i => {
                                this.findList.push(i);
                            });
                        }
                    );
                    break;
                case 'fabricantes':
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
        const container = this.renderer.nextSibling(event.target);

        if (this.findList != undefined && container != undefined) {
            this.findList.length = 0;
            this.renderer.setProperty(container, 'hidden', true);
        }
    }

    showList(containerList) {
        if (this.findList != undefined && this.findList.length > 0)
            this.renderer.setProperty(containerList.nextSibling, 'hidden', false)
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

    validatorStepItem() {
        let controls = this.controlArray.get('items').controls;

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
        if (fantasia != '' && itemFabricante == '' || fantasia == '' && itemFabricante != '') {
            this.error = 'Verifique se todos os campos foram preenchidos';
        }
    }

    setInputValue(item, type, e?) {
        if (e != null) {
            const input = e.parentNode.previousSibling;
            const controlName = input.getAttribute('ng-reflect-name');
            const group = this.getFormGroup(input, type);

            if (input != undefined && input.nodeName == 'INPUT' && group != null) {
                switch (type) {
                    case 'items':
                        this.setFormControl(group, controlName, item.descricao);
                        this.setFormControl(group, 'id', item.id);
                        input.value = item.descricao;

                        break;
                    case 'fabricantes':
                        this.setFormControl(group, controlName, item.fantasia);
                        this.setFormControl(group, controlName, item.id);
                        input.value = item.fantasia;
                        break;
                }

                this.offsetList = 0;
                this.clearList();
                this.renderer.setProperty(e.parentNode, 'hidden', true);
            }
        } else {
            if (event != null && event.target['nodeName'] == 'INPUT') {
                return event.target['value'] = '';
            }
        }
    }

    add() {
        let controls = this.controlArray.get('fabricantes').controls;

        if (!this.validatorStepItem()) {
            this.error = 'Verifique se todos os campos foram preenchidos';
        } else {
            this.error = null;
        }

        if (this.validatorStepItem()) {
            const nodes = event.target['parentNode'].parentNode.childNodes.item(0).childNodes.item(0).childNodes;
            for (const n of nodes) {
                if (n.classList != undefined && n.classList.contains('current') && n.id == 2) {
                    for (const c of controls) this.validatorStepFabricante(c);
                }
            }
        }
    }

    searchItems(currentInput, event, type, field) {
        currentInput.valueChanges.distinctUntilChanged().debounceTime(1000).subscribe(c => {
            type.search(c, this.offsetList).subscribe((list: any[]) => {
                this.findList = list;
                list.forEach(item => {
                    if (c == item[field]) {
                        this.clearList();
                        this.renderer.setProperty(event.nextSibling, 'hidden', true)
                    }
                });
                this.showList(event);
            });
        });
    }
}