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
        // this.cartItems = this.cartService.getCartItems();
        // this.calculateTotal();
    }

    calculateTotal() {
        this.totalAmount = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    }

    completePurchase() {
        console.log('Processing payment...');

        // Save shipping info
        this.cartService.setShippingInfo(this.shippingInfo);

        // Save the order details before clearing the cart
        this.cartService.completeOrder();

        alert('Purchase successful')

        // Redirect to order confirmation page
        this.router.navigate(['/order']);
    }
}
