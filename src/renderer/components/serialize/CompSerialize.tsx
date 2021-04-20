import React from "react";
import { CompOcrWithMark } from "../img/CompOcrWithMark";
import CompImgInfo, { ImgProps } from "../img/CompImgInfo";
import {
  ENABLE_SHOW_OCR_ITEMS,
  ENABLE_SHOW_SERIALIZE,
} from "../../../settings/controlRenderer";
import { CompLSTokens, CompXQTokens } from "./CompShowTokens";
import CompAddMark from "./CompAddMark";
import { Card, CardContent } from "@material-ui/core";

export interface CompSerializeProps extends ImgProps {}

export const CompSerialize = (props: CompSerializeProps) => {
  console.log(props.img);

  const ocrItems = props.img.ocrItems;

  return (
    <Card variant={"outlined"}>
      <CardContent>
        <CompImgInfo img={props.img} />

        <div style={{ display: "flex", justifyContent: "start" }}>
          {/* 这里的宽度300与系统里的图片宽度设置300不同，因为图片涉及到缩放，实际宽度不确定，这里需要固定，否则与其他容器之间的距离就不好看了*/}
          <div style={{ width: 300 }}>
            <CompOcrWithMark img={props.img} ocrItems={ocrItems} />
          </div>

          {ENABLE_SHOW_OCR_ITEMS && (
            <div style={{ width: 250, marginLeft: 20 }}>
              <h3>OCR条目</h3>
              {ocrItems.map((item, index) => {
                return (
                  <div key={index} className={"ocr-result"}>
                    {item.words}
                  </div>
                );
              })}
            </div>
          )}

          {ENABLE_SHOW_SERIALIZE && ocrItems.length && (
            <div style={{ marginRight: "10px" }}>
              <h3>结构化解析</h3>
              {props.img.isLS ? (
                <CompLSTokens data={props.img.tokenLS} />
              ) : (
                <CompXQTokens data={props.img.tokenXQ} />
              )}
            </div>
          )}

          <CompAddMark img={props.img} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompSerialize;
