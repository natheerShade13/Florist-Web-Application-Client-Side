import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart/cart.service";
import { CommonModule, NgFor } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { Order } from "../cart/cart.model";
import { Orders } from "./order.model";
import { OrderService } from "./order.service";

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [CommonModule, NgFor, HeaderComponent],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    order: Orders[] = [];

    constructor(private ordersService: OrderService) { }

    ngOnInit(): void {
        this.ordersService.orders$.subscribe(orders => {
          this.order = orders.sort(
            (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
        })
    }
}
