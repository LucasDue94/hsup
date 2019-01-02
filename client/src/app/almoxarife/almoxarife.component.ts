import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
export class AlmoxarifeComponent implements OnInit, OnDestroy {

    @Input() itemsRequest;
    @ViewChild('search') search;
    @ViewChild('searchContainer') searchContainer;
    @ViewChild('main') main;
    @ViewChild('stock') stock;
    @ViewChild('stateStock') stateStock;
    wpdProducts: Produto[];
    setTest = new Map();
    form;
    input;
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
            .switchMap(inputValue => this.almoxarifeService.search(inputValue, '', ''))
            .subscribe((almoxarife: Produto[]) => {
                let current = '';
                this.setTest.clear();
                this.wpdProducts = [];
                for (const a of almoxarife) {
                    if (!this.setTest.has(a['codigo'])) {
                        this.setTest.set(a['codigo'], a);
                        current = this.setTest.get(a['codigo']);
                    } else {
                        current['estoque'] = +current['estoque'] + +a['estoque'];
                    }
                }
                this.setTest.forEach(v => this.wpdProducts.push(v));
            });

        if (currentControl.value == '') {
            this.wpdProducts = [];
            this.stock.value = '';
        }
    }

    removeEquals() {
        /* for (let i = 1; i < this.wpdProducts.length; i++) {
             if (this.wpdProducts[i].id === this.wpdProducts[i - 1].id) {
                             this.wpdProducts[i - 1].estoque += this.wpdProducts[i].estoque;
                             this.wpdProducts.splice(i, 1);
                         }

         }*/
    }

    select(event, input, item, index) {
        input.value = event.innerHTML;
        this.wpdProducts = [];
        this.stock = document.getElementById('stock' + index);
        this.stock.value = item.estoque;
        // console.log(this.search);
    }

    ngOnDestroy(): void {
    }
}
