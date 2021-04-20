import React from "react";
import CompTokensTableRaw from "./tbl_ls_tokens/CompTokensTableRaw";
import {
  SerializeLSResult,
  SerializeXQResult,
} from "../../common/interface/serialize/token";

export interface CompLsTokensProps {
  data: SerializeLSResult;
}

export const CompLSTokens = (props: CompLsTokensProps) => {
  // console.log(props.data);
  return (
    <div>
      <p>
        交易场景推断 ：
        <span style={{ color: "magenta" }}>{props.data.scenario}</span>
        ，确信度：{props.data.baseConfidence * 100}%
      </p>

      <CompTokensTableRaw data={props.data} />
      {/*<CompTokensTable tokensData={props.tokensData} />*/}
    </div>
  );
};

export interface CompXqTokenProps {
  data: SerializeXQResult;
}

export const CompXQTokens = (props: CompXqTokenProps) => {
  return (
    <div>
      <p>
        交易场景推断 ：
        <span style={{ color: "magenta" }}>{props.data.scenario}</span>
        ，确信度：{props.data.baseConfidence * 100}%
      </p>
      <div id={"token-name"}>交易对象： {props.data.token?.name}</div>
      <div id={"token-time"}>
        交易时间： {props.data.token?.date.toLocaleString()}
      </div>
      <div id={"token-amount"}>交易金额：{props.data.token?.amount}</div>
    </div>
  );
};
