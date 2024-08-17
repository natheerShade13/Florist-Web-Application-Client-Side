import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service'; 
import { Product } from './product.model'; 
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink, 
    NgFor, 
    NgIf, 
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  productForm!: FormGroup;
  products: Product[] = [];
  isEditMode = false;  // To track whether we are in edit mode
  currentProductId: number | null = null;  // To track the ID of the product being edited

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  private loadProducts(): void {
    // Simulate loading products with dummy data
    this.products = [
      {
        id: 1,
        name: 'Rose',
        description: 'A beautiful red rose.',
        price: 10,
        imageUrl: 'https://example.com/rose.jpg',
        stockQuantity: 50,
        category: 'Flowers'
      },
      {
        id: 2,
        name: 'Tulip',
        description: 'A vibrant tulip flower.',
        price: 7,
        imageUrl: 'https://example.com/tulip.jpg',
        stockQuantity: 30,
        category: 'Flowers'
      },
      {
        id: 3,
        name: 'Lily',
        description: 'A fragrant white lily.',
        price: 15,
        imageUrl: 'https://example.com/lily.jpg',
        stockQuantity: 20,
        category: 'Flowers'
      }
    ];
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      if (this.isEditMode && this.currentProductId !== null) {
        // Simulate updating a product
        const index = this.products.findIndex(p => p.id === this.currentProductId);
        if (index > -1) {
          this.products[index] = { ...product, id: this.currentProductId };
        }
        console.log('Product updated:', this.products[index]);
        this.resetForm();
      } else {
        // Simulate adding a product
        const newProduct: Product = { ...product, id: this.products.length + 1 };
        this.products.push(newProduct);
        console.log('Product added:', newProduct);
        this.resetForm();
      }
    }
  }

  onEditProduct(product: Product): void {
    this.isEditMode = true;
    // this.currentProductId = product.id;
    this.productForm.patchValue(product);
  }

  onDeleteProduct(id: number): void {
    // Simulate deleting a product
    this.products = this.products.filter(product => product.id !== id);
    console.log('Product deleted');
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditMode = false;
    this.currentProductId = null;
  }
}
