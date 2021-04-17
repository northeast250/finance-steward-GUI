import { ImgsAction } from "./actions";

export interface ImgsState {
  root: string;
}

const initImgsState: ImgsState = {
  root: "/Users/mark/projects/finance-steward/resource/test-root",
};

export function imgsReducers(
  state = initImgsState,
  action: ImgsAction
): ImgsState {
  switch (action.type) {
    case "INIT_IMGS":
      console.log("init imgs");
      return state;
    default:
      return state;
  }
}
