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
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
