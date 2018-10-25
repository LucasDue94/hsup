import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Fabricante} from '../core/fabricante/fabricante';
import {FabricanteService} from '../core/fabricante/fabricante.service';
import {Response} from "@angular/http";


@Component({
    selector: 'fabricante-persist',
    templateUrl: './fabricante-persist.component.html'
})
export class FabricantePersistComponent implements OnInit {

    fabricante = new Fabricante();
    create = true;
    errors: any[];


    constructor(private route: ActivatedRoute, private fabricanteService: FabricanteService, private router: Router) {}

    ngOnInit() {

        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.fabricanteService.get(+params['id']).subscribe((fabricante: Fabricante) => {
                    this.create = false;
                    this.fabricante = fabricante;
                });
            }

        });
    }

    save() {
        this.fabricanteService.save(this.fabricante).subscribe((fabricante: Fabricante) => {
            this.router.navigate(['/fabricante']);
        }, (res: Response) => {
            const json = res.json();
            if (json.hasOwnProperty('message')) {
                this.errors = [json];
            } else {
                this.errors = json._embedded.errors;
            }
        });
    }
}
