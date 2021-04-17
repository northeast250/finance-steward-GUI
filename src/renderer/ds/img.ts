import {ScenarioTypes} from "./trade/token";

export interface ImgProps {
  dir: string;
  name: string;
  scenario: ScenarioTypes;
}

export enum ImgScenario {
  WXLS = "微信流水",
  WXXQ = "微信详情",
  ZFBLS = "支付宝流水",
  ZFBXQ = "支付宝详情",
  UNKNOWN = "未知",
}

export interface ImgState {
  dir: string;
  name: string;
  width?: number;
  height?: number;
  ratio?: number;
  scenario?: ImgScenario;
}