import axios from "axios";
import * as fs from "fs";
import { TokenPath } from "../settings";

const HuaweiAccount = {
  username: "hw86198387",
  password: "znstjz2020",
  domain_name: "hw86198387",
  project_name: "cn-north-4",
};

const HuaweiTokenParams = {
  auth: {
    identity: {
      methods: ["password"],
      password: {
        user: {
          name: HuaweiAccount.username, //替换为实际用户名
          password: HuaweiAccount.password, //替换为实际的用户密码
          domain: {
            name: HuaweiAccount.domain_name, //替换为实际账号名
          },
        },
      },
    },
    scope: {
      project: {
        name: HuaweiAccount.project_name, //替换为实际的project name，如cn-north-4
      },
    },
  },
};

export const getToken = async () => {
  if (fs.existsSync(TokenPath)) {
    console.log("reading token from local");
    return fs.readFileSync(TokenPath, "utf-8");
  }

  console.log("===== fetching token from net ======");
  const url = "https://iam.myhuaweicloud.com/v3/auth/tokens?nocatalog=true";
  const res = await axios.post(url, HuaweiTokenParams, {
    headers: { "Content-Type": "application/json;charset=utf8" },
  });
  console.log("==== fetched token ==== ");
  const token = res.headers["x-subject-token"];
  fs.writeFile(TokenPath, token, (err) => {
    console.warn("write token error", err);
  });
  return token;
};

// getToken();
