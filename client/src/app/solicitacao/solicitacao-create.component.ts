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

    addField(event) {
        const parentNode = event.parentNode.childNodes[0].cloneNode(true);
        event.parentElement.appendChild(parentNode);
    }
}
