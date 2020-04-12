import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import { ProductActions } from "./action-types";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.load),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((data) => ProductActions.loadSuccess({ products: data })),
          catchError((error) => of(ProductActions.loadFail({ error })))
        )
      )
    );
  });
  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) => {
        console.log(action.product.id);
        return this.productService.updateProduct(action.product).pipe(
          map((data) => ProductActions.updateProductSuccess({ product: data })),
          catchError((error) => of(ProductActions.updateProductFail({ error })))
        );
      })
    );
  });
  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((data) => ProductActions.createProductSuccess({ product: data })),
          catchError((error) => of(ProductActions.createProductFail({ error })))
        )
      )
    );
  });
  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.productId).pipe(
          map(() =>
            ProductActions.deleteProductSuccess({ productId: action.productId })
          ),
          catchError((error) => of(ProductActions.createProductFail({ error })))
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
