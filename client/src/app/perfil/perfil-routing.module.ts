import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {PerfilListComponent} from './perfil-list.component';
import {PerfilPersistComponent} from './perfil-persist.component';
import {PerfilShowComponent} from './perfil-show.component';

const routes: Routes = [
  {path: 'perfil', redirectTo: 'perfil/list', pathMatch: 'full'},
  {path: 'perfil/list', component: PerfilListComponent},
  {path: 'perfil/create', component: PerfilPersistComponent},
  {path: 'perfil/edit/:id', component: PerfilPersistComponent},
  {path: 'perfil/show/:id', component: PerfilShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule {}