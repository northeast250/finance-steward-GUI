import React from "react";
import { CompOcrWithMark } from "./CompOcrWithMark";
import { ENABLE_SHOW_OCR_ITEMS } from "../../../settings/controlRenderer";
import { API_OCR } from "../../../settings/huawei";
import { ImgProps } from "./CompImgInfo";

export interface CompOcrDrawProps extends ImgProps {
  title: string;
  apiType: API_OCR;
}

export const CompOcrDraw = (props: CompOcrDrawProps) => {
  return (
    <div style={{ width: "500px" }}>
      <h3>{props.title}</h3>
      <div style={{ display: "flex" }}>
        {/* todo: scale */}
        <CompOcrWithMark img={props.img} ocrItems={props.img.ocrItems} />
        <CompOcrWithMark img={props.img} ocrItems={props.img.ocrItems} />
        <CompOcrWithMark img={props.img} ocrItems={props.img.ocrItems} />

        {ENABLE_SHOW_OCR_ITEMS && (
          <div style={{ marginLeft: "20px" }}>
            {props.img.ocrItems.map((item, index) => {
              return (
                <div key={index} className={"ocr-result"}>
                  {item.words}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompOcrDraw;
