import * as React from "react";

export enum MenuTypes {
  Open,
  OCR,
  Serialize,
  Classify,
}

export interface CompMenuBtnProps {
  title: string;
  type: MenuTypes;
  curType: MenuTypes;
  setMenu: any;
}

export const CompMenuBtn = ({
  title,
  type,
  curType,
  setMenu,
}: CompMenuBtnProps) => {
  const selected = type === curType;
  return (
    <button
      onClick={() => setMenu(type)}
      style={{
        margin: "10px",
        fontSize: "x-large",
        color: selected ? "magenta" : "black",
        // background: type === curType ? "magenta" : "gray",
      }}
    >
      {title}
    </button>
  );
};

export default CompMenuBtn;
