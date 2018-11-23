import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Fabricante } from '../core/fabricante/fabricante';
import { FabricanteService } from '../core/fabricante/fabricante.service';

@Component({
    selector: 'fabricante-persist',
    templateUrl: './fabricante-show.component.html'
})
export class FabricanteShowComponent implements OnInit {

    fabricante = new Fabricante();
    message: string;

    constructor(private route: ActivatedRoute, private fabricanteService: FabricanteService, private router: Router) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.fabricanteService.get(+params['id']).subscribe((fabricante: Fabricante) => {
                this.fabricante = fabricante;
            });
        });
    }

    destroy() {
        if (confirm(`Deseja excluir o fabricante ${this.fabricante.fantasia}?`)) {
            this.fabricanteService.destroy(this.fabricante).subscribe((success: boolean) => {
                if (success) {
                    this.message = `Fabricante ${this.fabricante.fantasia} excluído com sucesso!`;
                    this.router.navigate(['/fabricante','list']);
                } else {
                    alert("Erro ao excluir");
                }
            });
        }
    }
}
