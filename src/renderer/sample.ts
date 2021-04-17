import { ScenarioTypes } from "./ds/trade/token";
import { ImgProps } from "./ds/img";
import { IOcrItem } from "./ds/trade/ocr";

export const SampleImgUrl =
  "https://mark-vue-oss.oss-cn-hangzhou.aliyuncs.com/20210411_002323_672348-xq1b.jpg";

export const TempToken =
  "MIIX8wYJKoZIhvcNAQcCoIIX5DCCF+ACAQExDTALBglghkgBZQMEAgEwghYFBgkqhkiG9w0BBwGgghX2BIIV8nsidG9rZW4iOnsiZXhwaXJlc19hdCI6IjIwMjEtMDQtMTFUMTU6NTU6MTAuMDcwMDAwWiIsIm1ldGhvZHMiOlsicGFzc3dvcmQiXSwiY2F0YWxvZyI6W10sInJvbGVzIjpbeyJuYW1lIjoidGVfYWRtaW4iLCJpZCI6IjAifSx7Im5hbWUiOiJ0ZV9hZ2VuY3kiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2UyLjBfY2ZnIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGNzX21zX3J3cyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19zcG90X2luc3RhbmNlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaXZhc192Y3JfdmNhIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVmX25vZGVncm91cCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19hc2NlbmRfa2FpMSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19rYWUxIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGJzX3JpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX2Vzc2QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pb2RwcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19ncHVfdjEwMCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzZTIuMF9ndm4iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kd3NfcG9jIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX2ZpbGUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3Nfa2MxX3VzZXJfZGVmaW5lZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX21lZXRpbmdfZW5kcG9pbnRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfbWFwX25scCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Npc19zYXNyX2VuIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfc2FkX2JldGEiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zZXJ2aWNlc3RhZ2VfbWdyX2R0bV9lbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX1ZJU19JbnRsIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2dwdV9wMnMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ldnNfdm9sdW1lX3JlY3ljbGVfYmluIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGNzX2RjczItZW50ZXJwcmlzZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzZTIuMCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZjcCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2N2ciIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19jNm5lIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYmtzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYXBwY3ViZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX21lZXRpbmdfaGFyZGFjY291bnRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfbXVsdGlfYmluZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29wX2dhdGVkX2lvdHN0YWdlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWlwX3Bvb2wiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9yb21hZXhjaGFuZ2UiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pZWZfZnVuY3Rpb24iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0zZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Byb2plY3RfZGVsIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfc2hhcmVCYW5kd2lkdGhfcW9zIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NpX29jZWFuIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3JldHlwZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29uZWFjY2VzcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19pcjN4IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWxiX2d1YXJhbnRlZWQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2NuLXNvdXRod2VzdC0yYiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NpZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Nmc3R1cmJvIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfdnBjX25hdCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Zwbl92Z3dfaW50bCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2h2X3ZlbmRvciIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tbm9ydGgtNGUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2NuLW5vcnRoLTRkIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2dwdV9nNnYiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9JRUMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kYXl1X2RsbV9jbHVzdGVyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaW50bF9jb25maWd1cmF0aW9uIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NlX21jcF90aGFpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfbmxwX2xnX3RnIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NwaCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX210ZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19ncHVfZzVyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfd2tzX2twIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NpX2t1bnBlbmciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9yaV9kd3MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2NuLXNvdXRod2VzdC0yZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZwY19mbG93X2xvZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FhZF9iZXRhX2lkYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzYnNfcmVwX2FjY2VsZXJhdGlvbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2llZl9lZGdlbWVzaCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Rzc19tb250aCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2RlY19tb250aF91c2VyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVmX2VkZ2VhdXRvbm9teSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZpcF9iYW5kd2lkdGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9vc2MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3Nfb2xkX3Jlb3VyY2UiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF93ZWxpbmticmlkZ2VfZW5kcG9pbnRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGNzX3JpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVmLWludGwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9wc3RuX2VuZHBvaW50X2J1eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX21hcF9vY3IiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kbHZfb3Blbl9iZXRhIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfb2JzX2R1YWxzdGFjayIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2VkY20iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Jlc3RvcmUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pdnNjcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19jNmEiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF92cG5fdmd3IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfc21uX2NhbGxub3RpZnkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kbXNfcmVsaWFiaWxpdHkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9wY2EiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jY2VfYXNtX2hrIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY3Nic19wcm9ncmVzc2JhciIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19vZmZsaW5lX3BpMiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2V2c19wb29sX2NhIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfTkFJRSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2JjZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19vZmZsaW5lX2Rpc2tfNCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2VwcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzYnNfcmVzdG9yZV9hbGwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9sMmNnIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaW50bF92cGNfbmF0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZmNzX3BheSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2lvdGFuYWx5dGljcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX21heGh1Yl9lbmRwb2ludF9idXkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9sMmNnX2ludGwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0xZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfcnUtbW9zY293LTFiIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0xZiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2llZl9kZXZpY2VfZGlyZWN0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGNzX2RjczJfcHJveHkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfdmdwdV9nNSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2htc2EiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9vcF9nYXRlZF9tZXNzYWdlb3ZlcjVnIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfdGljc19vcGVuX2JldGEiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9tYXBfdmlzaW9uIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX3JpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX3J1LW5vcnRod2VzdC0yYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3VsYl9taWl0X3Rlc3QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pZWZfcGxhdGludW0iLCJpZCI6IjAifV0sInByb2plY3QiOnsiZG9tYWluIjp7Im5hbWUiOiJodzg2MTk4Mzg3IiwiaWQiOiIwOTMwYTU2NmFkODAyNWE3MGYzZGMwMTNiZjU4Mzg4MCJ9LCJuYW1lIjoiY24tbm9ydGgtNCIsImlkIjoiMDkzMGIyNWNhZTAwZjRkNzJmZmZjMDEzZDljZWVmZGEifSwiaXNzdWVkX2F0IjoiMjAyMS0wNC0xMFQxNTo1NToxMC4wNzAwMDBaIiwidXNlciI6eyJkb21haW4iOnsibmFtZSI6Imh3ODYxOTgzODciLCJpZCI6IjA5MzBhNTY2YWQ4MDI1YTcwZjNkYzAxM2JmNTgzODgwIn0sIm5hbWUiOiJodzg2MTk4Mzg3IiwicGFzc3dvcmRfZXhwaXJlc19hdCI6IiIsImlkIjoiMDkzMGE1Njc1ZjgwMjVhMzFmZWNjMDEzZjI2YTQxODAifX19MYIBwTCCAb0CAQEwgZcwgYkxCzAJBgNVBAYTAkNOMRIwEAYDVQQIDAlHdWFuZ0RvbmcxETAPBgNVBAcMCFNoZW5aaGVuMS4wLAYDVQQKDCVIdWF3ZWkgU29mdHdhcmUgVGVjaG5vbG9naWVzIENvLiwgTHRkMQ4wDAYDVQQLDAVDbG91ZDETMBEGA1UEAwwKY2EuaWFtLnBraQIJANyzK10QYWoQMAsGCWCGSAFlAwQCATANBgkqhkiG9w0BAQEFAASCAQB2JDbNegrlXz4NdhQnCnm5XV2dfOiyi5Cxioi5hon9j-JlwGxMyPJBMGmycMfvbjdFQHTjhGaalqXt6SP58RUh39Ozzvr5i-r-IcWZ+hv0cQdxKFacGZ4iKRIZOFdWC1gC5kQ-3D05OSjfSTCxxXee07+KqKBs0683I1GGq7B3Ghd3XceaDsY5TNOKZbEo68dgTu2-1eB+vChXrtv46ihzDx7Z6pbPSKEDOnap+3QVKtZBMBoMGORfqBIv0Cl63vhpBHnqverg7u3U0xNayIxW5wfr3x9Ew95rjpfAYvv8V6SprovJmfhI28m-pc-VVpa83fYWvZaK9ATHebCSy7df";

