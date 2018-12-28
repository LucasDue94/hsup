import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../core/usuario/usuario';
import { UsuarioService } from '../core/usuario/usuario.service';

@Component({
  selector: 'usuario-persist',
  templateUrl: './usuario-show.component.html'
})
export class UsuarioShowComponent implements OnInit {

  usuario = new Usuario();
  message: string;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      });
    });
  }

  destroy() {
    if (confirm(`Deseja excluir o registro: {this.usuario.id}`)) {
      this.usuarioService.destroy(this.usuario).subscribe((success: boolean) => {
        if (success) {
          this.message = `Usuario {this.usuario.id} excluído com sucesso!`;
          this.router.navigate(['/usuario','list']);
        } else {
          alert("Erro ao excluir");
        }
      });
    }
  }
}
