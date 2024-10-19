import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service'; 
import { Product } from './product.model'; 
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink, 
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})

export class AdminAddProductComponent implements OnInit {
  productForm!: FormGroup;
  products: Product[] = [];
  isEditMode = false;
  currentProductId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private router: Router 
  ) {}

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
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      if (this.isEditMode && this.currentProductId !== null) {
        // Update product
        this.productService.updateProduct({ ...product, productId: this.currentProductId }).subscribe(
          (updatedProduct: Product) => {
            const index = this.products.findIndex(p => p.productId === this.currentProductId);
            if (index > -1) {
              this.products[index] = updatedProduct;
            }
            this.resetForm();
            window.alert('Product updated successfully!');
          },
          error => {
            console.error('Error updating product:', error);
            window.alert('Failed to update product. Please try again.');
          }
        );
      } else {
        // Add product
        this.productService.createProduct(product).subscribe(
          (newProduct: Product) => {
            this.products.push(newProduct);
            this.resetForm();
            window.alert('Product added successfully!');
          },
          error => {
            console.error('Error adding product:', error);
            window.alert('Failed to add product. Please try again.');
          }
        );
      }
    }
  }

  onEditProduct(product: Product): void {
    this.isEditMode = true;
    this.currentProductId = product.productId;
    this.productForm.patchValue(product);
  }

  onDeleteProduct(productId: number | null): void {
    if (productId !== null) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(product => product.productId !== productId);
          window.alert('Product deleted successfully!');
        },
        error => {
          console.error('Error deleting product:', error);
          window.alert('Failed to delete product. Please try again.');
        }
      );
    }
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditMode = false;
    this.currentProductId = null;
  }

  Logout(): void {
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
