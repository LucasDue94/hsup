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

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit {

    @ContentChild(SolicitacaoCreateComponent, {read: ElementRef}) content: QueryList<SolicitacaoCreateComponent>;
    @ViewChildren('item', {read: ElementRef}) item: QueryList<any>;

    fields: any = [];
    controlArray;
    findList = [];
    error = null;
    loading = false;
    offset: number = 0;

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
            });
        }
    }

    removeFormGroup = (type, i) => this.controlArray.get(type).removeAt(i) as FormGroup;

    addField(type: string) {
        if (type == 'item' && this.fields.length == 10) return false;
        this.fields = this.controlArray.get(type) as FormArray;
        this.fields.push(this.createFormControl(type));
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(e: KeyboardEvent) {
        if (e.key === 'F5' && !confirm('Você tem certeza que deseja atualizar a página? Seus dados serão apagados.'))
            return false;
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

        if (scroll) {
            this.offset += 10;
            this.getService(type).search(event.value, this.offset).subscribe((list: any[]) => {
                list.forEach(i => {
                    this.findList.push(i);
                })
            });
        } else {
            this.searchItems(currentInput, event, this.getService(type), type, controlName);
        }

    }

    getService(name) {
        if (name == 'item') {
            return this.itemService;
        } else if (name == 'fabricante') {
            return this.fabricanteService;
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
        control.setValue(value, {emitEvent: false});
    }

    validatorStepItem() {
        let controls = this.controlArray.get('item').controls;

        for (let control of controls) {
            if (control.get('descricao').value == "" || control.get('unidade_medida').value == "" ||
                control.get('quantidade').value == "") {
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
        let input, controlName, group;

        if (typeof value == "object") {
            input = this.renderer.parentNode(element).previousSibling;
            controlName = input.getAttribute('ng-reflect-name');
            group = this.getFormGroup(input, type);

            this.setFormControl(group, controlName, value[controlName]);

            if (value.hasOwnProperty('id')) this.setFormControl(group, 'id', value['id']);
        } else {
            group = this.getFormGroup(element, type);
            this.getFormControl(group, 'id').reset(element.value);
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
        this.loading = true;
        input.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(value => service.search(value, 0))
            .subscribe(list => {
                this.findList = list;
                this.showList(event.nextSibling);
                this.loading = false;
            });
    }
}