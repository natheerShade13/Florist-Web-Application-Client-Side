import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }