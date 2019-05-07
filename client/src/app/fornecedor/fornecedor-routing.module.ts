import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../guards/auth.guard";
import { FornecedorListComponent } from "./fornecedor-list.component";
import { FornecedorPersistComponent } from "./fornecedor-persist.component";
import { FornecedorShowComponent } from "./fornecedor-show.component";

const routes: Routes = [
    {
        path: 'fornecedor', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: FornecedorListComponent, data: {permissao: 'ROLE_FORNECEDOR_INDEX'}},
            {path: 'create', component: FornecedorPersistComponent, data: {permissao: 'ROLE_FORNECEDOR_SAVE'}},
            {path: 'edit/:id', component: FornecedorPersistComponent, data: {permissao: 'ROLE_FORNECEDOR_UPDATE'}},
            {path: 'show/:id', component: FornecedorShowComponent, data: {permissao: 'ROLE_FORNECEDOR_SHOW'}}
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule {}