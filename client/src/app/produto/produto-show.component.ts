import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Produto } from '../core/produto/produto';
import { ProdutoService } from '../core/produto/produto.service';

@Component({
  selector: 'produto-persist',
  templateUrl: './produto-show.component.html'
})
export class ProdutoShowComponent implements OnInit {

  produto = new Produto();
  message: string;

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.produtoService.get(+params['id']).subscribe((produto: Produto) => {
        this.produto = produto;
      });
    });
  }

  destroy() {
    if (confirm(`Deseja excluir o registro: {this.produto.id}`)) {
      this.produtoService.destroy(this.produto).subscribe((success: boolean) => {
        if (success) {
          this.message = `Produto {this.produto.id} excluído com sucesso!`;
          this.router.navigate(['/produto','list']);
        } else {
          alert("Erro ao excluir");
        }
      });
    }
  }
}
