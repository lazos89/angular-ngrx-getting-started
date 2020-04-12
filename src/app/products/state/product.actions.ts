import { createAction, props } from "@ngrx/store";

export const showProductsCode = createAction(
  "[Products] Toogle show products",
  props<{ showProductsCode: boolean }>()
);
