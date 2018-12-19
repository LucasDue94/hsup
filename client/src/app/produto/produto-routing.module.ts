import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ProdutoListComponent} from './produto-list.component';
import {ProdutoPersistComponent} from './produto-persist.component';
import {ProdutoShowComponent} from './produto-show.component';

const routes: Routes = [
  {path: 'produto', redirectTo: 'produto/list', pathMatch: 'full'},
  {path: 'produto/list', component: ProdutoListComponent},
  {path: 'produto/create', component: ProdutoPersistComponent},
  {path: 'produto/edit/:id', component: ProdutoPersistComponent},
  {path: 'produto/show/:id', component: ProdutoShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule {}