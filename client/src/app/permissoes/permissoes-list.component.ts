import { Component, OnInit } from '@angular/core';
import { Permissoes } from '../core/permissoes/permissoes';
import { PermissoesService } from '../core/permissoes/permissoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'permissoes-list',
    templateUrl: './permissoes-list.component.html'
})
export class PermissoesListComponent implements OnInit {

    permissoesList: Permissoes[] = [];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;

    constructor(private route: ActivatedRoute, private permissoesService: PermissoesService, private router: Router) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.permissoesService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.permissoesService.list(this.count, searchTerm))
            .subscribe((permissoesList: Permissoes[]) => {this.permissoesList = permissoesList});


        if (this.searchControl.value == "" || this.searchControl.value == undefined) {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;

        this.permissoesService.list('', '', this._offset).subscribe((permissoesList: Permissoes[]) => {
            this.permissoesList = permissoesList
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
