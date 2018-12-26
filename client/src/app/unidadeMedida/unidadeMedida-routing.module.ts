import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {UnidadeMedidaListComponent} from './unidadeMedida-list.component';
import {UnidadeMedidaPersistComponent} from './unidadeMedida-persist.component';
import {UnidadeMedidaShowComponent} from './unidadeMedida-show.component';

const routes: Routes = [
  {path: 'unidadeMedida', redirectTo: 'unidadeMedida/list', pathMatch: 'full'},
  {path: 'unidadeMedida/list', component: UnidadeMedidaListComponent},
  {path: 'unidadeMedida/create', component: UnidadeMedidaPersistComponent},
  {path: 'unidadeMedida/edit/:id', component: UnidadeMedidaPersistComponent},
  {path: 'unidadeMedida/show/:id', component: UnidadeMedidaShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeMedidaRoutingModule {}