import * as React from "react";
import CompTokensTableRaw from "./tbl_ls_tokens/CompTokensTableRaw";
import { ITokenDataLs, ITokenDataXq } from "../../ds/trade/token";

export interface CompLsTokensProps {
  data: ITokenDataLs;
}

export const CompLsTokens = ({ data }: CompLsTokensProps) => {
  return (
    <div>
      <p>
        交易场景推断 ：<span style={{ color: "magenta" }}>{data.scenario}</span>
        ，确信度：{data.confidence * 100}%
      </p>

      <CompTokensTableRaw data={data} />
      {/*<CompTokensTable tokensData={props.tokensData} />*/}
    </div>
  );
};

export interface CompXqTokenProps {
  data: ITokenDataXq;
}

export const CompXqTokens = ({ data }: CompXqTokenProps) => {
  return (
    <div>
      <p>
        交易场景推断 ：<span style={{ color: "magenta" }}>{data.scenario}</span>
        ，确信度：{data.confidence * 100}%
      </p>
      <div id={"token-name"}>交易对象： {data.token.name}</div>
      <div id={"token-time"}>交易时间： {data.token.date.toLocaleString()}</div>
      <div id={"token-amount"}>交易金额：{data.token.amount}</div>
    </div>
  );
};