export const SampleImgs: ImgProps[] = [
  {
    dir:
      "支付宝/银行卡转账/交易名称：转账到银行卡-转账说明-对方名称/当前状态：测试中",
    name: "xq1b.jpg",
    scenario: ScenarioTypes.XqZfb,
  },
  {
    dir:
      "支付宝/银行卡转账/交易名称：转账到银行卡-转账说明-对方名称/当前状态：测试中",
    name: "ls1.jpg",
    scenario: ScenarioTypes.LsZfb,
  },
  {
    dir: "微信/零钱通/转出/当前状态：支付成功",
    name: "ls1.jpg",
    scenario: ScenarioTypes.LsWx,
  },
  {
    dir: "微信/零钱通/转出/当前状态：支付成功",
    name: "xq1.jpg",
    scenario: ScenarioTypes.XqWx,
  },
];

export const SampleImgOcrResult: IOcrItem[] = [
  {
    words: "0.00K/s",
    confidence: 0.645,
    location: [
      [106, 9],
      [172, 9],
      [172, 26],
      [106, 26],
    ],
  },
  {
    words: "< 账单详情",
    confidence: 0.9647,
    location: [
      [20, 54],
      [171, 54],
      [171, 84],
      [20, 84],
    ],
  },
  {
    words: "郭恒阳",
    confidence: 0.978,
    location: [
      [225, 127],
      [298, 127],
      [298, 154],
      [225, 154],
    ],
  },
  {
    words: "0.50",
    confidence: 0.5912,
    location: [
      [217, 180],
      [306, 180],
      [306, 217],
      [217, 217],
    ],
  },
  {
    words: "处理中",
    confidence: 0.9149,
    location: [
      [228, 233],
      [295, 233],
      [295, 256],
      [228, 256],
    ],
  },
  {
    words: "付款方式",
    confidence: 0.9361,
    location: [
      [36, 322],
      [127, 322],
      [127, 347],
      [36, 347],
    ],
  },
  {
    words: "余额 〉",
    confidence: 0.6402,
    location: [
      [412, 323],
      [484, 323],
      [484, 347],
      [412, 347],
    ],
  },
  {
    words: "转账说明",
    confidence: 0.9207,
    location: [
      [36, 377],
      [128, 377],
      [128, 401],
      [36, 401],
    ],
  },
  {
    words: "转账",
    confidence: 0.9741,
    location: [
      [440, 377],
      [487, 377],
      [487, 401],
      [440, 401],
    ],
  },
  {
    words: "处理进度",
    confidence: 0.9822,
    location: [
      [36, 430],
      [128, 430],
      [128, 455],
      [36, 455],
    ],
  },
  {
    words: "付款成功",
    confidence: 0.8073,
    location: [
      [223, 435],
      [313, 435],
      [313, 460],
      [223, 460],
    ],
  },
  {
    words: "07-25 11:03",
    confidence: 0.7628,
    location: [
      [391, 439],
      [488, 439],
      [488, 458],
      [391, 458],
    ],
  },
  {
    words: "银行处理中",
    confidence: 0.9081,
    location: [
      [223, 504],
      [334, 504],
      [334, 528],
      [223, 528],
    ],
  },
  {
    words: "07-25 11:03",
    confidence: 0.9162,
    location: [
      [390, 507],
      [488, 507],
      [488, 527],
      [390, 527],
    ],
  },
  {
    words: "到账成功",
    confidence: 0.5966,
    location: [
      [222, 573],
      [311, 573],
      [311, 595],
      [222, 595],
    ],
  },
  {
    words: "预计07-25 13:03前",
    confidence: 0.645,
    location: [
      [341, 575],
      [488, 575],
      [488, 596],
      [341, 596],
    ],
  },
  {
    words: "温馨提示",
    confidence: 0.8427,
    location: [
      [37, 628],
      [127, 628],
      [127, 652],
      [37, 652],
    ],
  },
  {
    words: "本页不作为转账成功凭据，实际以",
    confidence: 0.9411,
    location: [
      [157, 628],
      [485, 628],
      [485, 652],
      [157, 652],
    ],
  },
  {
    words: "银行入账为准。如最终入账失败,",
    confidence: 0.8963,
    location: [
      [156, 660],
      [476, 660],
      [476, 684],
      [156, 684],
    ],
  },
  {
    words: "资金原路退回",
    confidence: 0.9637,
    location: [
      [353, 692],
      [485, 692],
      [485, 716],
      [353, 716],
    ],
  },
  {
    words: "转账到",
    confidence: 0.9589,
    location: [
      [37, 746],
      [105, 746],
      [105, 770],
      [37, 770],
    ],
  },
  {
    words: "交通银行（6938）郭恒阳",
    confidence: 0.9648,
    location: [
      [238, 746],
      [487, 746],
      [487, 771],
      [238, 771],
    ],
  },
  {
    words: "创建时间",
    confidence: 0.9333,
    location: [
      [37, 800],
      [127, 800],
      [127, 824],
      [37, 824],
    ],
  },
  {
    words: "2020-07-25 11:03",
    confidence: 0.9161,
    location: [
      [314, 801],
      [488, 801],
      [488, 823],
      [314, 823],
    ],
  },
  {
    words: "订单号",
    confidence: 0.8425,
    location: [
      [35, 854],
      [105, 854],
      [105, 877],
      [35, 877],
    ],
  },
  {
    words: "2020072520004001110015006594",
    confidence: 0.9796,
    location: [
      [140, 855],
      [489, 855],
      [489, 876],
      [140, 876],
    ],
  },
];
