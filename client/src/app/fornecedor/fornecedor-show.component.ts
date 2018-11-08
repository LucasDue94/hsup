import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Fornecedor} from '../core/fornecedor/fornecedor';
import {FornecedorService} from '../core/fornecedor/fornecedor.service';

@Component({
    selector: 'fornecedor-persist',
    templateUrl: './fornecedor-show.component.html'
})
export class FornecedorShowComponent implements OnInit {

    fornecedor = new Fornecedor();

    constructor(private route: ActivatedRoute, private fornecedorService: FornecedorService, private router: Router) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.fornecedorService.get(+params['id']).subscribe((fornecedor: Fornecedor) => {
                this.fornecedor = fornecedor;
            });
        });
    }

    destroy() {
        if (confirm("Are you sure?")) {
            this.fornecedorService.destroy(this.fornecedor).subscribe((success: boolean) => {
                if (success) {
                    this.router.navigate(['/fornecedor','list']);
                } else {
                    alert("Error occurred during delete");
                }
            });
        }
    }
}
