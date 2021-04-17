import * as React from "react";
import { useState } from "react";
import { ENABLE_SHOW_WATERMARK } from "./settings";
import CompSerializes from "./components/serialize/CompSerializes";
import CompOcrs from "./components/ocr/CompOcrs";
import CompHeader from "./components/header/CompHeader";
import CompWatermark from "./components/support/CompWatermark";
import { MenuTypes } from "./components/header/CompMenuBtn";
import { ImgState } from "./ds/img";

interface AppProps {
  token: string;
  imgs: ImgState[];
}

const props: AppProps = {
  token: "xxxxx",
  imgs: [],
};

export const App = () => {
  const [menuSelected, setMenuSelected] = useState(MenuTypes.Serialize);

  return (
    <div style={{ position: "relative", background: "#D1D8DB" }}>
      {ENABLE_SHOW_WATERMARK && <CompWatermark content={"developed by mark"} />}
      <div id={"main-content"} style={{ position: "absolute" }}>
        <CompHeader curType={menuSelected} menu={setMenuSelected} />

        <div
          id={"main"}
          style={{
            position: "relative",
            marginTop: "80px",
            padding: "10px",
            zIndex: 20,
          }}
        >
          hello ~
          {menuSelected === MenuTypes.OCR && <CompOcrs data={props.imgs} />}
          {menuSelected === MenuTypes.Serialize && (
            <CompSerializes data={props.imgs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

// export default connect(
//   (state: AppState): AppProps => {
//     console.log("connecting, state: ", state);
//     return {
//       token: state.token.value,
//       imgs: state.imgs.data,
//     };
//   }
// )(App);
