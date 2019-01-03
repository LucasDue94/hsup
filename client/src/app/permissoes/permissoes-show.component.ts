import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Permissoes } from '../core/permissoes/permissoes';
import { PermissoesService } from '../core/permissoes/permissoes.service';

@Component({
  selector: 'permissoes-persist',
  templateUrl: './permissoes-show.component.html'
})
export class PermissoesShowComponent implements OnInit {

  permissoes = new Permissoes();
  message: string;

  constructor(private route: ActivatedRoute, private permissoesService: PermissoesService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.permissoesService.get(+params['id']).subscribe((permissoes: Permissoes) => {
        this.permissoes = permissoes;
      });
    });
  }

  destroy() {
    if (confirm(`Deseja excluir o registro: {this.permissoes.id}`)) {
      this.permissoesService.destroy(this.permissoes).subscribe((success: boolean) => {
        if (success) {
          this.message = `Permissoes {this.permissoes.id} excluído com sucesso!`;
          this.router.navigate(['/permissoes','list']);
        } else {
          alert("Erro ao excluir");
        }
      });
    }
  }
}
