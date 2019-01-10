import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './item-list.component';
import { ItemPersistComponent } from './item-persist.component';
import { ItemShowComponent } from './item-show.component';
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'item', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: ItemListComponent, data: {permissao: 'ROLE_ITEM_INDEX'}},
            {path: 'create', component: ItemPersistComponent, data: {permissao: 'ROLE_ITEM_SAVE'}},
            {path: 'edit/:id', component: ItemPersistComponent, data: {permissao: 'ROLE_ITEM_UPDATE'}},
            {path: 'show/:id', component: ItemShowComponent, data: {permissao: 'ROLE_ITEM_SHOW'}}
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}