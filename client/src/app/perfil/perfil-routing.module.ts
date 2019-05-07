import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../guards/auth.guard";
import { PerfilListComponent } from "./perfil-list.component";
import { PerfilPersistComponent } from "./perfil-persist.component";
import { PerfilShowComponent } from "./perfil-show.component";

const routes: Routes = [
    {
        path: 'perfil', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: PerfilListComponent, data: {permissao: 'ROLE_PERFIL_INDEX'}},
            {path: 'create', component: PerfilPersistComponent, data: {permissao: 'ROLE_PERFIL_SAVE'}},
            {path: 'edit/:id', component: PerfilPersistComponent, data: {permissao: 'ROLE_PERFIL_UPDATE'}},
            {path: 'show/:id', component: PerfilShowComponent, data: {permissao: 'ROLE_PERFIL_SHOW'}}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerfilRoutingModule {
}