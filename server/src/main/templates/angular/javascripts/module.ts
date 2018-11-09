import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';

<% if (!associatedModule) { %>
    import {${className}RoutingModule} from './${propertyName}-routing.module';
    import {${className}ShowComponent} from './${propertyName}-show.component';
    import {${className}ListComponent} from './${propertyName}-list.component';
    import {${className}PersistComponent} from './${propertyName}-persist.component';
    <% } %>
@NgModule({
    declarations: [<% if (!associatedModule) { %>
    ${className}ListComponent,
        ${className}PersistComponent,
        ${className}ShowComponent
    <% } %>],
imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HcalSharedModule,
    InputBaseModule,
    NgxPaginationModule,
    TooltipModule,
    TableModule,
    CoreModule,
    <% if (!associatedModule) { %>
    ${className}RoutingModule<% } %>
]
})
export class ${className}Module {}