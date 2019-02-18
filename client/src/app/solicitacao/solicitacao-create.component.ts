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
import { Item } from "../core/item/item";
import { Fabricante } from "../core/fabricante/fabricante";
import { FabricanteService } from "../core/fabricante/fabricante.service";

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
    findList: any[] = [];
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
        if (type == 'items') {
            return this.fb.group({
                id: '',
                descricao: '',
                unidade_medida: '',
                quantidade: ''
            });
        } else if (type == 'fabricantes') {
            return this.fb.group({
                fantasia: '',
                item_fabricante: ''
            });
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
        console.log(this.controlArray);

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
        let currentInput;

        currentInput = this.getFormControl(group, controlName);
        if (currentInput == undefined || currentInput == '') return false;

        if (!scroll) {
            this.offsetList = 0;
            switch (controlName) {
                case 'descricao':
                    currentInput.valueChanges.distinctUntilChanged().debounceTime(1000).subscribe(c => {
                        if (c != '') {
                            this.itemService.search(c, this.offsetList).subscribe((itemList: Item[]) => {
                                this.findList = itemList;
                                itemList.forEach(i => {
                                    if (c == i.descricao) {
                                        this.clearList();
                                        this.renderer.setProperty(event.nextSibling, 'hidden', true)
                                    }
                                });

                                this.showList(event);
                            })
                        }
                    });
                    break;
                case 'fantasia':
                    currentInput.valueChanges.distinctUntilChanged().debounceTime(1000).subscribe(c => {
                        if (c != '') {
                            this.fabricanteService.search(c, this.offsetList).subscribe((fabricanteList: Fabricante[]) => {
                                this.findList = fabricanteList;
                                fabricanteList.forEach(i => {
                                    if (c == i.fantasia) {
                                        this.clearList();
                                        this.renderer.setProperty(event.nextSibling, 'hidden', true)
                                    }
                                });

                                this.showList(event);
                            })
                        }
                    });
                    break;
            }
        } else {
            this.offsetList += 10;
            switch (type) {
                case 'items':
                    this.itemService.search(event.value, this.offsetList + 10).subscribe((itemList: Item[]) => {
                            itemList.forEach(i => {
                                this.findList.push(i);
                            });
                        }
                    );
                    break;
                case 'fabricantes':
                    this.fabricanteService.search(event.value, this.offsetList).subscribe((fabricanteList: Fabricante[]) => {
                            fabricanteList.forEach(i => {
                                this.findList.push(i);
                            });
                        }
                    );
                    break;
            }
        }
    }

    clearList() {
        this.findList.length = 0;
        this.items.last.nativeElement.hidden = true;
    }

    showList(containerList) {
        if (this.findList.length > 0) this.renderer.setProperty(containerList.nextSibling, 'hidden', false)
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

    validatorStepFabricante(input) {
        let controls = this.controlArray.get('fabricantes').controls;

        let childsItem = input.parentNode.parentNode.nextSibling.childNodes;

        for (let c of childsItem) if (c.nodeName == 'SELECT' && c.value == '') return false;
    }

    setInputValue(event, item, type) {
        const input = event.parentNode.previousSibling;
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
            this.renderer.setProperty(event.parentNode, 'hidden', true);
        }
    }

    add() {
        let controls = this.controlArray.get('fabricantes').controls;

        if (!this.validatorStepItem()) {
            this.error = 'Verifique se todos os campos foram preenchidos';
        } else {
            this.error = null;
        }
    }

}