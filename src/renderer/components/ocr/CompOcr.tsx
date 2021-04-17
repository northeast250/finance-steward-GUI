import * as React from "react";
import CompOcrDraw from "./CompOcrDraw";
import CompImgInfo from "../CompImgInfo";
import { API_OCR } from "../../config";
import {ImgState} from "../../ds/img";
// import "./CompOcr.css";

export interface ImgProcessProps {
  width: number;
  height: number;
  ratio: number;
}

export interface CompOcrProps {
  img: ImgState;
}

export const CompOcr = ({ img }: CompOcrProps) => {
  const imgPath = [img.dir, img.name].join("/");
  console.log("read img: ", [img.dir, img.name].join(""));

  return (
    <div>
      <CompImgInfo img={img} />

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
          img={img}
        />

        <CompOcrDraw
          title={"API - 网络图片识别"}
          apiType={API_OCR.API_OCR_WEB_IMAGE}
          img={img}
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

      {/* 分割 */}
      <hr />
    </div>
  );
};

export default CompOcr;
