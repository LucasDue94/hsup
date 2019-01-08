import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { SigninComponent } from "./signin/signin.component";
import { AuthGuard } from "./guards/auth.guard";
import { ErrorComponent } from "./error/error.component";

export const routes: Routes = [
    {path: '', component: SigninComponent, outlet: 'login'},
    {path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
    {path: 'erro', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}