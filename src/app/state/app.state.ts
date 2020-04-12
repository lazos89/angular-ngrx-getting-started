// import * as fromProduct from '../products/state/product.reducer'
import * as fromUsers from "../user/state/user.reducer";

export interface AppState {
  // products:fromProduct.State,
  users: fromUsers.UserState;
}
