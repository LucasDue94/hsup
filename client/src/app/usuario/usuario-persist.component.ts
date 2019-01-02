import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../core/usuario/usuario';
import { UsuarioService } from '../core/usuario/usuario.service';
import { Response } from "@angular/http";
import { Perfil } from "../core/perfil/perfil";
import { PerfilService } from "../core/perfil/perfil.service";


@Component({
    selector: 'usuario-persist',
    templateUrl: './usuario-persist.component.html'
})
export class UsuarioPersistComponent implements OnInit {

    usuario = new Usuario();
    create = true;
    errors: any[];
    message;
    private aPerfis = [];


    constructor(private route: ActivatedRoute, private perfilService: PerfilService, private usuarioService: UsuarioService, private router: Router) {
    }

    ngOnInit() {
        this.getPerfil();
        this.usuario.passwordExpired = false;
        this.usuario.accountLocked = false;
        this.usuario.accountExpired = false;
        this.usuario.enabled = true;
        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
                    this.create = false;
                    this.usuario = usuario;
                });
            }

        });
    }

    getPerfil() {
        this.perfilService.list('', '', '').subscribe((perfilList: Perfil[]) => {
            perfilList.forEach(p => {
                this.aPerfis.push(p)
            })
        });

        return this.aPerfis;
    }

    save() {
        this.usuarioService.save(this.usuario).subscribe((usuario: Usuario) => {
            if (this.usuario.id != null) {
                this.message = `Usuário ${this.usuario.name} alterado com sucesso!`;
            } else {
                this.message = "Cadastro realizada com sucesso!";
            }

            let r = this.router;
            setTimeout(function () {
                r.navigate(['/usuario', 'show', usuario.id]);
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
