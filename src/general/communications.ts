export enum SIGNAL {
  INIT_LIB = "INIT_LIB",
  "FILTER_LIB" = "FILTER_LIB",
}

export enum MsgStatus {
  success = "success",
  fail = "fail",
}

export interface Msg {
  status: MsgStatus;
  data?: any;
  message?: string;
}
