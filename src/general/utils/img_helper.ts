import { Img } from "../interface/img";

export const getPath = (img: Img) => [img.path.dir, img.path.name].join("/");
export const getShortPath = (img: Img, length: number = 40) => {
  const path = getPath(img);
  const realLength = path.length;
  if (realLength <= length) return path;
  else return "..." + path.substr(realLength - length + 3, length);
};
export const getUrl = (img: Img) => "file://" + getPath(img);
export const getScale = (img: Img, width: number) => width / img.size.width;
