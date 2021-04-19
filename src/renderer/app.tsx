import React from "react";
import { ENABLE_SHOW_WATERMARK } from "./settings/control";
import CompSerializes from "./components/serialize/CompSerializes";
import CompHeader from "./components/header/CompHeader";
import CompWatermark from "./components/support/CompWatermark";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers";
import { setLibrary } from "../redux/library/actions";
import { MenuType } from "../redux/menus/reducers";
import CompOcrs from "./components/ocr/CompOcrs";
import { ImgListProps } from "./components/img/CompImgInfo";

interface AppProps extends ImgListProps {
  setImgs: any;
  curMenu: MenuType;
}

export const App = (props: AppProps) => {
  return (
    <div style={{ position: "relative", background: "#D1D8DB" }}>
      {ENABLE_SHOW_WATERMARK && <CompWatermark content={"developed by mark"} />}
      <div id={"main-content"} style={{ position: "absolute" }}>
        <CompHeader />

        <div
          id={"main"}
          style={{
            position: "relative",
            marginTop: "40px",
            padding: "10px",
            zIndex: 20,
          }}
        >
          {props.curMenu === MenuType.Serialize && (
            <CompSerializes imgs={props.imgs} visibleImgs={props.visibleImgs} />
          )}

          {props.curMenu === MenuType.OCR && (
            <CompOcrs imgs={props.imgs} visibleImgs={props.visibleImgs} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapState = (state: AppState) => ({
  imgs: state.imgs.imgs,
  visibleImgs: state.imgs.visibleImgs,
  curMenu: state.menus.curMenu,
});

const mapDispatch = {
  setImgs: setLibrary,
};

export default connect(mapState, mapDispatch)(App);
