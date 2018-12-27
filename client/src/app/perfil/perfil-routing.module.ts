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
            {path: 'list', component: PerfilListComponent},
            {path: 'create', component: PerfilPersistComponent},
            {path: 'edit/:id', component: PerfilPersistComponent},
            {path: 'show/:id', component: PerfilShowComponent}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerfilRoutingModule {
}