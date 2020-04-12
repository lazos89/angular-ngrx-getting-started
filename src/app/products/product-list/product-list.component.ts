import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { Store, select } from "@ngrx/store";
import { ProductActions } from "../state/action-types";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => (this.selectedProduct = selectedProduct)
    );
    this.store.pipe(select("products")).subscribe((products) => {
      console.log(products);
      if (products) {
        this.displayCode = products.showProductsCode;
      }
    });
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err: any) => (this.errorMessage = err.error),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    this.store.dispatch(
      ProductActions.showProductsCode({ showProductsCode: value })
    );
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
