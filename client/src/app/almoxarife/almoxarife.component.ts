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

   /* wpdProducts = [
        {descricao: 'Mouse TIPO B', qnt: 3, stock: 4},
        {descricao: 'Mouse TIPO A', qnt: 3, stock: 4},
        {descricao: 'MousePad', qnt: 3, stock: 4},
        {descricao: 'Mouse Sem Fio', qnt: 3, stock: 4},
        {descricao: 'Notebook', qnt: 54, stock: 8},
        {descricao: 'Playstation 11', qnt: 1, stock: 0},
        {descricao: 'Playstation 22', qnt: 1, stock: 0},
        {descricao: 'Playstation 40', qnt: 1, stock: 0},
        {descricao: 'Playstation 12', qnt: 1, stock: 0},
        {descricao: 'Playstation 13', qnt: 1, stock: 0},
        {descricao: 'Playstation 40', qnt: 1, stock: 0},
        {descricao: 'Playstation 41', qnt: 1, stock: 0},
        {descricao: 'Playstation 42', qnt: 1, stock: 0},
        {descricao: 'Playstation 452', qnt: 1, stock: 0},
        {descricao: 'Playstation 44', qnt: 1, stock: 0},
        {descricao: 'Playstation 46', qnt: 1, stock: 0},
        {descricao: 'Playstation 48', qnt: 1, stock: 0},
        {descricao: 'Playstation 38', qnt: 1, stock: 0},
        {descricao: 'Playstation 2', qnt: 1, stock: 0},
        {descricao: 'Playstation 1', qnt: 1, stock: 0},
        {descricao: 'Liquidificador', qnt: 2, stock: 0},
    ];*/

    wpdProducts:Produto[];
    form;
    sector = 'Tecnologia da Informação';
    requestNumber = '0001';
    date = '19/12/2018';
    requestUser = 'Beroaldo da Silva Carneiro';
    loadIconStatus: boolean;

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

    onClickInput(event) {
        const currentControlName = event.target.getAttribute('ng-reflect-name');
        const currentControl = this.form.get(currentControlName);

        /*const value = this.form.get(currentControlName);
        value.valueChanges.debounceTime(1000).distinctUntilChanged()
            .subscribe(inputValue => this.searchItem(inputValue, event.target));*/


        console.log(currentControl.valueChanges);
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


    // searchItem(value, input) {
    //     if (value == '') return;
    //
    //     if (this.render.parentNode(input).getElementsByTagName('perfect-scrollbar').length == 0) {
    //         const ps = this.render.createElement('perfect-scrollbar');
    //         this.render.addClass(ps,'myScroll');
    //         const listDiv = this.render.createElement('div');
    //         this.render.addClass(listDiv, 'list');
    //
    //         for (let item of this.wpdProducts) {
    //             const div = this.render.createElement('div');
    //             this.render.addClass(div, 'item');
    //
    //             if (item.descricao.toLowerCase().includes(value.toLowerCase())) {
    //                 this.render.appendChild(div, this.render.createText(item.descricao));
    //                 this.render.appendChild(listDiv, div);
    //                 this.render.listen(div, 'click', () => {
    //                     input.value = div.innerHTML;
    //                     this.render.parentNode(div).remove();
    //                 });
    //             }
    //             this.render.appendChild(ps, listDiv);
    //             this.render.appendChild(this.render.parentNode(input), ps);
    //             /*this.render.listen(listDiv, 'mouseleave', () => {
    //                 setTimeout(() => { this.closeTransition(listDiv); }, 1, false);
    //             });
    //             this.render.listen(listDiv, 'mouseleave', () => {
    //                 setTimeout(() => { ps.remove(); }, 1000, false);
    //             });*/
    //         }
    //         setTimeout(() => { this.showTransition(listDiv); }, 1, false);
    //     } else {
    //         const ps = this.render.parentNode(input).getElementsByTagName('perfect-scrollbar').item(0);
    //         ps.remove();
    //         this.searchItem(value, input);
    //     }
    // }

    showTransition(element) {
        this.render.setStyle(element, 'opacity', '1');
    }

    closeTransition(element) {
        this.render.setStyle(element, 'opacity', '0');
    }
}
