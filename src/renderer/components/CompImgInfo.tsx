import * as React from "react";
import { getOcrImgPath, getOcrImgUri } from "../functions/path";
import { ENABLE_SHOW_IMG_INFO } from "../settings";
import { ScenarioTypes } from "../ds/trade/token";
import { ImgState } from "../ds/img";

export interface CompImgInfoProps {
  img: ImgState;
}

export const CompImgInfo = ({ img }: CompImgInfoProps) => {
  const imgUri = getOcrImgUri(img);
  const imgPath = getOcrImgPath(img);
  console.log("imgPath", imgPath);
  return ENABLE_SHOW_IMG_INFO ? (
    <div style={{ margin: "10px" }}>
      类型：
      <span style={{ color: "magenta" }}>
        {img.scenario || ScenarioTypes.Unknown}
      </span>
      ， 路径： <button>{imgUri}</button>
    </div>
  ) : (
    <></>
  );
};

export default CompImgInfo;
