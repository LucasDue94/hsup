import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissoesListComponent } from './permissoes-list.component';
import { PermissoesPersistComponent } from './permissoes-persist.component';
import { PermissoesShowComponent } from './permissoes-show.component';
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'permissoes', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: PermissoesListComponent},
            {path: 'create', component: PermissoesPersistComponent},
            {path: 'edit/:id', component: PermissoesPersistComponent},
            {path: 'show/:id', component: PermissoesShowComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PermissoesRoutingModule {
}