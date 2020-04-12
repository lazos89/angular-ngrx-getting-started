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
export const selectCurrentProductId = createSelector(
  getProductsFeatureState,
  (state) => state.currentProductId
);
export const selectCurrentProduct = createSelector(
  getProductsFeatureState,
  selectCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: "",
        productCode: "New",
        description: "",
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.allProducts.find((p) => p.id === currentProductId)
        : null;
    }
  }
);

export const getError = createSelector(
  getProductsFeatureState,
  (state) => state.error
);

// export const selectCurrentProduct = createSelector(
//   getProductsFeatureState,
//   // selectCurrentProductId,
//   (state) => state.currentProduct
// );
