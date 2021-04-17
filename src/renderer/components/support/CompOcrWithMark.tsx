import * as React from "react";
import { getOcrImgPath } from "../../functions/path";
import { IOcrItems } from "../../ds/trade/ocr";
import { ImgState } from "../../ds/img";

export interface CompOcrWithMarkProps {
  img: ImgState;
  data: IOcrItems;
  scale?: number;
}

export const CompOcrWithMark = ({
  img,
  data,
  scale = 1,
}: CompOcrWithMarkProps) => {
  const imgPath = getOcrImgPath(img);
  // const { width, height } = imageSize(imgPath);
  return (
    <div style={{ position: "relative" }}>
      <a href={"file://" + imgPath} target={"_blank"}>
        <img
          src={"file://" + imgPath}
          alt={img.name}
          // width={(width as number) * scale}
          // height={(height as number) * scale}
        />
      </a>

      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: item.location[0][0] * scale,
              top: item.location[0][1] * scale,
              width: (item.location[1][0] - item.location[0][0]) * scale,
              height: (item.location[2][1] - item.location[0][1]) * scale,
              border: "1px solid red",
              background: "transparent",
            }}
          />
        );
      })}
    </div>
  );
};

export default CompOcrWithMark;
