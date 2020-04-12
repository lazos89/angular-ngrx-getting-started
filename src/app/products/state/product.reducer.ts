import { createReducer, Action, on } from "@ngrx/store";
import { ProductActions } from "./action-types";
import { Product } from "../product";
import * as fromRoot from "../../state/app.state";

export const productsFeatureKey = "products";

export interface State extends fromRoot.AppState {
  products: ProductsState;
}
export interface ProductsState {
  showProductsCode: boolean;
  currentProductId: number;
  allProducts: Product[];
}

const initialState: ProductsState = {
  showProductsCode: false,
  currentProductId: null,
  allProducts: [],
};

const productReducer = createReducer(
  initialState,
  on(ProductActions.showProductsCode, (state, action) => ({
    ...state,
    showProductsCode: action.showProductsCode,
  }))
);

export function reducer(state = initialState, action: Action) {
  return productReducer(state, action);
}
