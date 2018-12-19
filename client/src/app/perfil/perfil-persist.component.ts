import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Perfil} from '../core/perfil/perfil';
import {PerfilService} from '../core/perfil/perfil.service';
import {Response} from "@angular/http";


@Component({
  selector: 'perfil-persist',
  templateUrl: './perfil-persist.component.html'
})
export class PerfilPersistComponent implements OnInit {

  perfil = new Perfil();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private perfilService: PerfilService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.perfilService.get(+params['id']).subscribe((perfil: Perfil) => {
          this.create = false;
          this.perfil = perfil;
        });
      }
      
    });
  }

  save() {
    this.perfilService.save(this.perfil).subscribe((perfil: Perfil) => {
      this.router.navigate(['/perfil', 'show', perfil.id]);
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
