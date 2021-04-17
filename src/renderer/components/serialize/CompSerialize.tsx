import React, { useState } from "react";
import { CompOcrWithMark } from "../support/CompOcrWithMark";
import CompImgInfo from "../CompImgInfo";
import { ENABLE_SHOW_OCR_ITEMS, ENABLE_SHOW_SERIALIZE } from "../../settings";
import { IOcrItems } from "../../ds/trade/ocr";
import { CompLsTokens, CompXqTokens } from "./CompShowTokens";
import decideLsOrXq from "../../functions/algoSerialize/algoDecideLsOrXq";
import { TradeSign } from "../../ds/trade/item";
import { algoSerializeLs } from "../../functions/algoSerialize/algoSerializeLs";
import algoSerializeXq from "../../functions/algoSerialize/algoSerializeXq";
import { ImgState } from "../../ds/img";

export interface CompSerializeProps {
  img: ImgState;
}

export const CompSerialize = ({ img }: CompSerializeProps) => {
  const [data] = useState<IOcrItems>([]);

  return (
    <div>
      <CompImgInfo img={img} />

      <div style={{ display: "flex", justifyContent: "start" }}>
        <div style={{ width: 300 }}>
          <CompOcrWithMark img={img} data={data} scale={0.5} />
        </div>

        {ENABLE_SHOW_OCR_ITEMS && (
          <div style={{ width: 250 }}>
            <h3>OCR条目</h3>
            {data.map((item, index) => {
              return (
                <div key={index} className={"ocr-result"}>
                  {item.words}
                </div>
              );
            })}
          </div>
        )}

        {ENABLE_SHOW_SERIALIZE && data.length && (
          <div style={{ marginRight: "10px" }}>
            <h3>结构化解析</h3>
            {decideLsOrXq(data) === TradeSign.TradeIsLs ? (
              <CompLsTokens
                data={algoSerializeLs(data.map((item) => item.words))}
              />
            ) : (
              <CompXqTokens data={algoSerializeXq(data)} />
            )}
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default CompSerialize;
