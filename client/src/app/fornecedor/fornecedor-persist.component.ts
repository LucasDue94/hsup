import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Fornecedor } from '../core/fornecedor/fornecedor';
import { FornecedorService } from '../core/fornecedor/fornecedor.service';

@Component({
    selector: 'fornecedor-persist',
    templateUrl: './fornecedor-persist.component.html'
})
export class FornecedorPersistComponent implements OnInit {

    fornecedor = new Fornecedor();
    create = true;
    errors: any[];
    message;


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
            if (this.fornecedor.id != null) {
                this.message = `Fornecedor ${this.fornecedor.fantasia} alterado com sucesso!`;
            } else {
                this.message = `Fornecedor ${this.fornecedor.fantasia} cadastrado com sucesso!`;
            }

            let r = this.router;
            setTimeout( function () {
                r.navigate(['/fornecedor', 'show', fornecedor.id]);
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
