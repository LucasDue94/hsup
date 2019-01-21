import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../guards/auth.guard";
import { AlmoxarifeIndexComponent } from "./almoxarife-index.component";
import { AlmoxarifeComponent } from "./almoxarife.component";

const routes: Routes = [
    {
        path: 'almoxarife', canActivate: [AuthGuard], children: [
            {path: '', component: AlmoxarifeIndexComponent, data: {permissao: 'ROLE_SOLICITACAO_INDEX'}},
            {path: 'associar', component: AlmoxarifeComponent, data: {permissao: 'ROLE_SOLICITACAO_INDEX'}},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlmoxarifeRoutingModule {
}