const { defineConfig } = require("@vue/cli-service");

const path = require("path");

const PrerenderSPAPlugin = require("@dreysolano/prerender-spa-plugin");
// const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: "./",
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/", "/about"],
      }),
    ],
    // node: {
    //   __dirname: false,
    //   fs: true,
    //   process: "mock",
    // },
    externals: {
      fs: require("fs"),
    },
    resolve: {
      alias: {
        assets: "@/assets",
        // 'components:': '@/components',
        // 'views': '@/views'
      },
    },
    devServer: {
      proxy: {
        "/api": {
          target: "http://demo.heycut.com",
          changeOrigin: true,
        },
      },
      // ffmpeg 配置返回的headers
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
  },
  css: {
    loaderOptions: {
      less: { lessOptions: { javascriptEnabled: true } },
    },
  },
});
