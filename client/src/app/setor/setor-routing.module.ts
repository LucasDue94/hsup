import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {SetorListComponent} from './setor-list.component';
import {SetorPersistComponent} from './setor-persist.component';
import {SetorShowComponent} from './setor-show.component';

const routes: Routes = [
  {path: 'setor', redirectTo: 'setor/list', pathMatch: 'full'},
  {path: 'setor/list', component: SetorListComponent},
  {path: 'setor/create', component: SetorPersistComponent},
  {path: 'setor/edit/:id', component: SetorPersistComponent},
  {path: 'setor/show/:id', component: SetorShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule {}