import { ENV } from "./config";

export const isDev = (): boolean => {
  return process.env.NODE_ENV === ENV.development;
};
