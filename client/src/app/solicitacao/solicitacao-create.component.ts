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
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
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
    itemList: Item[] = [];
    value;

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
                quantidade: ''
            });
        } else if (type == 'fabricantes') {
            return this.fb.group({
                fantasia: '',
            });
        }
    }

    removeFormGroup(type, i) {
        this.controlArray.get(type).removeAt(i);
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
                    this.itemList = itemList;
                    this.resultFind(event);
                });
                break;
        }
    }

    clearList(event) {
        if (event.value == '') this.itemList = [];
    }

    setValue(event) {
        this.value = event;
        if (this.value.value) this.itemList = [];
    }

    getFormGroup(event, type) {
        let index = +event.id.slice(-1);
        return this.controlArray.get(type).controls[index] as FormGroup;
    }

    getFormControl(group: FormGroup, controlName) {
        return group.get(controlName);
    }


    findUnidadeMedida() {
    }

    resultFind(input) {
        const oldScroll = input.parentNode.childNodes;

        oldScroll.forEach(e => {
            if (e.nodeName == 'PERFECT-SCROLLBAR') this.renderer.removeChild(input.parentNode, e);
        });

        let perfectScrollbar = this.renderer.createElement('perfect-scrollbar');
        this.renderer.addClass(perfectScrollbar, 'col-12');
        this.renderer.addClass(perfectScrollbar, 'scroll-item');

        let containerItems = this.renderer.createElement('div');
        this.renderer.addClass(containerItems, 'items');

        const scrollContainer = input.parentNode.appendChild(perfectScrollbar);

        this.itemList.forEach(e => {
            let contentItem = this.renderer.createElement('div');
            this.renderer.addClass(contentItem, 'item');
            contentItem.innerText = e.descricao;

            this.renderer.listen(contentItem, "click", () => {
                input.value = contentItem.innerText;
                scrollContainer.remove();
            });

            containerItems.appendChild(contentItem);
        });

        scrollContainer.appendChild(containerItems);
    }
}
