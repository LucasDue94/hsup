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
    countList = 0;
    cod = null;
    stock = null;
    offset = 0;
    limit = 10;
    almoxarifeList: Produto[] = [];
    count: number;

    constructor(private almoxarifeService: AlmoxarifeService, private fb: FormBuilder, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.wpdProducts = [];
        this.buildForm();

        this.almoxarifeService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });
    }

    buildForm() {
        this.form = this.fb.group({});
        for (let i = 0; i < this.itemsRequest.length; i++) {
            this.form.addControl('' + i, new FormControl());
        }
    }


    find(input, scrollActived = false) {
        this.currentInput = input;
        const currentControl = this.form.get('' + input.id);
        if (scrollActived) {
            this.offset += 10;
            this.almoxarifeService.search(currentControl.value, this.offset, '').subscribe((almoxarifeList: Produto[]) => {
                this.almoxarifeList = almoxarifeList;
                if (this.almoxarifeList.length > 0) {
                    this.almoxarifeList.forEach(item => {
                        this.wpdProducts.push(item);
                    });
                }
            });
        } else {
            this.offset = 0;
            currentControl.valueChanges
                .debounceTime(1000)
                .distinctUntilChanged()
                .subscribe(inputValue => {
                    if (inputValue != '') {
                        this.almoxarifeService.search(inputValue, this.offset, '').subscribe((produtos: Produto[]) => {
                            let current = '';
                            this.wpdProductsFiltered.clear();
                            this.wpdProducts.length = 0;
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

                    currentControl.valueChanges
                        .debounceTime(1000)
                        .distinctUntilChanged()
                        .switchMap(v =>
                            this.almoxarifeService.countList(v, this.count)).subscribe((count: number) => {
                        this.countList = count;
                    });
                })
        }

    }

    select(item) {
        this.currentInput.value = item.descricao;
        this.cod = document.getElementById('cod' + this.currentInput.id);
        this.stock = document.getElementById('stock' + this.currentInput.id);
        this.cod.value = item.codigo;
        this.stock.value = item.estoque;
        this.offset = 0;
        this.wpdProducts.length = 0;
    }

    clearInputs() {
        this.cod = document.getElementById('cod' + this.currentInput.id);
        this.stock = document.getElementById('stock' + this.currentInput.id);
        if (this.cod.value == '' || this.currentInput.value == '') {
            this.wpdProducts.length = 0;
            this.wpdProducts = [];
            this.stock.value = '';
            this.cod.value = '';
            this.currentInput.value = '';
            this.offset = 0;
        }
    }
}
