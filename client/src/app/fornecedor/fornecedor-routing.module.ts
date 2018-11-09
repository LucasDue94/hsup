import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {FornecedorListComponent} from './fornecedor-list.component';
import {FornecedorPersistComponent} from './fornecedor-persist.component';
import {FornecedorShowComponent} from './fornecedor-show.component';

const routes: Routes = [
  {path: 'fornecedor', redirectTo: 'fornecedor/list', pathMatch: 'full'},
  {path: 'fornecedor/list', component: FornecedorListComponent},
  {path: 'fornecedor/create', component: FornecedorPersistComponent},
  {path: 'fornecedor/edit/:id', component: FornecedorPersistComponent},
  {path: 'fornecedor/show/:id', component: FornecedorShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule {}