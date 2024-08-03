import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    WishlistComponent,
    CartComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [provideHttpClient(), LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }