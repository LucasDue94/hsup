import { Component, OnInit } from '@angular/core';
import { Produto } from '../core/produto/produto';
import { ProdutoService } from '../core/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'produto-list',
    templateUrl: './produto-list.component.html'
})
export class ProdutoListComponent implements OnInit {

    produtoList: Produto[] = [];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;

    constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private router: Router) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.produtoService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.produtoService.list(this.count, searchTerm))
            .subscribe((produtoList: Produto[]) => {this.produtoList = produtoList});


        if (this.searchControl.value == "" || this.searchControl.value == undefined) {
            this.list(this.pageNumber);
        }

    }

    list(p: number) {
        this._offset = (p - 1) * 10;

        this.produtoService.list('', '', '', this._offset).subscribe((produtoList: Produto[]) => {
            this.produtoList = produtoList
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

