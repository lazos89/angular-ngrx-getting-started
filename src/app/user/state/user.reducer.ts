import { createReducer, Action, on } from "@ngrx/store";
import { UserActions } from "./action-types";
import { User } from "../user";

export const productsFeatureKey = "users";

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

const productReducer = createReducer(
  initialState,
  on(UserActions.maskUserName, (state, action) => ({
    ...state,
    maskUserName: action.maskUserName,
  }))
);

export function reducer(state = initialState, action: Action) {
  console.log(state);

  return productReducer(state, action);
}
