import { Component, OnInit } from '@angular/core';
import { Fabricante } from '../core/fabricante/fabricante';
import { FabricanteService } from '../core/fabricante/fabricante.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'fabricante-list',
    templateUrl: './fabricante-list.component.html'
})
export class FabricanteListComponent implements OnInit {

    private _fabricanteList: Fabricante[] = [];
    getAll: Fabricante[] = [];
    count: number;
    private _pageNumber: number;
    private _offset;

    constructor(private route: ActivatedRoute, private fabricanteService: FabricanteService) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.list(this.pageNumber);

        this.fabricanteService.count().subscribe((quantity: number) => {
           this.count = quantity;
        });
    }

    list(p: number) {
        this._offset = (p - 1) * 10;

        this.fabricanteService.list(this._offset).subscribe((fabricanteList: Fabricante[]) => {
            this._fabricanteList = fabricanteList;
            // console.log(this._fabricanteList.filter(v => v.nome == 'HP'))
        });
    }

    get fabricanteList(): Fabricante[] {
        return this._fabricanteList;
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