import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './home.component';
import { children } from './children.routes';
import { AuthGuardService as AuthGuard } from '../../api/auth-guard/auth-guard.service';
import { LoginComponent } from '../../login/login.component';

const routes: Routes = [
    {
        path: '', component: AdminHomeComponent,
        canActivate: [AuthGuard],
        children
    },
    { path: '**', redirectTo: '/login' }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }