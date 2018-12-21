import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Perfil } from '../core/perfil/perfil';
import { PerfilService } from '../core/perfil/perfil.service';

@Component({
  selector: 'perfil-persist',
  templateUrl: './perfil-show.component.html'
})
export class PerfilShowComponent implements OnInit {

  perfil = new Perfil();
  message: string;

  constructor(private route: ActivatedRoute, private perfilService: PerfilService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.perfilService.get(+params['id']).subscribe((perfil: Perfil) => {
        this.perfil = perfil;
      });
    });
  }

  destroy() {
    if (confirm(`Deseja excluir o registro: {this.perfil.id}`)) {
      this.perfilService.destroy(this.perfil).subscribe((success: boolean) => {
        if (success) {
          this.message = `Perfil {this.perfil.id} excluído com sucesso!`;
          this.router.navigate(['/perfil','list']);
        } else {
          alert("Erro ao excluir");
        }
      });
    }
  }
}
