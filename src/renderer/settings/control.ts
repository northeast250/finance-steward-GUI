export const OcrBenchmarkFileSuffix = "_ocr_hww_benchmark.json";
export const OcrApiHwwTestFileSuffix = "_ocr_hww_test1.json";
export const OcrApiHwwWebImgSuffix = "_ocr_web-image.json";

// ui controls
export const ENABLE_SHOW_WATERMARK = false;
export const ENABLE_SHOW_IMG_INFO = true;
export const ENABLE_SHOW_OCR_ITEMS = true;
export const ENABLE_SHOW_SERIALIZE = true;

export const IMG_SHOW_WIDTH = 300;

// Algo Procedure Control
export const SKIP_IMGS_MARKED = true;

// Algo Ability Control
export const LS_LEFT_ICON_THRESHOLD = 0.12; // 流水页左边的图标去除的界限，微信是15，支付宝要更低一些
export const PRESET_MARK_TYPES = [
  "已完全识别",
  "未分类成功（跳过）",
  "截图不全（跳过）",
  "有浮窗（跳过）",
  "延后处理",
];
