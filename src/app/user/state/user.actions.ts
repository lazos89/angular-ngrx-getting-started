import { createAction, props } from "@ngrx/store";

export const maskUserName = createAction(
  "[User] Toogle mark user Name",
  props<{ maskUserName: boolean }>()
);
