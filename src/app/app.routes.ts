import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component: LoginComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'home',
        component: MainLayoutComponent,
        canActivate:[authGuard],
        children:[
            {
                path:'',
                component: HomeComponent
            }
        ]
    }
];
