import { Component, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'almoxarife',
    templateUrl: './almoxarife.component.html',
    styleUrls: ['./almoxarife.component.scss']
})
export class AlmoxarifeComponent implements OnInit {

    @Input() itemsRequest;
    @Input() wpdProducts;
    @ViewChild('search') search;
    @ViewChild('searchContainer') searchContainer;
    @ViewChild('') test;
    form;
    sector = 'Tecnologia da Informação';
    requestNumber = '0001';
    date = '19/12/2018';
    requestUser = 'Beroaldo da Silva Carneiro';

    constructor(private fb: FormBuilder, private render: Renderer2) {
        this.form = this.fb.group({
            value: 'myBuilder', disable: false,
        });
    }

    ngOnInit() {
        this.createFormControl();
    }

    createFormControl() {
        for (let i = 0; i < this.itemsRequest.length; i++) {
            this.form.addControl('searchField' + i, new FormControl());
        }
    }

    onClickInput(event) {
        const currentControlName = event.target.getAttribute('ng-reflect-name');
        const currentControl = this.form.get(currentControlName);
        currentControl.valueChanges.debounceTime(1000).distinctUntilChanged()
            .subscribe(inputValue => this.searchItem(inputValue, event.target));
    }

    searchItem(value, input) {
        const ul = this.render.createElement('ul');
        this.render.addClass(ul, 'list');
        this.render.addClass(ul, 'col-10');
        for (const item of this.wpdProducts) {
            let text = this.render.createText(item.desc);
            let li = this.render.createElement('li');
            li.onClick = f();
            this.render.addClass(li, 'item');
            this.render.appendChild(li, text);
            this.render.appendChild(ul, li);
        }

        function f(){
            console.log('deu certo');
        }

        console.log(this.searchContainer.nativeElement);
        this.render.insertBefore(this.searchContainer.nativeElement, ul, input.nextSibling);
    }
}
