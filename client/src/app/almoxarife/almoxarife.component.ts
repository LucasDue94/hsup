import { AfterContentInit, AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class AlmoxarifeComponent implements OnInit, AfterContentInit {

    @Input() itemsRequest;
    @ViewChild('stock') stock;
    @ViewChild('codPro') codPro;
    wpdProducts: Produto[];
    wpdProductsFiltered = new Map();
    formControls;
    sector = 'Tecnologia da Informação';
    requestNumber = '0001';
    date = '19/12/2018';
    requestUser = 'Beroaldo da Silva Carneiro';
    currentInput;
    isOverList;

    constructor(private almoxarifeService: AlmoxarifeService, private fb: FormBuilder) {
        this.formControls = this.fb.group({value: 'myBuilder', disable: false});
    }

    ngOnInit() {
        this.createFormControl();
        this.wpdProducts = [];
    }

    ngAfterContentInit() {
    }

    createFormControl() {
        for (let i = 0; i < this.itemsRequest.length; i++) {
            this.formControls.addControl('searchField' + i, new FormControl());
        }
    }

    find(event) {
        this.currentInput = event;
        const currentControlName = this.currentInput.getAttribute('ng-reflect-name');
        const currentControl = this.formControls.get(currentControlName);
        currentControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(inputValue => this.almoxarifeService.search(inputValue, '', ''))
            .subscribe((almoxarife: Produto[]) => {
                let current = '';
                this.wpdProductsFiltered.clear();
                this.wpdProducts = [];
                for (const a of almoxarife) {
                    a['codigo'] = a['codigo'].replace(/\s/g, '');
                    if (!this.wpdProductsFiltered.has(a['codigo'])) {
                        this.wpdProductsFiltered.set(a['codigo'], a);
                        current = this.wpdProductsFiltered.get(a['codigo']);
                    } else {
                        current['estoque'] = +current['estoque'] + +a['estoque'];
                    }
                }
                this.wpdProductsFiltered.forEach(v => this.wpdProducts.push(v));
            });

        if (currentControl.value == '') {
            this.wpdProducts = [];
            this.codPro.value = '';
            this.stock.vlaue = '';
        }
    }


    clearInputs(event, index) {
        this.codPro = document.getElementById('codPro' + index);
        this.stock = document.getElementById('stock' + index);
        if (this.codPro.value == '' && event.value != '' && !this.isOverList) {
            event.value = '';
            this.wpdProducts = [];
            this.stock.value = '';
        }
    }

    select(event, input, item, index) {
        input.value = event.innerHTML;
        this.stock = document.getElementById('stock' + index);
        this.stock.value = item.estoque;
        this.codPro = document.getElementById('codPro' + index);
        this.codPro.value = item.codigo;
        this.wpdProducts = [];
    }

    verify(status){
        this.isOverList = status;
    }
}
