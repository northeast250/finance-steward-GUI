import * as React from "react";
import CompOcr from "./CompOcr";
import {ImgState} from "../../ds/img";

export const CompOcrs = ({ data }: { data: ImgState[] }) => {
  return (
    <>
      {data.map((img, index) => (
        <CompOcr key={index} img={img} />
      ))}
    </>
  );
};

export default CompOcrs;
