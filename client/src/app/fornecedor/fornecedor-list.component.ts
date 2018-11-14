import { Component, OnInit } from '@angular/core';
import { Fornecedor } from "../core/fornecedor/fornecedor";
import { FornecedorService } from "../core/fornecedor/fornecedor.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'fornecedor-list',
    templateUrl: './fornecedor-list.component.html'
})
export class FornecedorListComponent implements OnInit {

    fornecedorList: Fornecedor[] = [];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;
    message;

    constructor(private route: ActivatedRoute, private fornecedorService: FornecedorService, private router: Router) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.fornecedorService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.fornecedorService.list(this.count, searchTerm))
            .subscribe((fornecedorList: Fornecedor[]) => {this.fornecedorList = fornecedorList});

        if (this.searchControl.value == "") {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;

        this.fornecedorService.list('', '', this._offset).subscribe((fornecedorList: Fornecedor[]) => {
            this.fornecedorList = fornecedorList
        });
    }

    changePageData() {
        this.list(this._pageNumber);
    }

    get pageNumber(): number {
        return this._pageNumber;
    }

    set pageNumber(pageNumber: number) {
        this._pageNumber = pageNumber;
        this.changePageData();
    }
}
