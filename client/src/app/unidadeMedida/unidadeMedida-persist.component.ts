import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UnidadeMedida} from '../core/unidadeMedida/unidadeMedida';
import {UnidadeMedidaService} from '../core/unidadeMedida/unidadeMedida.service';
import {Response} from "@angular/http";


@Component({
  selector: 'unidadeMedida-persist',
  templateUrl: './unidadeMedida-persist.component.html'
})
export class UnidadeMedidaPersistComponent implements OnInit {

  unidadeMedida = new UnidadeMedida();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private unidadeMedidaService: UnidadeMedidaService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.unidadeMedidaService.get(+params['id']).subscribe((unidadeMedida: UnidadeMedida) => {
          this.create = false;
          this.unidadeMedida = unidadeMedida;
        });
      }
      
    });
  }

  save() {
    this.unidadeMedidaService.save(this.unidadeMedida).subscribe((unidadeMedida: UnidadeMedida) => {
      this.router.navigate(['/unidadeMedida', 'show', unidadeMedida.id]);
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
