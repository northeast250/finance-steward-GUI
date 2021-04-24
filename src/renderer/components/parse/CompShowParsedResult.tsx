import React from "react";
import { ImgProps } from "../../base";
import { ParsedLibDoc } from "../../../db/lib_parsed";
import { OcrLibDoc } from "../../../db/lib_ocr";
import { DataGrid } from "@material-ui/data-grid";

export interface CompShowParsedResultProps extends ImgProps {}

const parsedColumns = [
  { field: "name", headName: "交易对象" },
  { field: "amount", headName: "交易金额" },
  { field: "time", headName: "交易时间" },
];

export const CompShowParsedResult = (props: CompShowParsedResultProps) => {
  const ocr = (props.img.ocrs[0] as unknown) as OcrLibDoc;
  const parsedResult: ParsedLibDoc = (ocr.parses[0] as unknown) as ParsedLibDoc;
  return (
    <div>
      <h3>结构化</h3>
      <div>
        <DataGrid
          columns={parsedColumns}
          rows={parsedResult.items}
          checkboxSelection
          pageSize={5}
          key={"_id"}
        />
      </div>
    </div>
  );
};
