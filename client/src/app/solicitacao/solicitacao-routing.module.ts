import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../guards/auth.guard";
import { SolicitacaoListComponent } from "./solicitacao-list.component";
import { SolicitacaoCreateComponent } from "./solicitacao-create.component";
import { SolicitacaoApprovalComponent } from "./solicitacao-approval.component";
import { SolicitacaoShowComponent } from "./solicitacao-show.component";
import { AlmoxarifeComponent } from "../almoxarife/almoxarife.component";

const routes: Routes = [
    {
        path: 'solicitacao', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'index', pathMatch: 'full'},
            {path: 'index', component: SolicitacaoListComponent, data: {permissao: 'ROLE_SOLICITACAO_INDEX'}},
            {path: 'create', component: SolicitacaoCreateComponent, data: {permissao: 'ROLE_SOLICITACAO_SAVE'}},
            {path: 'approval', component: SolicitacaoApprovalComponent, data: {permissao: 'ROLE_SOLICITACAO_APPROVAL'}},
            {path: 'show/:id', component: SolicitacaoShowComponent, data: {permissao: 'ROLE_SOLICITACAO_SHOW'}},
            {path: 'associar/:id', component: AlmoxarifeComponent, data: {permissao: 'ROLE_SOLICITACAO_LISTALMOXARIFE'}}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitacaoRoutingModule {
}