import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../guards/auth.guard";
import { UsuarioListComponent } from "./usuario-list.component";
import { UsuarioPersistComponent } from "./usuario-persist.component";
import { UsuarioShowComponent } from "./usuario-show.component";

const routes: Routes = [
    {
        path: 'usuario', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: UsuarioListComponent},
            {path: 'create', component: UsuarioPersistComponent},
            {path: 'edit/:id', component: UsuarioPersistComponent},
            {path: 'show/:id', component: UsuarioShowComponent}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {
}