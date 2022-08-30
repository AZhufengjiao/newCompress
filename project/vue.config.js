const { defineConfig } = require("@vue/cli-service");

const path = require("path");

const PrerenderSPAPlugin = require("@dreysolano/prerender-spa-plugin");
// const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = defineConfig({
  // transpileDependencies: true,

  productionSourceMap: false,
  lintOnSave: false, //关闭Eslint

  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        // 生成文件的路径，也可以与webpakc打包的一致。
        // 下面这句话非常重要！！！
        // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        staticDir: path.join(__dirname, "dist"), // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        routes: ["/about"], // 这个很重要，如果没有配置这段，也不会进行预编译
        renderer: new Renderer({
          inject: {
            foo: "bar",
          },
          headless: false,
          renderAfterTime: 5000, //   必选哈 // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
          renderAfterDocumentEvent: "render-event",
        }),
      }),
      // new PrerenderSPAPlugin({
      //   staticDir: path.join(__dirname, "dist"),
      //   routes: ["/about"],
      //   renderer: new Renderer({
      //     inject: {
      //       foo: "bar",
      //     },
      //     headless: true, //渲染时显示浏览器窗口。对调试很有用。
      //     ignoreHTTPSErrors: true,
      //     maxConcurrentRoutes: 3,
      //     // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
      //     // renderAfterDocumentEvent: "render-event",
      //     renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
      //       //这样写renderAfterTime生效了
      //       renderAfterTime: 5000,
      //     }),
      //   }),
      // }),
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
