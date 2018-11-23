import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Fabricante } from '../core/fabricante/fabricante';
import { FabricanteService } from '../core/fabricante/fabricante.service';

@Component({
    selector: 'fabricante-persist',
    templateUrl: './fabricante-persist.component.html'
})
export class FabricantePersistComponent implements OnInit {

    fabricante = new Fabricante();
    create = true;
    errors: any[];
    message: string;


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
            if (this.fabricante.id != null) {
                this.message = `Fabricante ${this.fabricante.fantasia} alterado com sucesso!`;
            } else {
                this.message = `Fabricante ${this.fabricante.fantasia} cadastrado com sucesso!`;
            }

            let r = this.router;
            setTimeout( function () {
                r.navigate(['/fabricante', 'show', fabricante.id]);
            }, 3000);
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
