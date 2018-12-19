import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Setor } from '../core/setor/setor';
import { SetorService } from '../core/setor/setor.service';


@Component({
  selector: 'setor-persist',
  templateUrl: './setor-persist.component.html'
})
export class SetorPersistComponent implements OnInit {

  setor = new Setor();
  create = true;
  errors: any[];
  

  constructor(private route: ActivatedRoute, private setorService: SetorService, private router: Router) {}

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.setorService.get(+params['id']).subscribe((setor: Setor) => {
          this.create = false;
          this.setor = setor;
        });
      }
      
    });
  }

  save() {
    this.setorService.save(this.setor).subscribe((setor: Setor) => {
      this.router.navigate(['/setor', 'show', setor.id]);
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
