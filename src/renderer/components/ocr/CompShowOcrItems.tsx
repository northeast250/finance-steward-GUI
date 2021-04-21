import React from "react";
import { ImgProps } from "../../base";
import { IMG_WIDTH, SHOW_TITLE } from "../../config";

export interface CompShowOcrItemsProps extends ImgProps {}

export const CompShowOcrItems = (props: CompShowOcrItemsProps) => {
  const { img } = props;
  const maxHeight = (img.base.size.height * IMG_WIDTH) / img.base.size.width;

  return (
    <div>
      {SHOW_TITLE && <h3>OCR</h3>}
      <div className={"desc"} style={{ maxHeight, overflowY: "scroll" }}>
        {img.ocr.items.map((item, index) => (
          <div key={item._id || index}>{item.words}</div>
        ))}
      </div>
    </div>
  );
};
