import {
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
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { ItemService } from "../core/item/item.service";
import { FabricanteService } from "../core/fabricante/fabricante.service";
import { FornecedorService } from "../core/fornecedor/fornecedor.service";
import { Fornecedor } from "../core/fornecedor/fornecedor";
import { Fabricante } from "../core/fabricante/fabricante";
import { Item } from "../core/item/item";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { UsuarioService } from "../core/usuario/usuario.service";
import { Solicitacao } from "../core/solicitacao/solicitacao";
import { SolicitacaoItem } from "../core/solicitacaoItem/solicitacao-item";
import { StatusSolicitacaoService } from "../core/statusSolicitacao/status-solicitacao.service";

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit {

    @ContentChild(SolicitacaoCreateComponent, {read: ElementRef}) content: QueryList<SolicitacaoCreateComponent>;
    @ViewChildren('item', {read: ElementRef}) item: QueryList<any>;
    @ViewChild('urgencyIcon', {read: ElementRef}) urgencyIcon: QueryList<any>;

    fields: any = [];
    controlArray;
    findList = [];
    error = null;
    offset: number = 0;
    urgency: boolean = false;
    errors;
    message;
    solicitacaoItems: SolicitacaoItem[] = [];
    status;

    constructor(private route: Router, private fb: FormBuilder, private itemService: ItemService,
                private fabricanteService: FabricanteService, private fornecedorService: FornecedorService,
                private renderer: Renderer2, private solicitacaoService: SolicitacaoService,
                private usuarioService: UsuarioService, private statusSolicitacaoService: StatusSolicitacaoService,
                private router: Router) {
    }

    ngOnInit() {
        this.controlArray = this.fb.group({
            item: this.fb.array([this.createFormControl('item')]),
            fabricante: this.fb.array([this.createFormControl('fabricante')]),
            fornecedor: this.fb.array([this.createFormControl('fornecedor')]),
        });
    }

    cancel = () => this.route.navigate(['solicitacao']);

    createFormControl(type) {
        let group;
        switch (type) {
            case 'item':
                group = this.fb.group({
                    id: '',
                    descricao: '',
                    unidade_medida: '',
                    quantidade: ''
                });
                break;
            case 'fabricante':
                group = this.fb.group({
                    id: '',
                    fantasia: '',
                    item: ''
                });
                break;
            case 'fornecedor':
                group = this.fb.group({
                    id: '',
                    fantasia: '',
                    telefone: '',
                    email: '',
                    item: ''
                });
                break;
        }

        return group;
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

        let service = this.getService(type);

        if (scroll) {
            this.offset += 10;
            service.search(event.value, this.offset).subscribe((list: any[]) => {
                list.forEach(i => {
                    this.findList.push(i);
                })
            });
        } else {
            this.searchItems(currentInput, type, event);
        }
    }

    getService(name) {
        switch (name) {
            case 'item':
                return this.itemService;
            case 'fabricante':
                return this.fabricanteService;
            case 'fornecedor':
                return this.fornecedorService;
        }
    }

    clearList() {
        this.findList.length = 0;
        const container = this.renderer.nextSibling(event.target);
        if (container != undefined) this.renderer.setProperty(container, 'hidden', true);
    }

    showList(containerList) {
        if (this.findList != undefined && this.findList.length > 0) {
            this.renderer.setProperty(containerList, 'hidden', false);
            this.renderer.setProperty(containerList.nextSibling, 'hidden', true);
        }
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

    validate(type) {
        const groups = this.controlArray.get(type).controls;
        return groups.reduce((valid, group) => valid && type != 'fornecedor' ? this.groupIsValid(group, type != 'item') : this.fornecedorIsValid(group), true);
    }

    fornecedorIsValid(group: FormGroup) {
        for (let key of Object.keys(group.value)) {
            if (group.value['fantasia'] != '' && group.value['item'] != '') {
                return group.value['telefone'] != '' || group.value['email'] != '';
            }
        }

        return this.groupIsValid(group, true);
    }

    groupIsValid(group: FormGroup, canBeEmpty: boolean) {
        const keys = Object.keys(group.value);
        const countEmpty = keys.reduce((count, key) => count + (group.value[key] == '' || group.value[key] == null ? 1 : 0), 0);
        return (countEmpty === keys.length && canBeEmpty) || countEmpty == 0;
    }

    setInputFindValue(type, element, value?) {
        let input, controlName, group;

        if (typeof value == "object") {
            input = this.renderer.parentNode(element).previousSibling;
            controlName = input.getAttribute('ng-reflect-name');
            group = this.getFormGroup(input, type);

            this.setFormControl(group, controlName, value[controlName].toUpperCase());

            if (value.hasOwnProperty('id')) this.setFormControl(group, 'id', value.id);

            for (let key of Object.keys(value)) {
                if (this.getFormControl(group, key)) this.setFormControl(group, key, value[key]);
            }
        } else {
            group = this.getFormGroup(element, type);
            controlName = element.name;
            const result = this.findInList(value.toUpperCase(), controlName);

            if (result != undefined && result.hasOwnProperty('id')) {
                this.setFormControl(group, 'id', result.id);
            } else {
                this.setFormControl(group, 'id', value.toUpperCase());
            }
        }
    }

    findInList(value, field) {
        for (let item of this.findList) {
            if (item.hasOwnProperty(field) && item[field].toUpperCase() == value) {
                return item;
            }
        }
    }

    loading = (container, value) => this.renderer.setProperty(container, 'hidden', !value);

    searchItems(input, type, element) {
        const containerLoading = element.nextSibling.nextSibling;
        if (input.valueChanges.observers.length == 0) {
            input.valueChanges
                .debounceTime(1000)
                .switchMap(value => {
                    this.loading(containerLoading, true);
                    return this.getService(type).search(value, 0)
                })
                .subscribe(list => {
                    this.findList = list;
                    this.showList(element.nextSibling);
                    this.setInputFindValue(type, element, element.value);
                    this.loading(containerLoading, false);
                });
        }
    }

    setUrgency() {
        this.urgency = !this.urgency;
        if (this.urgency) {
            this.renderer.addClass(this.urgencyIcon['nativeElement'], 'enable-urgency-container');
            this.renderer.addClass(this.urgencyIcon['nativeElement'].childNodes[1], 'enable');
        } else {
            this.renderer.removeClass(this.urgencyIcon['nativeElement'], 'enable-urgency-container');
            this.renderer.removeClass(this.urgencyIcon['nativeElement'].childNodes[1], 'enable');
        }
    }

    getAllFormGroup = (type) => this.controlArray.get(type).controls;

    attachItem() {
        const groups = this.getAllFormGroup('item');
        for (let group of groups) {
            let properties = group.controls;
            let item = this.requestItemsBuilder('item', properties);

            if (typeof item.id == "string") delete item.id;

            this.addTo(item, 'fabricante');
            this.addTo(item, 'fornecedor');

            if (typeof item.id == "number") {
                for (let key in item) {
                    if (key != "id" && key != "fabricante" && key != "fornecedor" && item.hasOwnProperty(key))
                        delete item[key];
                }
            }

            const solicitacaoItem = new SolicitacaoItem({
                item: item,
                unidadeMedida: properties['unidade_medida'].value.toUpperCase(),
                quantidade: properties['quantidade'].value,
            });

            this.solicitacaoItems.push(solicitacaoItem);
        }
    }


    addTo(item, type) {
        const groups = this.getAllFormGroup(type);

        for (let group of groups) {
            const groupItem = group.controls.item.value.toUpperCase();
            if (groupItem == item.id || groupItem == item.descricao) {
                const objInstance = this.requestItemsBuilder(type, group.controls);
                if (typeof objInstance.id == 'string') delete objInstance.id;
                if (type == 'fabricante') item.fabricante.push(objInstance);
                if (type == 'fornecedor') item.fornecedor.push(objInstance);
            }
        }
    }

    requestItemsBuilder(type, obj) {
        switch (type) {
            case 'item':
                const item = new Item({id: obj.id.value, descricao: obj.descricao.value.toUpperCase()});
                delete item.produto;
                return item;
            case 'fabricante':
                return new Fabricante({id: obj.id.value, fantasia: obj.fantasia.value.toUpperCase()});
            case 'fornecedor':
                return new Fornecedor({
                    id: obj.id.value,
                    fantasia: obj.fantasia.value.toUpperCase(),
                    telefone: obj.telefone.value,
                    email: obj.email.value
                });
        }
    }

    save() {
        this.attachItem();

        let solicitacao = new Solicitacao({
            itens: this.solicitacaoItems,
            data: '',
            urgente: this.urgency
        });

        this.solicitacaoService.save(solicitacao).subscribe((solicitacao: Solicitacao) => {
            this.message = 'Solicitação realizada com sucesso!';

            let r = this.router;
            setTimeout(function () {
                r.navigate(['/solicitacao', 'show', solicitacao.id]);
            }, 3000);
        });
    }

}