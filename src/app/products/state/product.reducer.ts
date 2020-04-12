import { createReducer, Action, on } from "@ngrx/store";
import { ProductActions } from "./action-types";

interface State {
  showProductsCode: boolean;
}

const initialState: State = {
  showProductsCode: false,
};

const productReducer = createReducer(
  initialState,
  on(ProductActions.showProductsCode, (state, action) => ({
    ...state,
    showProductsCode: action.showProductsCode,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
