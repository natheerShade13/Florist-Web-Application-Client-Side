import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart/cart.service";
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgFor } from "@angular/common";

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [HeaderComponent, FormsModule, CommonModule, NgFor],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {

    cartItems: any[] = [];
    totalAmount: number = 0;
    shippingInfo = {
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    };

    constructor(private cartService: CartService, private router: Router) { }

    ngOnInit(): void {
        this.cartItems = this.cartService.getCartItems();
        this.calculateTotal();
    }

    calculateTotal() {
        this.totalAmount = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    }

    completePurchase() {
        // Implement payment processing and order submission logic here

        alert('Purchase completed successfully!');
        this.cartService.clearCart(); // Clear the cart after purchase
        this.router.navigate(['/home']); // Redirect to home or order confirmation page
    }
}
