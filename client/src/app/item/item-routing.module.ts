import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ItemListComponent} from './item-list.component';
import {ItemPersistComponent} from './item-persist.component';
import {ItemShowComponent} from './item-show.component';

const routes: Routes = [
  {path: 'item', redirectTo: 'itemRequest/list', pathMatch: 'full'},
  {path: 'itemRequest/list', component: ItemListComponent},
  {path: 'itemRequest/create', component: ItemPersistComponent},
  {path: 'itemRequest/edit/:id', component: ItemPersistComponent},
  {path: 'itemRequest/show/:id', component: ItemShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}