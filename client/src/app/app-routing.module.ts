import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { SigninComponent } from "./signin/signin.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: 'authentication', pathMatch: 'full'},
    {path: 'authentication', component: SigninComponent},
    {path: 'index', canActivate: [AuthGuard], component: IndexComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}