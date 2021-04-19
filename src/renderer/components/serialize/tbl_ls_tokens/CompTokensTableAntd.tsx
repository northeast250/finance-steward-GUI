// import { Table, TableColumnProps } from "antd";
// import React from "react";
// import { ScenarioTypes } from "../../../ds/ocr/token";
// import { CompLsTokensProps } from "../CompShowTokens";
//
// export const tokenColumnsBase: TableColumnProps<any>[] = [
//   {
//     title: "交易对象",
//     dataIndex: "name",
//   },
//   {
//     title: "交易时间",
//     dataIndex: "time",
//   },
//   {
//     title: "交易金额",
//     dataIndex: "amount",
//   },
// ];
//
// export const tokenColumnsWx = tokenColumnsBase;
//
// export const tokenColumnsZfb = [
//   ...tokenColumnsBase,
//   {
//     title: "交易类型",
//     dataIndex: "type",
//   },
//   {
//     title: "交易状态",
//     dataIndex: "status",
//   },
// ];
//
// export const CompTokensTable = ({ data }: CompLsTokensProps) => {
//   return (
//     <Table
//       dataSource={data.tokens}
//       columns={
//         data.scenario === ScenarioTypes.LsZfb ? tokenColumnsZfb : tokenColumnsWx
//       }
//       rowKey={"name"}
//       pagination={false}
//     />
//   );
// };
//
// export default CompTokensTable;
