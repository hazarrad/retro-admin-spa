import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ColisComponent } from './models/colis/colis.component';
import { HomeComponent } from './models/home/home.component';
import { LoginComponent } from './models/login/login.component';
import { UsersComponent } from './models/users/users.component';


const routes: Routes = [

  {
    path: '',
    component: ContainerComponent,
    // canActivate: [AdminGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: HomeComponent },
          { path: 'home', component: HomeComponent },
          { path: 'colis', component: ColisComponent },
          { path: 'users', component: UsersComponent }

          // { path: 'staffadd', component: AddstaffComponent },
        ]
      }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'Page-Not-Found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/Page-Not-Found', pathMatch: 'full' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
