import React from "react";
import { IMG_SHOW_WIDTH } from "../../settings/control";
import { OcrItems } from "../../../general/interface/ocr/ocrItem";
import { ImgProps } from "./CompImgInfo";
import { getScale, getUrl } from "../../../general/utils/img_helper";

export interface CompOcrWithMarkProps extends ImgProps {
  ocrItems: OcrItems;
}

export const CompOcrWithMark = (props: CompOcrWithMarkProps) => {
  const imgUrl = getUrl(props.img);
  const scale = getScale(props.img, IMG_SHOW_WIDTH);

  return (
    <div
      style={{
        transform: "scale(" + scale + ")",
        transformOrigin: "top left",
        height: props.img.size.height * scale,
      }}
    >
      <a href={imgUrl} target={"_blank"}>
        <img
          src={imgUrl}
          alt={props.img.path.name}
          width={props.img.size.width}
          height={props.img.size.height}
        />
      </a>

      {props.ocrItems.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: item.location[0][0],
              top: item.location[0][1],
              width: item.location[1][0] - item.location[0][0],
              height: item.location[2][1] - item.location[0][1],
              border: "1px solid red",
              background: "transparent",
            }}
          />
        );
      })}
    </div>
  );
};
