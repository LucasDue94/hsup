import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ItemListComponent} from './item-list.component';
import {ItemPersistComponent} from './item-persist.component';
import {ItemShowComponent} from './item-show.component';
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'item', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: ItemListComponent},
            {path: 'create', component: ItemPersistComponent},
            {path: 'edit/:id', component: ItemPersistComponent},
            {path: 'show/:id', component: ItemShowComponent}
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}