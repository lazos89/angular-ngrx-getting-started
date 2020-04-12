import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromProduct from "./product.reducer";

const getProductsFeatureState = createFeatureSelector<
  fromProduct.ProductsState
>(fromProduct.productsFeatureKey);

export const selectShowProductsCode = createSelector(
  getProductsFeatureState,
  (state) => state.showProductsCode
);
export const selectCurrentProductId = createSelector(
  getProductsFeatureState,
  (state) => state.currentProductId
);
export const selectCurrentProduct = createSelector(
  getProductsFeatureState,
  selectCurrentProductId,
  (state, currentProductId) =>
    state.allProducts.find((p) => p.id === currentProductId)
);
