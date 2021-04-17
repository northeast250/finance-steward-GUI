import * as React from "react";
import { CompMenuBtn, MenuTypes } from "./CompMenuBtn";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// import { ipcRenderer } from "electron";

const onLoadResource = () => {
  console.log("open resource");
  // ipcRenderer.emit("InitImgs");
};

export interface CompHeaderProps {
  curType: MenuTypes;
  menu: any;
  loadResource: any;
}

export function CompHeader(props: CompHeaderProps) {
  return (
    <div
      id={"menus"}
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        zIndex: 999,
        paddingTop: "10px",
        background: "white",
        width: "100%",
      }}
    >
      <button
        onClick={props.loadResource}
        style={{ margin: "10px", fontSize: "x-large" }}
      >
        Resources
      </button>

      <CompMenuBtn
        title={"Serialize"}
        type={MenuTypes.Serialize}
        curType={props.curType}
        setMenu={props.menu}
      />
      <CompMenuBtn
        title={"OCR"}
        type={MenuTypes.OCR}
        curType={props.curType}
        setMenu={props.menu}
      />
    </div>
  );
}

export default connect(null, (dispatch: Dispatch) => ({
  loadResource: () => dispatch({ type: "InitImgs" }),
}))(CompHeader);
