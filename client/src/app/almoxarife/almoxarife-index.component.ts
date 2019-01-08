import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Fabricante } from "../core/fabricante/fabricante";

@Component({
    selector: 'almoxarife-index',
    templateUrl: './almoxarife-index.component.html',
    styleUrls: ['./almoxarife-index.component.scss']
})
export class AlmoxarifeIndexComponent implements OnInit {

    solicitacaoList = [
        {id: '0001', setor: 'TI', solicitante: 'JOAQUIM'},
        {id: '0002', setor: 'FINANCEIRO', solicitante: 'SOLICITADOR'},
        {id: '0003', setor: 'FATURAMENTO', solicitante: 'MARIA'},
        {id: '0004', setor: 'SUPRIMENTOS', solicitante: 'LARISSA'},
        {id: '0005', setor: 'ALMOXARIFE', solicitante: 'ROBSON CARECA'},
        {id: '0006', setor: 'RECEPÇÃO', solicitante: 'BEROALDO'},
        {id: '0007', setor: 'RECEPÇÃO', solicitante: 'BEROALDO'},
        {id: '0008', setor: 'RECEPÇÃO', solicitante: 'BEROALDO'},
        {id: '0009', setor: 'RECEPÇÃO', solicitante: 'BEROALDO'},
        {id: '00010', setor: 'RECEPÇÃO', solicitante: 'BEROALDO'},
        {id: '00011', setor: 'RECEPÇÃO', solicitante: 'BEROALDO'}
        ];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;
    message;

    constructor() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.count = this.solicitacaoList.length;
        this.list(this._pageNumber);
    }

    list(p: number) {
        this._offset = (p - 1) * 10;
        return this.solicitacaoList;

        /*this.solicitacaoService.list('', '', this._offset).subscribe((solicitacaoList: Solicitacao[]) => {
            this.solicitacaoList = solicitacaoList;
        });*/
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
