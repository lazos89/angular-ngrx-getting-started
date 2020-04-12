import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product } from "../product";
import { ProductActions } from "../state/action-types";
import * as fromProduct from "../state/product.reducer";
import * as fromProductSelectors from "../state/product.selector";
import { getError, getProducts } from "../state/product.selector";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  displayCode: boolean;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store$: Store<fromProduct.ProductsState>) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store$.pipe(select(getError));
    this.store$
      .pipe(select(fromProductSelectors.selectShowProductsCode))
      .subscribe((showProductsCode) => (this.displayCode = showProductsCode));
    this.store$
      .pipe(select(fromProductSelectors.selectCurrentProduct))
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.store$.dispatch(ProductActions.load());
    this.products$ = this.store$.pipe(select(getProducts));
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  newProduct(): void {
    this.store$.dispatch(ProductActions.initializeCurrentProduct());
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    this.store$.dispatch(
      ProductActions.showProductsCode({ showProductsCode: value })
    );
  }

  productSelected(product: Product): void {
    this.store$.dispatch(
      ProductActions.setCurrentProduct({ product: product })
    );
  }
}
