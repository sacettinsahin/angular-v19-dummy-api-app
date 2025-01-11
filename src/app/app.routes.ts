import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';

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
        children:[
            {
                path:'home',
                component: HomeComponent
            },
            {
                path:'products',
                component: ProductsComponent,
            },
            {
                path:'categories',
                component: CategoriesComponent,
            }
        ]
    },
    
];
