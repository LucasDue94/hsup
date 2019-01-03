import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Setor } from '../core/setor/setor';
import { SetorService } from '../core/setor/setor.service';

@Component({
  selector: 'setor-persist',
  templateUrl: './setor-show.component.html'
})
export class SetorShowComponent implements OnInit {

  setor = new Setor();
  message: string;

  constructor(private route: ActivatedRoute, private setorService: SetorService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.setorService.get(+params['id']).subscribe((setor: Setor) => {
        this.setor = setor;
      });
    });
  }

  destroy() {
    if (confirm(`Deseja excluir o registro: ${this.setor.id}`)) {
      this.setorService.destroy(this.setor).subscribe((success: boolean) => {
        if (success) {
          this.message = `Setor ${this.setor.id} excluído com sucesso!`;
          this.router.navigate(['/setor','list']);
        } else {
          alert("Erro ao excluir");
        }
      });
    }
  }
}
