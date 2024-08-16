import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart/cart.service";
import { CommonModule, NgFor } from "@angular/common";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [CommonModule, NgFor, HeaderComponent],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

    // cartItems: any[] = [];
    // totalAmount: number = 0;
    // shippingInfo: any = {};

    // constructor(private cartService: CartService, private router: Router) { }

    // ngOnInit(): void {
    //     // Retrieve the last order details
    //     const lastOrder = this.cartService.getLastOrder();

    //     if (lastOrder) {
    //         this.cartItems = lastOrder.cartItems;
    //         this.totalAmount = lastOrder.totalAmount;
    //         this.shippingInfo = lastOrder.shippingInfo;
    //     } else {
    //         // Handle case where there is no last order (e.g., user navigated to this page directly)
    //         //alert("No previous orders found.");
    //         //this.router.navigate(['/home']);
    //     }
    // }

    orders: any[] = [];

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.orders = this.cartService.getOrders();
    }

}
