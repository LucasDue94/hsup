import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { Solicitacao } from "../core/solicitacao/solicitacao";

@Component({
    selector: 'solicitacao-approval',
    templateUrl: './solicitacao-approval.component.html',
    styleUrls: ['./solicitacao-approval.component.scss']
})
export class SolicitacaoApprovalComponent implements OnInit {

    @ViewChild('iconContainer') iconContainer;
    @ViewChild('iconContent') iconContent;
    urgency: boolean = false;
    private _pageNumber: number;
    private _offset;
    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;
    message;
    solicitacaoList: Solicitacao[] = [];

    constructor(private render: Renderer2, private solicitacaoService: SolicitacaoService) {
        this._pageNumber = 0;
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });
    }

    ngOnInit() {
        this.solicitacaoService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.solicitacaoService.list(this.count, searchTerm))
            .subscribe((solicitacaoList: Solicitacao[]) => {
                this.solicitacaoList = solicitacaoList
            });

        if (this.searchControl.value == "") {
            this.list(this.pageNumber);
        }

        this.count = this.solicitacaoList.length;
        this.list(this._pageNumber);
    }

    list(p: number) {
        this._offset = (p - 1) * 10;
        this.solicitacaoService.list('', '', this._offset).subscribe((solicitacaoList: Solicitacao[]) => {
            this.solicitacaoList = solicitacaoList;
            console.log(this.solicitacaoList);
        });
        return this.solicitacaoList;

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

    changeApprovalStatus(solicitacao) {
        solicitacao.aprovacao = !solicitacao.aprovacao;
    }

    getApprovalStatus(solicitacao) {
        return solicitacao.aprovacao ? 'Sim' : 'Não';
    }

    setUrgency() {
        this.iconContent = document.getElementById('iconContent');
        this.urgency = !this.urgency;
        if (this.urgency == true) {
            this.render.addClass(this.iconContainer.nativeElement, 'enable-urgency-container');
            this.render.addClass(this.iconContent, 'enable');
        } else if (this.urgency == false) {
            this.render.removeClass(this.iconContainer.nativeElement, 'enable-urgency-container');
            this.render.removeClass(this.iconContent, 'enable');
        }
    }
}
