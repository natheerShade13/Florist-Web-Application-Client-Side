import { Component, OnInit } from "@angular/core";
import { CommonModule, NgFor } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { OrderService } from "./order.service";
import { Orders } from "./order.model";
import { ReviewComponent } from "../review/review.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, NgFor, HeaderComponent, ReviewComponent],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  order: Orders[] = [];

  constructor(private ordersService: OrderService) { }

  ngOnInit(): void {
    this.ordersService.orders$.subscribe(orders => {
      this.order = orders;
    });
  }
}
