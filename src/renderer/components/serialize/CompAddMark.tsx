import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { MarkType } from "../../../redux/mark/reducers";
import { connect } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { addMark, setMark } from "../../../redux/mark/actions";
import { ImgProps } from "../img/CompImgInfo";
import { getPath } from "../../common/utils/img_helper";

export interface CompAddMarkProps extends ImgProps {
  marks: MarkType[];
  addMark: typeof addMark;
  setMark: typeof setMark;
}

export const CompAddMark = (props: CompAddMarkProps) => {
  const [curMark, setCurMark] = useState<MarkType>("");
  const [addedMark, setAddedMark] = useState<MarkType>("");

  const onConfirmMark = () => {
    if (curMark === "ADD_MARK") {
      if (addedMark === "") {
        alert("新增的mark标记不能为空");
      } else {
        props.addMark(getPath(props.img), addedMark);
      }
    } else {
      props.setMark(getPath(props.img), curMark);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>标注图片</h3>

      <FormControl component={"fieldset"}>
        {/*<FormLabel component={"legend"}>分类</FormLabel>*/}
        <RadioGroup
          name={props.img.path.name}
          value={curMark}
          onChange={(e) => {
            setCurMark(e.target.value);
          }}
        >
          {props.marks.map((mark) => (
            <FormControlLabel
              key={mark}
              control={<Radio />}
              label={mark}
              value={mark}
            />
          ))}
          <FormControlLabel
            control={<Radio />}
            value={"ADD_MARK"}
            label={
              <TextField
                label={"Add Mark"}
                onFocus={() => setCurMark("ADD_MARK")}
                onChange={(e) => setAddedMark(e.target.value)}
              />
            }
          />
        </RadioGroup>
      </FormControl>

      <Button variant={"contained"} color={"secondary"} onClick={onConfirmMark}>
        确认
      </Button>

      <p className={"desc"}>提交标记后，将加入记录文件，后续将不会再出现</p>
    </div>
  );
};

const mapState = (state: AppState) => ({
  marks: state.marks.types,
});

const mapDispatch = {
  addMark,
  setMark,
};

export default connect(mapState, mapDispatch)(CompAddMark);
