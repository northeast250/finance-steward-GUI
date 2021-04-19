import React from "react";
import CompOcrDraw from "../img/CompOcrDraw";
import CompImgInfo, { ImgProps } from "../img/CompImgInfo";
import { API_OCR } from "../../settings/config";
import { Card, CardContent } from "@material-ui/core";

export interface CompOcrProps extends ImgProps {}

export const CompOcr = (props: CompOcrProps) => {
  return (
    <Card variant={"outlined"}>
      <CardContent>
        <CompImgInfo img={props.img} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <CompOcrDraw
            title={"API - 通用文字识别"}
            apiType={API_OCR.API_OCR_GENERAL_TEXT}
            img={props.img}
          />

          <CompOcrDraw
            title={"API - 网络图片识别"}
            apiType={API_OCR.API_OCR_WEB_IMAGE}
            img={props.img}
          />

          <div style={{ width: "300px" }}>
            <h3>本地OCR </h3>
            {/*{loadOcrResultFormer(imgPath).map((words, index) => {*/}
            {/*  return (*/}
            {/*    <div key={index} className={"ocr-result"}>*/}
            {/*      {words}*/}
            {/*    </div>*/}
            {/*  );*/}
            {/*})}*/}
          </div>

          <div style={{ width: "300px" }}>
            <h3>benchmark</h3>
            {/*{loadOcrResultBenchmark(imgPath).map((words, index) => (*/}
            {/*  <div key={index} className={"ocr-result"}>*/}
            {/*    {words}*/}
            {/*  </div>*/}
            {/*))}*/}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompOcr;
