import React from "react";
import CompSerialize from "./CompSerialize";
import CompFilter from "../CompFilter";
import { FilterLibrary } from "../../../redux/library/actions";
import { AppState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { ImgListProps } from "../img/CompImgInfo";

export interface CompSerializesProps extends ImgListProps {
  filters: FilterLibrary;
}

export const CompSerializes = (props: CompSerializesProps) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 998,
          background: "white",
          width: "100%",
        }}
      >
        <CompFilter />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 70 }}>
        {props.visibleImgs.map((img, index) => {
          return <CompSerialize key={index} img={img} />;
        })}
      </div>
    </>
  );
};

const mapState = (state: AppState) => ({
  filters: state.imgs.filter,
});

export default connect(mapState)(CompSerializes);
