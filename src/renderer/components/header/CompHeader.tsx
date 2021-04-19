import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { switchRoot } from "../../../redux/library/actions";
import { Button, ButtonGroup } from "@material-ui/core";
import { switchMenu } from "../../../redux/menus/actions";
import { MenuType } from "../../../redux/menus/reducers";
import { FolderOpen } from "@material-ui/icons";

export interface CompHeaderProps {
  switchMenu: any;

  root: string;
  switchRoot: any;
}

export function CompHeader(props: CompHeaderProps) {
  return (
    <div
      id={"menus"}
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        zIndex: 999,
        paddingTop: "10px",
        background: "white",
        width: "100%",
      }}
    >
      <ButtonGroup variant={"text"} color={"primary"} aria-label={"menus"}>
        <Button onClick={() => props.switchMenu(MenuType.Serialize)}>
          分类与序列化
        </Button>
        <Button onClick={() => props.switchMenu(MenuType.OCR)}>OCR识别</Button>
      </ButtonGroup>

      <div
        style={{
          display: "inline-flex",
          // - [Flex 如何让最后一项右边对齐？（CSS）_亮子介-CSDN博客_flex 最后一个右对齐](https://blog.csdn.net/henryhu712/article/details/82427806)
          marginLeft: "auto",
          // 如果不加下一句，则整个组件在留白过多的时候，还是会居左
          justifyContent: "flex-end",
        }}
      >
        <p className={"single-line-left"}>{props.root}</p>

        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={props.switchRoot}
          endIcon={<FolderOpen />}
          style={{ margin: "0 15px" }}
        >
          导入源
        </Button>
      </div>
    </div>
  );
}

const mapState = (state: AppState) => ({
  root: state.imgs.root,
});

const mapDispatch = {
  switchRoot,
  switchMenu,
};

export default connect(mapState, mapDispatch)(CompHeader);
