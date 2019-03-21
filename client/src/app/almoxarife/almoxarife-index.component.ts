import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { Solicitacao } from "../core/solicitacao/solicitacao";

@Component({
    selector: 'almoxarife-index',
    templateUrl: './almoxarife-index.component.html',
    styleUrls: ['./almoxarife-index.component.scss']
})
export class AlmoxarifeIndexComponent implements OnInit {

    solicitacaoList: Solicitacao[] = [];
    private _pageNumber: number;
    private _offset;
    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;
    message;

    constructor(private solicitacaoService: SolicitacaoService) {
        this._pageNumber = 0;
    }

    ngOnInit() {
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.solicitacaoService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.solicitacaoService.list(this.count, searchTerm))
            .subscribe((solicitacaoList: Solicitacao[]) => {
                this.solicitacaoList = solicitacaoList;
                (this.solicitacaoList);
            });

        if (this.searchControl.value == "") {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;
        this.solicitacaoService.list('', '', this._offset).subscribe((solicitacaoList: Solicitacao[]) => {
            this.solicitacaoList = solicitacaoList
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

    countItemsAssociados(solicitacao) {
        let count = 0;
        solicitacao.itens.forEach(solicitacaoItem => {
            if (solicitacaoItem.item.produto != null) {
                count++;
            }
        });
        (solicitacao.urgente);
        return count;
    }

    getPriority(solicitacao){
        return solicitacao.urgente ? 'urgente':'normal';
    }

}
