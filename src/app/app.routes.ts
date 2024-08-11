import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component.';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';

export const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  //{ path: 'profile', component: ProfileComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'profile', component: ProfileComponent, children: [
    { path: '', redirectTo: 'update-profile', pathMatch: 'full' },
    { path: 'update-profile', component: UpdateProfileComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    //{ path: 'add-address', component: AddAddressComponent },
  ]},
  // Other routes
];