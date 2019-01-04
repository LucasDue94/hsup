import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UnidadeMedida } from '../core/unidadeMedida/unidadeMedida';
import { UnidadeMedidaService } from '../core/unidadeMedida/unidadeMedida.service';

@Component({
  selector: 'unidadeMedida-persist',
  templateUrl: './unidadeMedida-show.component.html'
})
export class UnidadeMedidaShowComponent implements OnInit {

  unidadeMedida = new UnidadeMedida();
  message: string;

  constructor(private route: ActivatedRoute, private unidadeMedidaService: UnidadeMedidaService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.unidadeMedidaService.get(+params['id']).subscribe((unidadeMedida: UnidadeMedida) => {
        this.unidadeMedida = unidadeMedida;
      });
    });
  }

  destroy() {
    if (confirm(`Deseja excluir o registro: ${this.unidadeMedida.id}`)) {
      this.unidadeMedidaService.destroy(this.unidadeMedida).subscribe((success: boolean) => {
        if (success) {
          this.message = `UnidadeMedida ${this.unidadeMedida.descricao} excluído com sucesso!`;
          this.router.navigate(['/unidadeMedida','list']);
        } else {
          alert("Erro ao excluir");
        }
      });
    }
  }
}
