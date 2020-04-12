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
  currentProductId: number | null;
  allProducts: Product[];
  error: string;
}

const initialState: ProductsState = {
  showProductsCode: false,
  currentProductId: null,
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
    currentProductId: action.product.id,
  })),
  on(ProductActions.initializeCurrentProduct, (state) => ({
    ...state,
    currentProductId: 0,
  })),
  on(ProductActions.loadSuccess, (state, action) => ({
    ...state,
    error: "",
    allProducts: action.products,
  })),
  on(ProductActions.loadFail, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(ProductActions.updateProductSuccess, (state, action) => {
    const updatedProducts = state.allProducts.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      error: "",
      allProducts: updatedProducts,
      currentProductId: action.product.id,
    };
  }),
  on(ProductActions.updateProductFail, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(ProductActions.createProductSuccess, (state, action) => {
    return {
      ...state,
      error: "",
      allProducts: [...state.allProducts, action.product],
      currentProductId: action.product.id,
    };
  }),
  on(ProductActions.createProductFail, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(ProductActions.deleteProductSuccess, (state, action) => {
    return {
      ...state,
      error: "",
      allProducts: state.allProducts.filter(
        (product) => product.id !== action.productId
      ),
      currentProductId: null,
    };
  }),
  on(ProductActions.updateProductFail, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export function reducer(state = initialState, action: Action) {
  return productReducer(state, action);
}
