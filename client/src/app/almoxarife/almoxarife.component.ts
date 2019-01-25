import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

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

    @ViewChild('stock') stock;
    @ViewChild('codPro') codPro;
    @Input() itemsRequest = [{descricao: 'Memoria 8GB', qnt: '10', unidade: 'und'},
        {descricao: 'Mouse', qnt: '1', unidade: 'KG'},
        {descricao: 'Pilha', qnt: '1', unidade: 'KG'},
        {descricao: 'Coco', qnt: '1', unidade: 'KG'}];
    sector = 'Tecnologia da Informação';
    requestNumber = '0001';
    date = '19/12/2018';
    requestUser = 'Beroaldo da Silva Carneiro';
    wpdProducts: Produto[];
    wpdProductsFiltered = new Map();
    form: FormGroup;
    currentInput = null;
    offset = 0;
    limit = 10;
    almoxarifeList: Produto[] = [];
    scrollActived: boolean = false;

    constructor(private almoxarifeService: AlmoxarifeService, private fb: FormBuilder, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.wpdProducts = [];
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            products: this.fb.group({}),
            cods: this.fb.group({}),
            stocks: this.fb.group({})
        });

        this.createControlGroup("products", this.itemsRequest.length);
        this.createControlGroup("cods", this.itemsRequest.length);
        this.createControlGroup("stocks", this.itemsRequest.length);
    }

    createControlGroup(name, quantity) {
        let group;
        for (let i = 0; i < quantity; i++) {
            group = this.form.get(name);
            group.addControl(name.slice(0, -1) + i, new FormControl());
        }
    }

    find(input, scrollActived) {
        this.currentInput = input;
        const currentControl = this.form.get('products.' + this.currentInput.getAttribute('ng-reflect-name'));
        if (scrollActived) {
            this.almoxarifeService.search(currentControl.value, this.offset, this.limit).subscribe((almoxarifeList: Produto[]) => {
                this.almoxarifeList = almoxarifeList;
                if (this.almoxarifeList.length > 0) {
                    this.almoxarifeList.forEach(item => {
                        this.wpdProducts.push(item);
                    });
                }
            });
            this.offset += 10;
        } else {
            this.offset = 0;
            currentControl.valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .switchMap(inputValue => this.almoxarifeService.search(inputValue, this.offset, this.limit))
                .subscribe((produtos: Produto[]) => {
                    let current = '';
                    this.wpdProductsFiltered.clear();
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
                });
        }

        console.log(this.wpdProducts);
        console.log(this.offset);
    }

    clearInputs(index) {
        this.form.get('stocks.' + 'stock' + index).reset();
        this.form.get('cods.' + 'cod' + index).reset();
        this.form.get('products.' + 'product' + index).reset();
        this.wpdProducts = [];
        this.offset = 0;
    }

    select(item) {
        const index = this.currentInput.getAttribute('ng-reflect-name').slice(-1);
        let inputPro, inputSto, inputCod;
        inputPro = this.form.get('products.' + 'product' + index);
        inputSto = this.form.get('stocks.' + 'stock' + index);
        inputCod = this.form.get('cods.' + 'cod' + index);
        inputPro.setValue(item.descricao);
        inputSto.setValue(item.estoque);
        inputCod.setValue(item.codigo);
        this.wpdProducts = [];
        this.currentInput = null;
        this.scrollActived = false;
        this.offset = 0;
        // this.clearInputs(index);
    }

}
