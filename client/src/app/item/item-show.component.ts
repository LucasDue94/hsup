import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../core/item/item';
import { ItemService } from '../core/item/item.service';

@Component({
  selector: 'item-persist',
  templateUrl: './item-show.component.html'
})
export class ItemShowComponent implements OnInit {

  item = new Item();
  message: string;

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.itemService.get(+params['id']).subscribe((item: Item) => {
        this.item = item;
      });
    });
  }

  destroy() {
    if (confirm(`Deseja excluir o registro: {this.item.id}`)) {
      this.itemService.destroy(this.item).subscribe((success: boolean) => {
        if (success) {
          this.message = `Item {this.item.id} excluído com sucesso!`;
          this.router.navigate(['/item','list']);
        } else {
          alert("Erro ao excluir");
        }
      });
    }
  }
}
