const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "MRK-draw создание схем баз данных";
      return args;
    });
    config.module.rule("svg-sprite").use("svgo-loader").loader("svgo-loader");
  },
  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: "src/assets/icons",
      /*
       * The regex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        stylus: {
          import: "@/src/assets/style/svg",
        },
        filenameHashing: false,
        extract: true,
        spriteFilename: "@/img/icons.[hash:8].svg", // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/mrk-draw/" : "/",
});
