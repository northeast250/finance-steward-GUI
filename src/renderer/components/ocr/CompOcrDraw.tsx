import * as React from "react";
import { useEffect, useState } from "react";
import CompOcrWithMark from "../support/CompOcrWithMark";
import { getOcrImgPath } from "../../functions/path";
import { ENABLE_SHOW_OCR_ITEMS, ImgHeight } from "../../settings";
import { API_OCR } from "../../config";
import { IOcrItem } from "../../ds/trade/ocr";
import { ImgState } from "../../ds/img";

export interface CompOcrDrawProps {
  title: string;
  apiType: API_OCR;
  img: ImgState;
}

export const CompOcrDraw = ({ title, apiType, img }: CompOcrDrawProps) => {
  const imgPath = getOcrImgPath(img);
  // const scale = ImgHeight / (imageSize(imgPath).height as number);

  const [data] = useState<IOcrItem[]>([]);
  useEffect(() => {
    // getImgOcrResultViaAPI(apiType, imgPath).then((res: IOcrItem[]) => {
    //   setData(res);
    // });
  }, []);

  return (
    <div style={{ width: "500px" }}>
      <h3>{title}</h3>
      <div style={{ display: "flex" }}>
        {/* todo: scale */}
        <CompOcrWithMark img={img} data={data} scale={1} />

        {ENABLE_SHOW_OCR_ITEMS && (
          <div style={{ marginLeft: "20px" }}>
            {data.map(({ words }, index) => {
              return (
                <div key={index} className={"ocr-result"}>
                  {words}
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
