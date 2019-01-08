import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../guards/auth.guard";
import { AlmoxarifeIndexComponent } from "./almoxarife-index.component";

const routes: Routes = [
    {
        path: 'almoxarife', canActivate: [AuthGuard], children: [
            {path: '', component: AlmoxarifeIndexComponent},
            {path: 'almoxarife', component: AlmoxarifeIndexComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlmoxarifeRoutingModule {
}