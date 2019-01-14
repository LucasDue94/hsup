import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'solicitacao-create',
    templateUrl: './solicitacao-create.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoCreateComponent implements OnInit {

    countItemInput = 1;

    constructor(private route: Router) {
    }

    ngOnInit() {
    }

    cancel() {
        this.route.navigate(['solicitacao'])
    }

    addField(event) {
        const parentNode = event.parentNode.childNodes[0].cloneNode(true);
        this.setContainer(event);
        if (this.countItemInput < 10) event.parentElement.appendChild(parentNode);
        if (parentNode.classList.contains('items')) this.countItemInput += 1;
    }

    setContainer(el) {
        if (el.parentNode.classList.contains('list-item-container')) {
            let container = el.parentNode;
        }
    }
}
