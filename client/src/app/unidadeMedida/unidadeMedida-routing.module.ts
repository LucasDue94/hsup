import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadeMedidaListComponent } from './unidadeMedida-list.component';
import { UnidadeMedidaPersistComponent } from './unidadeMedida-persist.component';
import { UnidadeMedidaShowComponent } from './unidadeMedida-show.component';
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'unidadeMedida', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: UnidadeMedidaListComponent, data: {permissao: 'ROLE_UNIDADEMEDIDA_INDEX'}},
            {path: 'create', component: UnidadeMedidaPersistComponent, data: {permissao: 'ROLE_UNIDADEMEDIDA_SAVE'}},
            {path: 'edit/:id', component: UnidadeMedidaPersistComponent, data: {permissao: 'ROLE_UNIDADEMEDIDA_UPDATE'}},
            {path: 'show/:id', component: UnidadeMedidaShowComponent, data: {permissao: 'ROLE_UNIDADEMEDIDA_SHOW'}},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnidadeMedidaRoutingModule {
}