import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricanteListComponent } from './fabricante-list.component';
import { FabricantePersistComponent } from './fabricante-persist.component';
import { FabricanteShowComponent } from "./fabricante-show.component";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'fabricante', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: FabricanteListComponent, data: {permissao: 'ROLE_FABRICANTE_INDEX'}},
            {path: 'create', component: FabricantePersistComponent, data: {permissao: 'ROLE_FABRICANTE_SAVE'}},
            {path: 'edit/:id', component: FabricantePersistComponent, data: {permissao: 'ROLE_FABRICANTE_UPDATE'}},
            {path: 'show/:id', component: FabricanteShowComponent, data: {permissao: 'ROLE_FABRICANTE_SHOW'}}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FabricanteRoutingModule {
}