<template>
  <div class="index" >
      <div class="list">
        <ul>
          <li v-for="item in lists.slice(0,3)">
            <i :title="[item.desc]" :class="['fa',item.icon?item.icon:'fa-star-o']" ></i>{{item.title}}：
              <template v-for="(i,key) in item.link" >
                {{key>0?' | ':''}}<a href="javascript:void(0);" v-on:click="writeInputFunc(i)" >{{i.trim()}}</a>
              </template>
          </li>
          <slide-up-down :active="defaultSlideudStatus" :duration="300">
            <li v-for="item in lists.slice(3)">
              <i :title="[item.desc]" :class="['fa',item.icon?item.icon:'fa-star-o']" ></i>{{item.title}}：
                <template v-for="(i,key) in item.link" >
                  {{key>0?' | ':''}}<a href="javascript:void(0);" v-on:click="writeInputFunc(i)" >{{i.trim()}}</a>
                </template>
            </li>
          </slide-up-down>          
        </ul>
        <a v-on:click="slideudClick" style="text-decoration: inherit;" :title="slideudStatusTitle" href="javascript:void(0)"> <div class="alert"><i style="margin-left:50%;" :class="[!defaultSlideudStatus?'icon-chevron-down':'icon-chevron-up']"></i></div> </a>
      </div>

    <input-url ref="input-url-el" :inputTitle="[versionInfo['APP_INPUT_CONTENT_TITLE']]" :isLoading="[isLoading]"  :url="[inputUrl]" v-on:submitInputUrl="submit" ></input-url>
    <component v-if="showStatusBar" :is="currentStatusBarView"  :total="result.length"  :loadCount="insertCount" v-on:clearList="clear"  keep-alive></component>
    <result-list :loadNum="insertCount"  :result="result"></result-list>
    </div>
</template>

<script>
import input from './input.vue'
import statusData from './status_bar/status_bar_data.vue'
import statusLoading from './status_bar/status_bar_loading.vue'
import resultList from './url_result/result_list.vue'
import SlideUpDown from 'vue-slide-up-down'
export default {
  name: 'INDEX',
  data: function () {
    return {
      oldVersion: 0, // 之前请求的旧版本号
      inputUrl: '', //  默认输入框的值
      lists: JSON.parse(window.localStorage['url_list'] ? window.localStorage['url_list'] : '[]'),
      versionInfo: [],
      showStatusBar: false,
      currentStatusBarView: 'status-show-total',
      isLoading: false,
      result: [], //  结果集
      insertCount: 0, // 新增加的数量
      defaultSlideudStatus: false // 是否显示多余的url 例子
    }
  },
  mounted: function () {
    this.getVersion()
  },
  components: {
    'input-url': input,
    'result-list': resultList,
    'status-show-total': statusData,
    'status-show-loading': statusLoading,
    'slide-up-down': SlideUpDown
  },
  methods: {

    writeInputFunc: function (url) {
      this.inputUrl = url.trim()
    },
//  点击提交按钮的操作
    submit: function (inputCurrentUrl) {
      this.inputUrl = inputCurrentUrl
      this.submitAction(this.inputUrl)
    },
    clear: function () {
      this.result = []
      this.showStatusBar = false
      window.location.reload()
    },

    // 点击展开/关闭操作
    slideudClick: function () {
      this.defaultSlideudStatus = !this.defaultSlideudStatus
    }
  },

//  全局回车按键监听 提交操作
  created: function () {


    if (window.localStorage['version']) {
      this.oldVersion = parseFloat(window.localStorage['version'])
    }
    const $this = this
    document.addEventListener('keyup', function (ev) {
      if (ev.keyCode === 13) {
        $this.inputUrl = $this.$refs['input-url-el']['$el'].querySelector('input').value
        $this.submitAction($this.inputUrl)
      }
    })
  },
  computed: {
    slideudStatusTitle: function () {
      return this.defaultSlideudStatus ? '收折' : '展开'
    }
  },
  watch: {

    result: function (n, o) {
    //  console.log(n)
      this.insertCount = (n.length - o.length)
    },
    isLoading: function (n, o) {
      if (n !== o) {
        //  观察是否loading而切换状态提示的组件
        if (this.currentStatusBarView === 'status-show-total') {
          this.currentStatusBarView = 'status-show-loading'
        } else {
          this.currentStatusBarView = 'status-show-total'
        }
      }
    },
    versionInfo: function (n) {
      // console.log(o)
      if (this.oldVersion === 0 || parseFloat(n.APP_VERSION) !== this.oldVersion) { // 修改为不同版本就更新数据缓存
        // 如果版本号不存在或者不是最新版本则获取url列表
        this.getList()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul,ol,li{list-style-type:none;}
  i{color: #54b5d6;margin-right: 5px}
  ul{padding:0;margin:0;}
  
  /* .wobbly-accordion {
    transition-timing-function: cubic-bezier(0.195, 1.65, 0.435, -0.6);
  } */

</style>
