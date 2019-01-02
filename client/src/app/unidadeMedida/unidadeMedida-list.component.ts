import {Component, OnInit} from '@angular/core';
import {UnidadeMedida} from '../core/unidadeMedida/unidadeMedida';
import {UnidadeMedidaService} from '../core/unidadeMedida/unidadeMedida.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Fornecedor} from "../core/fornecedor/fornecedor";

@Component({
    selector: 'unidadeMedida-list',
    templateUrl: './unidadeMedida-list.component.html'
})
export class UnidadeMedidaListComponent implements OnInit {

    unidadeMedidaList: UnidadeMedida[] = [];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;

    constructor(private route: ActivatedRoute, private unidadeMedidaService: UnidadeMedidaService, private router: Router) {
        this._pageNumber = 0;
    }

    ngOnInit() {

        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.unidadeMedidaService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.unidadeMedidaService.list(this.count, searchTerm))
            .subscribe((unidadeMedidaList: UnidadeMedida[]) => {
                this.unidadeMedidaList = unidadeMedidaList
            });


        if (this.searchControl.value == "") {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;

        this.unidadeMedidaService.list('', '', this._offset).subscribe((unidadeMedidaList: UnidadeMedida[]) => {
            this.unidadeMedidaList = unidadeMedidaList
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
