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
            {path: 'list', component: FornecedorListComponent},
            {path: 'create', component: FornecedorPersistComponent},
            {path: 'edit/:id', component: FornecedorPersistComponent},
            {path: 'show/:id', component: FornecedorShowComponent}
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule {}