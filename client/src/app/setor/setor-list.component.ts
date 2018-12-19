import { Component, OnInit } from '@angular/core';
import { Setor } from '../core/setor/setor';
import { SetorService } from '../core/setor/setor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'setor-list',
    templateUrl: './setor-list.component.html'
})
export class SetorListComponent implements OnInit {

    setorList: Setor[] = [];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;

    constructor(private route: ActivatedRoute, private setorService: SetorService, private router: Router) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.setorService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.setorService.list(this.count, searchTerm))
            .subscribe((setorList: Setor[]) => {this.setorList = setorList});


        if (this.searchControl.value == "" || this.searchControl.value == undefined) {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;

        this.setorService.list('', '', '', this._offset).subscribe((setorList: Setor[]) => {
            this.setorList = setorList
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
