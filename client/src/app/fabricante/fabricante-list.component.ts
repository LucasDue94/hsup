import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Fabricante } from '../core/fabricante/fabricante';
import { FabricanteService } from '../core/fabricante/fabricante.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Authentic } from "../authentic";

@Component({
    selector: 'fabricante-list',
    templateUrl: './fabricante-list.component.html'
})
export class FabricanteListComponent implements OnInit, AfterViewInit {

    fabricanteList: Fabricante[] = [];
    private _pageNumber: number;
    private _offset;
    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;
    message;
    error;
    loading;

    constructor(private route: ActivatedRoute, private fabricanteService: FabricanteService, private router: Router) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.fabricanteService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm => {
                this.loading = true;
                return this.fabricanteService.search(searchTerm, this._offset)
            })
            .subscribe((fabricanteList: Fabricante[]) => {
                this.fabricanteList = fabricanteList;
                this.loading = false;
            });

        if (this.searchControl.value == "") {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;
        this.loading = true;
        this.fabricanteService.list('', this._offset).subscribe((fabricanteList: Fabricante[]) => {
            this.fabricanteList = fabricanteList;
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

    ngAfterViewInit(): void {
    }
}