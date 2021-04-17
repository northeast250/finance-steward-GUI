export const INIT_IMGS = "INIT_IMGS";
export type INIT_IMGS = typeof INIT_IMGS;

export type ImgsActionType = INIT_IMGS;

export interface ImgsAction {
  type: ImgsActionType;
}

export const initImgs = () => {
  return {
    type: INIT_IMGS,
  };
};
