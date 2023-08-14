import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/Admin.guard';
import { ConfirmerGuard } from './auth/Confirmer.guard';
import { ContainerComponent } from './components/container/container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ColisComponent } from './models/colis/colis.component';
import { HomeComponent } from './models/home/home.component';
import { LoginComponent } from './models/login/login.component';
import { AddProductComponent } from './models/products/add-product/add-product.component';
import { ListProductComponent } from './models/products/list-product/list-product.component';
import { UsersComponent } from './models/users/users.component';


const routes: Routes = [

  {
    path: '',
    component: ContainerComponent,
    canActivate: [AdminGuard,ConfirmerGuard],
    
    children: [
      {
        path: '',
        children: [
          { path: '', component: HomeComponent },
          { path: 'home', component: HomeComponent },
          { path: 'colis', component: ColisComponent },
          { path: 'users', component: UsersComponent },
          { path: 'listproducts', component: ListProductComponent },
          { path: 'createproduct', component: AddProductComponent }

        ]
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Page-Not-Found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/Page-Not-Found', pathMatch: 'full' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
