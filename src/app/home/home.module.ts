import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBaBKMMfPD75rATU89MwJrpC9sjT_phdvI'
        }),
        NgbModule,
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: []
})
export class HomeModule { }
