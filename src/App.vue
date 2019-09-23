<template>
  <div id="app">
    <pre class="btn-info"><h1 v-bind:title="[title]">外链转换工具 | HHTJim.Com Web App {{version}}</h1></pre>
    <router-view v-on:appTitleUpdate="appTitleUpdateFunc"></router-view>
  </div>
  <div style="display:none"><script src="//s14.cnzz.com/stat.php?id=2855283&web_id=2855283" language="JavaScript"></script></div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      title: '',
      version: 'V######'
    }
  },
  methods: {
    appTitleUpdateFunc: function (data) {
      this.title = data['APP_TITLE']
      if (data['APP_VERSION']) {
        this.version = 'V' + data['APP_VERSION']
      }
    }
  }
}
</script>

<style>
#app {
  max-width: 900px;
  padding: 19px 29px 29px;
  margin: 0 auto 20px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .05)
}

</style>
