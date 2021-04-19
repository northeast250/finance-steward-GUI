import React from "react";

export interface ICompWatermark {
  content: string | React.Component;
  rotation?: number;
}

export const CompWatermark = (props: ICompWatermark) => {
  return (
    <div
      id={"watermark"}
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        height: "100%",
        color: "lightgray",
        zIndex: 1,
        fontSize: 100,
        transform: "rotate(-" + (props.rotation || 45) + "deg)",
      }}
    >
      {props.content}
    </div>
  );
};

export default CompWatermark;
