import * as React from "react";
import CompSerialize from "./CompSerialize";
import { ImgState } from "../../ds/img";

export interface CompSerializesProps {
  data: ImgState[];
}

export const CompSerializes = (props: CompSerializesProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {props.data.map((img, index) => {
        return <CompSerialize key={index} img={img} />;
      })}
    </div>
  );
};

export default CompSerializes;
