import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricanteListComponent } from './fabricante-list.component';
import { FabricantePersistComponent } from './fabricante-persist.component';
import { FabricanteShowComponent } from "./fabricante-show.component";

const routes: Routes = [
  {path: 'fabricante', redirectTo: 'fabricante/list', pathMatch: 'full'},
  {path: 'fabricante/list', component: FabricanteListComponent},
  {path: 'fabricante/create', component: FabricantePersistComponent},
  {path: 'fabricante/edit/:id', component: FabricantePersistComponent},
  {path: 'fabricante/show/:id', component: FabricanteShowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricanteRoutingModule {}