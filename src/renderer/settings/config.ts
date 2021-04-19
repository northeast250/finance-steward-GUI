// huawei cloud config
export const HuaweiCloud = {
  EndPoint: "ocr.cn-north-4.myhuaweicloud.com",
  ProjectId: "0930b25cae00f4d72fffc013d9ceefda",
  getAPI(api: string) {
    return `https://${this.EndPoint}/v2/${this.ProjectId}${api}`;
  },
};

export enum API_OCR {
  API_OCR_GENERAL_TEXT = "/ocr/general-text",
  API_OCR_WEB_IMAGE = "/ocr/web-image",
}
