import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../guards/auth.guard";
import { SolicitacaoComponent } from "./solicitacao.component";
import { SolicitacaoCreateComponent } from "./solicitacao-create.component";
import { SolicitacaoApprovalComponent } from "./solicitacao-approval.component";

const routes: Routes = [
    {
        path: 'solicitacao', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'approval', pathMatch: 'full'},
            {path: 'index', component: SolicitacaoComponent, data: {permissao: 'ROLE_SOLICITACAO_INDEX'}},
            {path: 'create', component: SolicitacaoCreateComponent, data: {permissao: 'ROLE_SOLICITACAO_SAVE'}},
            {path: 'approval', component: SolicitacaoApprovalComponent, data: {permissao: 'ROLE_SOLICITACAO_SAVE'}}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitacaoRoutingModule {
}