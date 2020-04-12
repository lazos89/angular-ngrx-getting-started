import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product } from "../../product";
import { ProductActions } from "../../state/action-types";
import * as fromProduct from "../../state/product.reducer";
import * as fromProductSelectors from "../../state/product.selector";
@Component({
  templateUrl: "./product-shell.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product | null>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store$: Store<fromProduct.ProductsState>) {}

  ngOnInit(): void {
    this.store$.dispatch(ProductActions.load());
    this.errorMessage$ = this.store$.pipe(
      select(fromProductSelectors.getError)
    );
    this.products$ = this.store$.pipe(select(fromProductSelectors.getProducts));
    this.selectedProduct$ = this.store$.pipe(
      select(fromProductSelectors.selectCurrentProduct)
    );
    this.displayCode$ = this.store$.pipe(
      select(fromProductSelectors.selectShowProductsCode)
    );
  }
  checkChanged(value: boolean): void {
    this.store$.dispatch(
      ProductActions.showProductsCode({ showProductsCode: value })
    );
  }

  newProduct(): void {
    this.store$.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store$.dispatch(ProductActions.setCurrentProduct({ product }));
  }

  deleteProduct(product: Product): void {
    this.store$.dispatch(
      ProductActions.deleteProduct({ productId: product.id })
    );
  }

  clearProduct(): void {
    this.store$.dispatch(ProductActions.clearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store$.dispatch(ProductActions.createProduct({ product }));
  }

  updateProduct(product: Product): void {
    this.store$.dispatch(ProductActions.updateProduct({ product }));
  }
}
