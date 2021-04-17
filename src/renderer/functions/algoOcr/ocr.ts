import { getOcrWebImgFilePath } from "../path";
import assert from "assert";
import axios from "axios";
import { API_OCR, HuaweiCloud } from "../../config";
import { IOcrItems, IOcrResult } from "../../ds/trade/ocr";
import {ImgState} from "../../ds/img";
