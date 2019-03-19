import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Perfil } from '../core/perfil/perfil';
import { PerfilService } from '../core/perfil/perfil.service';
import { Permissoes } from "../core/permissoes/permissoes";
import { PermissoesService } from "../core/permissoes/permissoes.service";


@Component({
    selector: 'perfil-persist',
    templateUrl: './perfil-persist.component.html'
})
export class PerfilPersistComponent implements OnInit {

    perfil = new Perfil();
    create = true;
    errors: any[];
    message;
    aPermissoes = [];
    permissoes = [];

    constructor(private route: ActivatedRoute, private perfilService: PerfilService, private router: Router, private permissoesService: PermissoesService) {
    }

    ngOnInit() {
        this.permissoesList();
        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.perfilService.get(+params['id']).subscribe((perfil: Perfil) => {
                    this.create = false;
                    this.perfil = perfil;
                    this.perfil.permissoes.forEach(p => {
                        this.permissoes.push(p.id)
                    });
                });
            }

        });
    }

    permissoesList() {
        this.permissoesService.list('', '')
            .subscribe((permissoesList: Permissoes[]) => {
                permissoesList.forEach(p => {
                    this.aPermissoes.push(p)
                });
            });

        return this.aPermissoes;
    }

    save() {
        this.perfilService.save(this.perfil).subscribe((perfil: Perfil) => {
            if (this.perfil.id != null) {
                this.message = `Perfil ${this.perfil.id} alterado com sucesso!`;
            } else {
                this.message = "Cadastro realizado com sucesso!";
            }

            let r = this.router;
            setTimeout(function () {
                r.navigate(['/perfil', 'show', perfil.id]);
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
