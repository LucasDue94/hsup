import { Component, OnInit } from '@angular/core';
import { Perfil } from '../core/perfil/perfil';
import { PerfilService } from '../core/perfil/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'perfil-list',
    templateUrl: './perfil-list.component.html'
})
export class PerfilListComponent implements OnInit {

    perfilList: Perfil[] = [];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;
    loading: boolean;

    constructor(private route: ActivatedRoute, private perfilService: PerfilService, private router: Router) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.perfilService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm => {
                this.loading = true;
                if (searchTerm == '') return this.perfilService.list('', this._offset);
                return this.perfilService.search(searchTerm, this._offset)
            })
            .subscribe((perfilList: Perfil[]) => {
                this.perfilList = perfilList;
                this.loading = false;
            });

        if (this.searchControl.value == "") {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;
        this.loading = true;
        this.perfilService.list('', this._offset).subscribe((perfilList: Perfil[]) => {
            this.perfilList = perfilList;
            this.loading = false;
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
