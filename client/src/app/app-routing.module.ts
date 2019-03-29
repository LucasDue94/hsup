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
            {path: '', component: IndexComponent, data: {permissao: 'ROLE_APPLICATION_INDEX'}},
        ]
    },
    {path: 'erro', component: ErrorComponent, canActivate: [AuthGuard]}
];

if (localStorage.getItem('token').includes('ROLE_SOLICITACAO_LISTALMOXARIFE')) {

}

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}