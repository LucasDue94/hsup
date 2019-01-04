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
            {path: 'list', component: UnidadeMedidaListComponent},
            {path: 'create', component: UnidadeMedidaPersistComponent},
            {path: 'edit/:id', component: UnidadeMedidaPersistComponent},
            {path: 'show/:id', component: UnidadeMedidaShowComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnidadeMedidaRoutingModule {
}