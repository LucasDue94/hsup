import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit {

    constructor(private route: Router) {
    }

    ngOnInit() {
    }

    cancel() {
        this.route.navigate(['solicitacao'])
    }

}
