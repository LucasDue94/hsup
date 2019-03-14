import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../core/usuario/usuario';
import { UsuarioService } from '../core/usuario/usuario.service';
import { PerfilService } from '../core/perfil/perfil.service';
import { Perfil } from '../core/perfil/perfil';
import { PermissoesService } from '../core/permissoes/permissoes.service';
import { Permissoes } from '../core/permissoes/permissoes';

@Component({
    selector: 'usuario-persist',
    templateUrl: './usuario-persist.component.html'
})
export class UsuarioPersistComponent implements OnInit {

    usuario = new Usuario();
    create = true;
    errors: any[];
    message;
    aPerfis = [];
    aPermissoes = [];

    constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private router: Router, private perfilService: PerfilService, private permissoesService: PermissoesService) {
    }

    ngOnInit() {
        this.perfilList();
        this.permissoesList();

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

    perfilList () {
        this.perfilService.list( '', '').subscribe((perfilList: Perfil[]) => {
            perfilList.forEach(p => {
                this.aPerfis.push(p)
            });
        });

        return this.aPerfis;
    }

    permissoesList () {
        this.permissoesService.list('', '').subscribe((permissoesList: Permissoes[]) => {
            permissoesList.forEach(p => {
                this.aPermissoes.push(p)
            });
        });

        return this.aPermissoes;
    }


    save() {
        this.usuarioService.save(this.usuario).subscribe((usuario: Usuario) => {
            if (this.usuario.id != null) {
                this.message = `Usuario ${this.usuario.id} alterado com sucesso!`;
            } else {
                this.message = "Cadastro realizado com sucesso!";
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
