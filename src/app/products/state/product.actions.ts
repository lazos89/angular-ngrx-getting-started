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

export const updateProduct = createAction(
  "[Products] Update Product",
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  "[Products] Update Product Success",
  props<{ product: Product }>()
);

export const updateProductFail = createAction(
  "[Products] Update Product Fail",
  props<{ error: string }>()
);
export const createProduct = createAction(
  "[Products] Create Product",
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  "[Products] Create Product Success",
  props<{ product: Product }>()
);

export const createProductFail = createAction(
  "[Products] Create Product Fail",
  props<{ error: string }>()
);
export const deleteProduct = createAction(
  "[Products] Delete Product",
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  "[Products] Delete Product Success",
  props<{ productId: number }>()
);

export const deleteProductFail = createAction(
  "[Products] Delete Product Fail",
  props<{ error: string }>()
);
