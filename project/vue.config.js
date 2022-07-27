const { defineConfig } = require("@vue/cli-service");

const path = require("path");

const PrerenderSPAPlugin = require("@dreysolano/prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/", "/about"],
      }),
    ],
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
    },
  },
  css: {
    loaderOptions: {
      less: { lessOptions: { javascriptEnabled: true } },
    },
  },
});
