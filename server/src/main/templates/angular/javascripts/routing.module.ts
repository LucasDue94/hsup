import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${className}ListComponent } from './${propertyName}-list.component';
import { ${className}PersistComponent } from './${propertyName}-persist.component';
import { ${className}ShowComponent } from './${propertyName}-show.component';
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: '${propertyName}', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: ${className}ListComponent, data: {permissao: 'ROLE_${className.toUpperCase()}_INDEX'}},
            {path: 'create', component: ${className}PersistComponent},
            {path: 'edit/:id', component: ${className}PersistComponent},
            {path: 'show/:id', component: ${className}ShowComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ${className}
RoutingModule {
}