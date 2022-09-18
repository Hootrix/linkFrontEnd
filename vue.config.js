const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    client: {
      //解决docker容器中热重载失效问题
      // https://stackoverflow.com/questions/71725905/dockerize-vue-js-hot-reload-is-not-working-for-vue-cli4-5-or-later-versions
      webSocketURL: {
          /* You need to config this option, otherwise the below error will occur 
             in your browser console when trying to connect to development server
             from another Docker container:
             WebSocket connection to 'ws://127.0.0.1:<port-number>/ws' failed
          */
          hostname: "127.0.0.1",
          pathname: "/ws",
          port: 8080,
      },
  },
  },
})
