import { Component, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from "@angular/forms";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AlmoxarifeService } from "../core/almoxarife/almoxarife.service";
import { Produto } from "../core/produto/produto";
import { HttpResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { Fabricante } from "../core/fabricante/fabricante";
import { forEach } from "@angular/router/src/utils/collection";
import { logger } from "codelyzer/util/logger";

@Component({
    selector: 'almoxarife',
    templateUrl: './almoxarife.component.html',
    styleUrls: ['./almoxarife.component.scss']
})
export class AlmoxarifeComponent implements OnInit {

    @Input() itemsRequest = [{descricao: 'Memoria 8GB', qnt: '10', unidade: 'und'},
        {descricao: 'Mouse', qnt: '1', unidade: 'KG'},
        {descricao: 'Pilha', qnt: '1', unidade: 'KG'},
        {descricao: 'Coco', qnt: '1', unidade: 'KG'}];
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
    offset = 0;
    scroll = 0;
    limit = 10;
    almoxarifeList: Produto[] = [];

    constructor(private almoxarifeService: AlmoxarifeService, private fb: FormBuilder, private renderer: Renderer2) {
        this.formControls = this.fb.group({value: 'myBuilder', disable: false});
    }

    ngOnInit() {
        this.createFormControl();
        this.wpdProducts = [];
    }

    createFormControl() {
        for (let i = 0; i < this.itemsRequest.length; i++) this.formControls.addControl('searchField' + i, new FormControl());
    }

    find(event) {
        console.log(typeof event == "object");
        this.currentInput = typeof event == "object" ? event : document.getElementById(event);
        console.log(this.currentInput);
        const currentControlName = this.currentInput.getAttribute('ng-reflect-name');
        const currentControl = this.formControls.get(currentControlName);

        console.log(currentControl);
        if (this.offset >= 10) {
            this.almoxarifeService.search(currentControl.value, this.offset, this.limit).subscribe((almoxarifeList: Produto[]) => {
                this.almoxarifeList = almoxarifeList;
                if (this.almoxarifeList.length > 0) {
                    this.almoxarifeList.forEach(item => {
                        this.wpdProducts.push(item);
                    })
                }
            });
        } else {
            currentControl.valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .switchMap(inputValue => this.almoxarifeService.search(inputValue, this.offset, this.limit))
                .subscribe((produtos: Produto[]) => {
                    let current = '';
                    // this.wpdProductsFiltered.clear();
                    // this.wpdProducts = [];
                    for (const a of produtos) {
                        a['codigo'] = a['codigo'].replace(/\s/g, '');
                        if (!this.wpdProductsFiltered.has(a['codigo'])) {
                            this.wpdProductsFiltered.set(a['codigo'], a);
                            current = this.wpdProductsFiltered.get(a['codigo']);
                        } else {
                            current['estoque'] = +current['estoque'] + +a['estoque'];
                        }
                    }
                    this.wpdProductsFiltered.forEach(v => this.wpdProducts.push(v));
                    console.log(this.wpdProducts);
                });

        }
        console.log(this.currentInput.value);
        this.offset += 10;
        console.log(this.offset);
    }

    clearInputs(event, index) {
        this.offset = 0;
            this.codPro = document.getElementById('codPro' + index);
            this.stock = document.getElementById('stock' + index);
            if (event.value == '') {
                event.value = '';
                this.wpdProducts = [];
                this.stock.value = '';
                this.codPro.value = '';
            }
        }

    select(event, input, item, index) {
        if (item.unidade_estoque == undefined) item.unidade_estoque = '';
        if (event.innerHTML.length > 30) event.innerHTML = event.innerHTML.slice(0, 10) + '...';
        input.value = event.innerHTML;
        this.stock = document.getElementById('stock' + index);
        this.stock.value = item.estoque + ' ' + item.unidade_estoque;
        this.codPro = document.getElementById('codPro' + index);
        this.codPro.value = item.codigo;
        this.wpdProducts = [];
        this.offset = 0;
    }
}
