import { ImgState } from "../redux/interface";

export enum CommunicationStatus {
  Success = "Success",
}

export type CommunicationData = object;

export interface CommunicationResult {
  status: CommunicationStatus;
  data: CommunicationData;
}

export interface CommunicationResourceResult extends CommunicationResult {
  data: {
    imgs: ImgState[];
  };
}
