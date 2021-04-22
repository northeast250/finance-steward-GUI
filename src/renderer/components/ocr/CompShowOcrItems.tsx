import React from "react";
import { ImgProps } from "../../base";
import { IMG_WIDTH, SHOW_TITLE } from "../../config";
import { OcrLibDoc } from "../../../db/lib_ocr";

export interface CompShowOcrItemsProps extends ImgProps {}

export const CompShowOcrItems = (props: CompShowOcrItemsProps) => {
  const { img } = props;
  const maxHeight = (img.size.height * IMG_WIDTH) / img.size.width;

  return (
    <div>
      {SHOW_TITLE && <h3>OCR</h3>}
      <div className={"desc"} style={{ maxHeight, overflowY: "scroll" }}>
        {img.ocrs.length > 0 &&
          (img.ocrs[0] as OcrLibDoc).items.map((item, index) => (
            <div key={index}>{item.words}</div>
          ))}
      </div>
    </div>
  );
};
