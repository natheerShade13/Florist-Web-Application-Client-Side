import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './customer/login/login.component';
import { RegistrationComponent } from './customer/registration/registration.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ReviewComponent} from "./Review/review.component";

@NgModule({
  declarations: [
    //AppComponent,
    //HomeComponent,
    //LoginComponent,
    //RegistrationComponent,
    //WishlistComponent,
    //CartComponent,
    //ProfileComponent,
    //CatalogComponent,
    //HeaderComponent,
    //FooterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReviewComponent,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(), LoginComponent],
  //bootstrap: [AppComponent]
})
export class AppModule { }
