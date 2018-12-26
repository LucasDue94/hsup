import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
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
        if (this.render.parentNode(input).getElementsByClassName('list').length == 0) {
            const ul = this.render.createElement('ul');
            this.render.addClass(ul, 'list');
            if (value != '') {
                this.wpdProducts.sort(function (a, b) {
                    if (a.desc < b.desc) {
                        return -1
                    }
                    if (a.desc > b.desc) {
                        return 1
                    }
                    return 0;
                });
                for (let item of this.wpdProducts) {
                    if (item.desc.toLowerCase().includes(value.toLowerCase()) && value != '') {
                        let li = this.render.createElement('li');
                        this.render.addClass(li, 'item');
                        this.render.appendChild(li, this.render.createText(item.desc));
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
            console.log('entrou aqui');
            const ul = this.render.parentNode(input).getElementsByClassName('list').item(0);
            // setTimeout(() => {this.closeTransition(ul)},1,false);
            // console.log(ul);
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
