import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Produto} from '../core/produto/produto';
import {ProdutoService} from '../core/produto/produto.service';
import {Response} from "@angular/http";


@Component({
  selector: 'produto-persist',
  templateUrl: './produto-persist.component.html'
})
export class ProdutoPersistComponent implements OnInit {

  produto = new Produto();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.produtoService.get(+params['id']).subscribe((produto: Produto) => {
          this.create = false;
          this.produto = produto;
        });
      }
      
    });
  }

  save() {
    this.produtoService.save(this.produto).subscribe((produto: Produto) => {
      this.router.navigate(['/produto', 'show', produto.id]);
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
