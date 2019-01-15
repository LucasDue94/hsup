import { Component, HostListener, OnInit } from '@angular/core';
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

    cancel = () => this.route.navigate(['solicitacao']);

    addField(event) {
        const parentNode = event.parentNode.childNodes[0].cloneNode(true);

        for (let parent of parentNode.childNodes) {
            for (let child of parent.childNodes) {
                if (child.nodeName == 'INPUT') child.value = '';
            }
        }

        if (this.countItemInput < 10) event.parentElement.appendChild(parentNode);
        if (parentNode.classList.contains('items')) this.countItemInput += 1;
    }

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.key === 'F5' && !confirm('Você tem certeza que deseja atualizar a página? Seus dados serão apagados.')) return false;
    }
}
