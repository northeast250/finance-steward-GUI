import React from "react";
import { CompLsTokensProps } from "../CompShowTokens";
import { Scenario } from "../../../common/interface/serialize/scenario";

const CompTokensTableRaw = (props: CompLsTokensProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>交易名称</th>
          <th>交易时间</th>
          <th>交易金额</th>
          {props.data.scenario === Scenario.ZFB_LS && (
            <>
              <th>交易类型</th>
              <th>交易状态</th>
            </>
          )}
        </tr>
      </thead>

      <tbody>
        {props.data.tokens.map((token, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{token.name}</td>
            <td>{token.date?.toLocaleString()}</td>
            <td>{token.amount}</td>
            {props.data.scenario === Scenario.ZFB_LS && (
              <>
                <td>{token.type}</td>
                <td>{token.status}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompTokensTableRaw;
