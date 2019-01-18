import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorListComponent } from './setor-list.component';
import { SetorPersistComponent } from './setor-persist.component';
import { SetorShowComponent } from './setor-show.component';
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'setor', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: SetorListComponent, data: {permissao: 'ROLE_SETOR_INDEX'}},
            {path: 'create', component: SetorPersistComponent, data: {permissao: 'ROLE_SETOR_SAVE'}},
            {path: 'edit/:id', component: SetorPersistComponent, data: {permissao: 'ROLE_SETOR_UPDATE'}},
            {path: 'show/:id', component: SetorShowComponent, data: {permissao: 'ROLE_SETOR_SHOW'}},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule {}