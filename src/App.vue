<template>
  <div id="app">
    <pre class="btn-info"><h1 v-bind:title="[title]">外链转换工具 | HHTJim.Com Web App {{version}}</h1></pre>
    <router-view v-on:appTitleUpdate="appTitleUpdateFunc"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      title: '',
      version: window.localStorage['version'] ? 'V' + window.localStorage['version'] : 'V######'
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

/* google adsense */
.ads1 { display:block;margin:auto;width: 720px; height: 90px; }
  @media (max-width: 400px) { .ads1 { width: 99%; height: 40px; padding: 1rem 0px } }
  @media (min-width:500px) { .ads1 { width: 468px; height: 60px; } }
  @media (min-width:800px) { .ads1 { width: 728px; height: 90px; } }

/* 祝好 */
html {
  -webkit-filter: grayscale(100%); 
  -moz-filter: grayscale(100%); 
  -ms-filter: grayscale(100%); 
  -o-filter: grayscale(100%); 
  filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);  
  _filter:none; 
  } 
</style>
