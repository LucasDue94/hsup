import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Fornecedor } from '../core/fornecedor/fornecedor';
import { FornecedorService } from '../core/fornecedor/fornecedor.service';

@Component({
  selector: 'fornecedor-persist',
  templateUrl: './fornecedor-show.component.html'
})
export class FornecedorShowComponent implements OnInit {

  fornecedor = new Fornecedor();
  message: string;

  constructor(private route: ActivatedRoute, private fornecedorService: FornecedorService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.fornecedorService.get(+params['id']).subscribe((fornecedor: Fornecedor) => {
        this.fornecedor = fornecedor;
      });
    });
  }

  destroy() {
    if (confirm(`Deseja excluir o registro: {this.fornecedor.id}`)) {
      this.fornecedorService.destroy(this.fornecedor).subscribe((success: boolean) => {
        if (success) {
          this.message = `Fornecedor {this.fornecedor.id} excluído com sucesso!`;
          this.router.navigate(['/fornecedor','list']);
        } else {
          alert("Erro ao excluir");
        }
      });
    }
  }
}
