import { TokenAction } from "./actions";

export interface TokenState {
  path: string;
  value: string;
  expire: Date;
}

const initialTokenState: TokenState = {
  value: "",
  path: "",
  expire: new Date(),
};

export function tokenReducer(
  state: TokenState = initialTokenState,
  action: TokenAction
): TokenState {
  switch (action.type) {
    case "DUMP_TOKEN":
      // todo: fs dump token
      // fs.writeFile(
      //   state.path,
      //   { value: state.value, expire: state.expire },
      //   (err: any) => {
      //     if (err) {
      //       console.error("dump token error");
      //     } else {
      //       console.log("dump token successfully");
      //     }
      //   }
      // );
      return state;
    case "FETCH_TOKEN":
      console.log("fetching token");
      return {
        path: "xxxxxxxxxx",
        expire: new Date(),
        value: "xxxxx",
      };
    default:
      return state;
  }
}
