import React from "react";
import CompOcr from "./CompOcr";
import { ImgListProps } from "../img/CompImgInfo";

export interface CompOcrsProps extends ImgListProps {}

export const CompOcrs = (props: CompOcrsProps) => {
  return (
    <>
      {props.visibleImgs.map((img, index) => (
        <CompOcr key={index} img={img} />
      ))}
    </>
  );
};

export default CompOcrs;
