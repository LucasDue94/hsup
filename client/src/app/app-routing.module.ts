import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import {ProdutoListComponent} from "./produto/produto-list.component";
import { UnidadeMedidaListComponent } from "./unidadeMedida/unidadeMedida-list.component";

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {path: 'produto', component: ProdutoListComponent},
    {path: 'unidade', component: UnidadeMedidaListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}