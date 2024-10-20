import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './customer/registration/registration.component';
import { LoginComponent } from './customer/login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component.';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { AddAddressComponent } from './profile/add-address/add-address.compnent';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './orders/order.component';
import { AdminAddProductComponent } from './admin/admin-add-product/admin-add-product.component';
import {AdminLoginComponent} from "./admin/login/admin-login";

export const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/admin', component: AdminLoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order', component: OrderComponent},
  { path: 'admin', component: AdminAddProductComponent},
  //{ path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'profile', component: ProfileComponent, children: [
      { path: '', redirectTo: 'update-profile', pathMatch: 'full' },
      { path: 'update-profile', component: UpdateProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'add-address', component: AddAddressComponent },
    ]
  },
  {path: '**', component: LoginComponent}, // Wildcard route for a 404 page
  // Other routes
];
