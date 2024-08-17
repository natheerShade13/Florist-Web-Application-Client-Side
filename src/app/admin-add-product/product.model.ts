// src/app/models/product.model.ts
export class Product {
    id?: number; // Optional, if you want the server to generate it
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    stockQuantity: number;
    category: string;
  
    constructor(
      name: string,
      description: string,
      price: number,
      stockQuantity: number,
      category: string,
      imageUrl?: string,
      id?: number
    ) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.stockQuantity = stockQuantity;
      this.category = category;
      this.imageUrl = imageUrl;
      this.id = id;
    }
  }
  