import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AlmoxarifeService } from "../core/almoxarife/almoxarife.service";
import { Produto } from "../core/produto/produto";

@Component({
    selector: 'almoxarife',
    templateUrl: './almoxarife.component.html',
    styleUrls: ['./almoxarife.component.scss']
})
export class AlmoxarifeComponent implements OnInit {

    @Input() itemsRequest;
    @ViewChild('search') search;
    @ViewChild('searchContainer') searchContainer;
    @ViewChild('main') main;
    @ViewChild('stock') stock;
    @ViewChild('stateStock') stateStock;
    wpdProducts: Produto[];
    form;
    sector = 'Tecnologia da Informação';
    requestNumber = '0001';
    date = '19/12/2018';
    requestUser = 'Beroaldo da Silva Carneiro';
    currentInput;
    currentStock;

    constructor(private almoxarifeService: AlmoxarifeService, private fb: FormBuilder, private render: Renderer2, private elementRef: ElementRef) {
        this.form = this.fb.group({
            value: 'myBuilder', disable: false,
        });
    }

    ngOnInit() {
        this.createFormControl();
        this.wpdProducts = [];
    }

    createFormControl() {
        for (let i = 0; i < this.itemsRequest.length; i++) {
            this.form.addControl('searchField' + i, new FormControl());
        }
    }

    find(event) {
        this.currentInput = event;
        const currentControlName = this.currentInput.getAttribute('ng-reflect-name');
        const currentControl = this.form.get(currentControlName);
        currentControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(inputValue => this.almoxarifeService.search(inputValue))
            .subscribe((almoxarife: Produto[]) => {
                this.wpdProducts = almoxarife;
                console.log(this.wpdProducts);
            });

        if (currentControl.value == '') this.wpdProducts = [];
    }

    removeEquals(){
        for(let i = 1; i< this.wpdProducts.length; i++){
            if(this.wpdProducts[i] == this.wpdProducts[i-1]){

            }
        }
    }

    select(event, input, item, index) {
        input.value = event.innerHTML;
        this.wpdProducts = [];
        const stock = document.getElementById('stock' + index);
        stock.value = item.estoque;
        console.log(this.search);
    }

    showTransition(element) {
        this.render.setStyle(element, 'opacity', '1');
    }

    closeTransition(element) {
        this.render.setStyle(element, 'opacity', '0');
    }
}
