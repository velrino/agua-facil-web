import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './home.component';
import { AgmCoreModule } from '@agm/core';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminOrdersComponent } from '../orders/orders.component';
import { AdminPlacesComponent } from '../places/places.component';

const components = [
    AdminHomeComponent,
    AdminPlacesComponent,
    AdminOrdersComponent
] 
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBaBKMMfPD75rATU89MwJrpC9sjT_phdvI'
        }),
        NgbModule,
        AdminRoutingModule
    ],
    declarations: components,
    exports: components,
    providers: []
})
export class AdminHomeModule { }
