import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const showProductsCode = createAction(
  "[Products] Toogle show products",
  props<{ showProductsCode: boolean }>()
);
export const setCurrentProduct = createAction(
  "[Products] Set Current Product",
  props<{ product: Product }>()
);
export const initializeCurrentProduct = createAction(
  "[Products] Initialize Current Product"
);
export const clearCurrentProduct = createAction(
  "[Products] Clear Current Product"
);

export const load = createAction("[Products] Load");

export const loadSuccess = createAction(
  "[Products] Load Success",
  props<{ products: Product[] }>()
);

export const loadFail = createAction(
  "[Products] Load Fail",
  props<{ error: string }>()
);
