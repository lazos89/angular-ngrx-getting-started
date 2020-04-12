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
  currentProduct: Product;
  allProducts: Product[];
  error: string;
}

const initialState: ProductsState = {
  showProductsCode: false,
  currentProduct: null,
  allProducts: [],
  error: "",
};

const productReducer = createReducer(
  initialState,
  on(ProductActions.showProductsCode, (state, action) => ({
    ...state,
    showProductsCode: action.showProductsCode,
  })),
  on(ProductActions.setCurrentProduct, (state, action) => ({
    ...state,
    currentProduct: action.product,
  })),
  on(ProductActions.initializeCurrentProduct, (state) => ({
    ...state,
    currentProduct: {
      id: 0,
      productName: "",
      productCode: "New",
      description: "",
      starRating: 0,
    },
  })),
  on(ProductActions.loadSuccess, (state, action) => ({
    ...state,
    error: "",
    allProducts: action.products,
  })),
  on(ProductActions.loadFail, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export function reducer(state = initialState, action: Action) {
  return productReducer(state, action);
}
