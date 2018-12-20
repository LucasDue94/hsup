import { AfterContentChecked, Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'almoxarife',
    templateUrl: './almoxarife.component.html',
    styleUrls: ['./almoxarife.component.scss']
})
export class AlmoxarifeComponent implements OnInit, AfterContentChecked {

    @Input() itemsRequest;
    @ViewChild('search') search;
    @ViewChild('') test;
    searchField: FormControl = new FormControl('');
    sector = 'Tecnologia da Informação';
    requestNumber = '0001';
    date = '19/12/2018';
    requestUser = 'Beroaldo da Silva Carneiro';
    fomrBuilder;

    constructor(private render: Renderer2, private almoxarifeForm: FormBuilder) {
    }

    ngOnInit() {

    }

    ngAfterContentChecked() {

        this.searchField.valueChanges.debounceTime(1000)
            .distinctUntilChanged().subscribe(element => this.searchWpd(element));
    }

    searchWpd(element) {
        // let array = [];
        // console.log(array);
    }

    onClickInput(event) {

    }


}
