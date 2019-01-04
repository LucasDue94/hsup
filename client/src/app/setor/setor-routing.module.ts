import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {SetorListComponent} from './setor-list.component';
import {SetorPersistComponent} from './setor-persist.component';
import {SetorShowComponent} from './setor-show.component';
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'setor', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: SetorListComponent},
            {path: 'create', component: SetorPersistComponent},
            {path: 'edit/:id', component: SetorPersistComponent},
            {path: 'show/:id', component: SetorShowComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule {}