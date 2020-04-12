import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUser from "./user.reducer";

const getUserFeatureState = createFeatureSelector<fromUser.UserState>(
  fromUser.productsFeatureKey
);

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);
