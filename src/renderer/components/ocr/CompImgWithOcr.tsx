import React from "react";
import { ImgProps } from "../../base";
import { IMG_WIDTH, SHOW_TITLE } from "../../config";

export interface CompImgWithOcrProps extends ImgProps {}

export const CompImgWithOcr = (props: CompImgWithOcrProps) => {
  const { img } = props;
  const scale = IMG_WIDTH / img.base.size.width;
  const height = img.base.size.height * scale;

  return (
    <div>
      {SHOW_TITLE && <h3>Origin</h3>}

      <div
        style={{
          position: "relative",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          height: height,
        }}
      >
        <img src={"file://" + img.base.path} alt={img.base.path} />
        {img.ocr.items.map((item, index) => (
          <div
            key={item._id || index}
            style={{
              position: "absolute",
              left: item.location[0][0],
              top: item.location[0][1],
              width: item.location[1][0] - item.location[0][0],
              height: item.location[2][1] - item.location[0][1],
              border: "1px solid red",
            }}
          />
        ))}
      </div>
    </div>
  );
};
