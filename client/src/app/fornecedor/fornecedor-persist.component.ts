import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Fornecedor} from '../core/fornecedor/fornecedor';
import {FornecedorService} from '../core/fornecedor/fornecedor.service';
import {Response} from "@angular/http";


@Component({
  selector: 'fornecedor-persist',
  templateUrl: './fornecedor-persist.component.html'
})
export class FornecedorPersistComponent implements OnInit {

  fornecedor = new Fornecedor();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private fornecedorService: FornecedorService, private router: Router) {}

  ngOnInit() {
    this.fornecedor.ativo = false;
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.fornecedorService.get(+params['id']).subscribe((fornecedor: Fornecedor) => {
          this.create = false;
          this.fornecedor = fornecedor;
        });
      }
      
    });
  }

  save() {
    this.fornecedorService.save(this.fornecedor).subscribe((fornecedor: Fornecedor) => {
      this.router.navigate(['/fornecedor', 'show', fornecedor.id]);
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
