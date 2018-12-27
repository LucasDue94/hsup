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
    wpdProducts:Produto[];
    form;
    sector = 'Tecnologia da Informação';
    requestNumber = '0001';
    date = '19/12/2018';
    requestUser = 'Beroaldo da Silva Carneiro';

    constructor(private almoxarifeService: AlmoxarifeService, private fb: FormBuilder, private render: Renderer2, private elementRef: ElementRef) {
        this.form = this.fb.group({
            value: 'myBuilder', disable: false,
        });
    }

    ngOnInit() {
        this.createFormControl();
        this.wpdProducts = [];
        let newdiv = this.render.createElement('div');
    /*    this.render.appendChild(newdiv, this.render.createText('newText'));
        this.render.setStyle(newdiv,'background-color','rgba(0,0,0,0.3)');
        this.render.setStyle(newdiv,'z-index','99 !important');
        this.render.setStyle(newdiv,'height','100%');
        this.render.setStyle(newdiv,'position','absolute');
        this.render.addClass(newdiv,'col-12');*/
        console.log(document.getElementsByClassName('medium').item(0));
        console.log(this.main);
        // this.render.setStyle(this.elementRef.nativeElement,'background-color','rgba(0,0,0,1)!important');
       /* this.render.insertBefore(this.elementRef.nativeElement, newdiv, this.main.nativeElement);*/
        console.log(newdiv);

    }

    createFormControl() {
        for (let i = 0; i < this.itemsRequest.length; i++) {
            this.form.addControl('searchField' + i, new FormControl());
        }
    }

    onClickInput(event) {
        const currentControlName = event.target.getAttribute('ng-reflect-name');
        const currentControl = this.form.get(currentControlName);

        currentControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(inputValue => this.almoxarifeService.search(inputValue))
            .subscribe((almoxarife: Produto[]) => {
                this.wpdProducts = almoxarife;
            });

        const value = this.form.get(currentControlName);
        value.valueChanges.debounceTime(1000).distinctUntilChanged()
            .subscribe(inputValue => this.searchItem(inputValue, event.target));

    }

    searchItem(value, input) {
        if (this.render.parentNode(input).getElementsByClassName('list').length == 0) {
            const ul = this.render.createElement('ul');
            this.render.addClass(ul, 'list');
            if (value != '') {
                /*this.wpdProducts.sort(function (a, b) {
                    if (a.descricao < b.descricao) {
                        return -1
                    }
                    if (a.descricao > b.descricao) {
                        return 1
                    }
                    return 0;
                });*/

                for (let item of this.wpdProducts) {
                    // console.log(item.descricao);
                    if (item.descricao.toLowerCase().includes(value.toLowerCase()) && value != '') {
                        let li = this.render.createElement('li');
                        this.render.addClass(li, 'item');
                        this.render.appendChild(li, this.render.createText(item.descricao));
                        this.render.appendChild(ul, li);
                        this.render.listen(li, 'click', () => {
                            input.value = li.innerHTML;
                            ul.remove();
                        });
                    }
                    this.render.appendChild(this.render.parentNode(input), ul);
                    this.render.listen(ul, 'mouseleave', () => {
                        setTimeout(() => {
                            this.closeTransition(ul);
                        }, 1, false);
                    });
                    this.render.listen(ul, 'mouseleave', () => {
                        setTimeout(() => {
                            ul.remove();
                        }, 1000, false);
                    });
                }
                setTimeout(() => {
                    this.showTransition(ul)
                }, 1, false);
                console.log(ul);
            }
        } else {
            const ul = this.render.parentNode(input).getElementsByClassName('list').item(0);
            ul.remove();
            this.searchItem(value, input);
        }
    }

    showTransition(element) {
        this.render.setStyle(element, 'opacity', '1');
    }

    closeTransition(element) {
        this.render.setStyle(element, 'opacity', '0');
    }
}
