import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Permissoes } from '../core/permissoes/permissoes';
import { PermissoesService } from '../core/permissoes/permissoes.service';
import { Response } from "@angular/http";


@Component({
    selector: 'permissoes-persist',
    templateUrl: './permissoes-persist.component.html'
})
export class PermissoesPersistComponent implements OnInit {

    permissoes = new Permissoes();
    create = true;
    errors: any[];
    private message: string;


    constructor(private route: ActivatedRoute, private permissoesService: PermissoesService, private router: Router) {
    }

    ngOnInit() {

        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.permissoesService.get(+params['id']).subscribe((permissoes: Permissoes) => {
                    this.create = false;
                    this.permissoes = permissoes;
                });
            }

        });
    }

    save() {
        this.permissoesService.save(this.permissoes).subscribe((permissoes: Permissoes) => {
            if (this.permissoes.id != null) {
                this.message = `Permissoes ${this.permissoes.id} alterado com sucesso!`;
            } else {
                this.message = "Cadastro realizado com sucesso!";
            }

            let r = this.router;
            setTimeout(function () {
                r.navigate(['/permissoes', 'show', permissoes.id]);
            }, 3000);
        }, (res) => {
            const json = res.error;
            if (json.hasOwnProperty('message')) {
                this.errors = [json];
            } else {
                this.errors = json._embedded.errors;
            }
        });
    }
}
