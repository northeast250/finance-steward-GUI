import React from "react";
import { ENABLE_SHOW_IMG_INFO } from "../../settings/control";
import { Img } from "../../../general/interface/img";
import { getShortPath } from "../../../general/utils/img_helper";

export interface ImgProps {
  img: Img;
}

export interface ImgListProps {
  imgs: Img[];
  visibleImgs: Img[];
}

export interface CompImgInfoProps extends ImgProps {}

export const CompImgInfo = (props: CompImgInfoProps) => {
  return ENABLE_SHOW_IMG_INFO ? (
    <div style={{ margin: "10px" }}>
      类型：
      <span style={{ color: "magenta" }}>{props.img.scenario}</span>， 路径：{" "}
      <i>{getShortPath(props.img)}</i>
    </div>
  ) : (
    <></>
  );
};

export default CompImgInfo;
