export interface Application {
  title: string;
  update: Date;
  version: string;
}

export const applicationLatest: Application = {
  title: "智能账单系统，Powered by Electron, React, Redux & Typescript",
  update: new Date(2021, 4, 19),
  version: "0.1.1",
};

export const applicationV0_0_1: Application = {
  title: "智能账单系统",
  update: new Date(2021, 4, 11),
  version: "0.1.0",
};
