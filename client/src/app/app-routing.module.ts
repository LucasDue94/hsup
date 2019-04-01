import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from "./signin/signin.component";
import { AuthGuard } from "./guards/auth.guard";
import { ErrorComponent } from "./error/error.component";
import { SolicitacaoListComponent } from "./solicitacao/solicitacao-list.component";
import { IndexComponent } from "./index/index.component";

export const routes: Routes = [
    {path: '', component: SigninComponent, outlet: 'login'},
    {
        path: 'index', canActivate: [AuthGuard], children: [
            {path: '', component: SolicitacaoListComponent, data: {permissao: 'ROLE_SOLICITACAO_INDEX'}},
        ]
    },
    {path: 'erro', component: ErrorComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}