import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ItemListComponent} from './item-list.component';
import {ItemPersistComponent} from './item-persist.component';
import {ItemShowComponent} from './item-show.component';

const routes: Routes = [
  {path: 'item', redirectTo: 'item/list', pathMatch: 'full'},
  {path: 'item/list', component: ItemListComponent},
  {path: 'item/create', component: ItemPersistComponent},
  {path: 'item/edit/:id', component: ItemPersistComponent},
  {path: 'item/show/:id', component: ItemShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}