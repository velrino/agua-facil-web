import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './home.component';
import { children } from './children.routes';

const routes: Routes = [
    {
        path: '', component: AdminHomeComponent,
        children
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }