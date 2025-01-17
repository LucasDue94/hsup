import { Component, OnInit } from '@angular/core';
import { ${className} } from '../core/${propertyName}/${propertyName}';
import { ${className}Service } from '../core/${propertyName}/${propertyName}.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: '${propertyName}-list',
    templateUrl: './${propertyName}-list.component.html'
})
export class ${className}ListComponent implements OnInit {

    ${propertyName}List: ${className}[] = [];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;

    constructor(private route: ActivatedRoute, private ${propertyName}Service: ${className}Service, private router: Router) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.${propertyName}Service.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.${propertyName}Service.list(this.count, searchTerm))
            .subscribe((${propertyName}List: ${className}[]) => {this.${propertyName}List = ${propertyName}List});


        if (this.searchControl.value == "" || this.searchControl.value == undefined) {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;

        this.${propertyName}Service.list('', '', '', this._offset).subscribe((${propertyName}List: ${className}[]) => {
            this.${propertyName}List = ${propertyName}List
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
