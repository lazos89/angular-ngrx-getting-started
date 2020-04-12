import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromProduct from "./product.reducer";

const getProductsFeatureState = createFeatureSelector<
  fromProduct.ProductsState
>(fromProduct.productsFeatureKey);

export const selectShowProductsCode = createSelector(
  getProductsFeatureState,
  (state) => state.showProductsCode
);

export const getProducts = createSelector(
  getProductsFeatureState,
  (state) => state.allProducts
);
// export const selectCurrentProductId = createSelector(
//   getProductsFeatureState,
//   (state) => state.currentProduct.id
// );
// export const selectCurrentProduct = createSelector(
//   getProductsFeatureState,
//   // selectCurrentProductId,
//   (state, currentProductId) =>
//     state.allProducts.find((p) => p.id === currentProductId)
// );

export const getError = createSelector(
  getProductsFeatureState,
  (state) => state.error
);

export const selectCurrentProduct = createSelector(
  getProductsFeatureState,
  // selectCurrentProductId,
  (state) => state.currentProduct
);
