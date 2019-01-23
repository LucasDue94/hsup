import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

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

    /*items = [{desc: 'ITEM 1', qnt: 2},
        {desc: 'ITEM 1', qnt: 1},
        {desc: 'ITEM 2', qnt: 2},
        {desc: 'ITEM 3', qnt: 42},
        {desc: 'ITEM 4', qnt: 23},
        {desc: 'ITEM 5', qnt: 12},
        {desc: 'ITEM 6', qnt: 12},
        {desc: 'ITEM 7', qnt: 12},
        {desc: 'ITEM 8', qnt: 12},
        {desc: 'ITEM 9', qnt: 12},
        {desc: 'ITEM 10', qnt: 12},

    ];

    fruits = [
        {desc: 'JACA', qnt:1},
        {desc: 'MANGA', qnt:1},
        {desc: 'PERA', qnt:1},
        {desc: 'banana', qnt:1},
        {desc: 'ABACATE', qnt:1},
        {desc: 'CAQUI', qnt:1},
    ];*/

    solicitacaoList = [
        {id: '0001', setor: 'TI', solicitante: 'JOAQUIM', aprovacao: true},
        {id: '0002', setor: 'FINANCEIRO', solicitante: 'SOLICITADOR', aprovacao: false},
        {id: '0003', setor: 'FATURAMENTO', solicitante: 'MARIA', aprovacao: false},
        {id: '0004', setor: 'SUPRIMENTOS', solicitante: 'LARISSA', aprovacao: true},
        {id: '0005', setor: 'ALMOXARIFE', solicitante: 'ROBSON CARECA', aprovacao: true}
    ];

    itemsRequest = [{
        descricao: 'Memória RAM 4GB',
        qnt: '4 UN',
        fabricante: ['Kingston', 'Multilaser', 'DELL', "HP"],
        fornecedor: ['Mixpel', 'HIPER', 'EXTRA', 'VAREJO LTDA', 'COISAS', 'FONECEDOR TOP']
    },
        {
            descricao: 'Mouse sem fio',
            qnt: '1 UN',
            fabricante: ['Logitech'],
            fornecedor: ['Cabeça de martelo']
        },
        {
            descricao: 'BATERIA',
            qnt: '1 UN',
            fabricante: ['Logitech'],
            fornecedor: ['Cabeça de martelo']
        },
        {
            descricao: 'Memória RAM 4GB',
            qnt: '4 UN',
            fabricante: ['Kingston', 'Multilaser', 'DELL', "HP"],
            fornecedor: ['Mixpel', 'HIPER', 'EXTRA', 'VAREJO LTDA', 'COISAS', 'FONECEDOR TOP']
        },
        {
            descricao: 'BATERIA',
            qnt: '1 UN',
            fabricante: ['Logitech'],
            fornecedor: ['Cabeça de martelo']
        }

    ];


    constructor(private render: Renderer2) {
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
/*
    scrollDown() {
        console.log('Down!');
        for (let fruit of this.fruits) {
            this.items.push(fruit);
            if(fruit.desc == 'BANANA'){

            }
        }
        console.log(this.items);
    }*/
}
