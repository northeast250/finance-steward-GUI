import mainConfig from "./webpack.config.main.babel";
import rendererConfig from "./webpack.config.renderer.babel";

export const config = {
  output: [mainConfig, rendererConfig],
};

export default config;
