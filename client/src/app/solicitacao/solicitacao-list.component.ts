import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitacao } from "../core/solicitacao/solicitacao";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'solicitacao',
    templateUrl: './solicitacao-list.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoListComponent implements OnInit {

    solicitacaoList: Solicitacao[] = [];

    private _pageNumber: number;
    private _offset;

    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;
    message;
    error;
    loading: boolean;

    constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService, private router: Router) {
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
            .switchMap(searchTerm => {
                this.loading = true;
                return this.solicitacaoService.list(this.count, searchTerm)
            })
            .subscribe((solicitacaoList: Solicitacao[]) => {
                this.solicitacaoList = solicitacaoList;
                this.loading = false;
            });

        if (this.searchControl.value == "") {
            this.list(this.pageNumber);
        }
    }

    list(p: number) {
        this._offset = (p - 1) * 10;
        this.loading = true;
        this.solicitacaoService.list('', '', this._offset).subscribe((solicitacaoList: Solicitacao[]) => {
            this.solicitacaoList = solicitacaoList;
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
