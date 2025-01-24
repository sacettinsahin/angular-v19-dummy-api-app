import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/private/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProductsComponent } from './pages/private/products/products.component';
import { CategoriesComponent } from './pages/private/categories/categories.component';
import { UsersComponent } from './pages/private/users/users.component';

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
        path:'',
        component: MainLayoutComponent,
        canActivate:[authGuard],
        children: [
            {
                path: 'home',
                loadComponent: () =>
                    import('./pages/private/home/home.component').then((m) => m.HomeComponent)
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./pages/private/products/products.component').then((m) => m.ProductsComponent)
            },
            {
                path: 'categories',
                loadComponent: () =>
                    import('./pages/private/categories/categories.component').then((m) => m.CategoriesComponent)
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./pages/private/users/users.component').then((m) => m.UsersComponent)
            }
        ]
    },
    {
        path:'**',
        component: LoginComponent
    }
    
];
