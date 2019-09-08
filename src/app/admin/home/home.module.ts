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
import { LoginComponent } from '../../login/login.component';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { AuthService } from '../../api/auth/auth.service';
import { AuthGuardService } from '../../api/auth-guard/auth-guard.service';
import { NgxMaskModule } from 'ngx-mask'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const components = [
    AdminHomeComponent,
    AdminPlacesComponent,
    AdminOrdersComponent,
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
        AdminRoutingModule,
        NgxMaskModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot()

    ],
    declarations: [...components, FilterPipe],
    exports: components,
    providers: [AuthService, AuthGuardService]
})
export class AdminHomeModule { }
