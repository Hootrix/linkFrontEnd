/**
 * Created by hhtji on 2017/6/11 0011.
 * 创建Vue全局js函数
 */
export default {
  install: function (Vue, options) {
    const SERVERHOST = 'http://link' //  请求服务器的地址

//  全局真实提交url的操作
    Vue.prototype.submitAction = function (urlDate) {
      if (this.isLoading || !urlDate || urlDate === '' || /^\s*$/.test(urlDate)) return
      this.showStatusBar = true//  显示状态条的组件
      this.loading()//  设置为载入状态  修改提交按钮的class
      if (this.isNotNeedRequest(urlDate)) {
        alert('js操作')
        return
      }
      this.getUrl(urlDate)
    }

    //  设置为loading状态，这个页面中操作的属性值 其实是调用处的数据，一般都是index.vue中的
    Vue.prototype.loading = function () {
      this.isLoading = true
    }

    Vue.prototype.loadDone = function () {
      this.isLoading = false
    }

    Vue.prototype.toggleLoading = function () {
      this.isLoading = !this.isLoading
    }

    //  判断是否 不需要网络请求后端
    Vue.prototype.isNotNeedRequest = function (url) {
      //  不执行网络请求的正则匹配
      const regx = [
        /i\.xiami\.com\/[a-zA-Z0-9_-]+\/demo\/\d+/,
        /xiami\.copropsm\/song\//,
        /music\.163\.com/,
        /y\.qq\.com\/portal\/song\/\w+/,
        /weibo.com\/p\/\d+/,
        /vsochina\.com/,
        /ximalaya\.com/,
        /qing\.wps\.cn/,
        /mp3\.sogou\.com/,
        /app-echo\.com/,
        /music\.douban\.com/,
        /\/programme\/\d+\?sid=\d+/,
        /y\.qq\.com\/#type=song&mid=\w+|music\.qq\.com\/fcgi-bin\/fcg_yqq_song_detail_info\.fcg/,
        /music\.haosou\.com/,
        /music\.weibo\.com\/(snake|t)\/(i\/\d+\.html|(snk_song|boke_program)\.php\?(songid|pid)=\d+)/,
        /y\.baidu\.com/,
        /onedrive\.live\.com/,
        /kugoo:\/\/\|Music\|.*\|\d+\|\w+\|\/?/,
        /music\.so\.com/,
        /118100\.cn/,
        /10155\.com/,
        /migu\.cn/,
        /duomi\.com/,
        /music\.baidu\.com/,
        /dongting\.com/,
        /duole\.com/,
        /kugou\.com/,
        /yinyuetai\.com/,
        /songtaste\.com/,
        /1ting\.com/,
        /kuwo\.cn/,
        /music\.sina\.com\.cn/
      ]
      for (let i in regx) {
        if (regx[i].test(url)) return true
      }
      return false
    }

//  getList接口获取url范例数据
    Vue.prototype.getList = function () {
      this.$http.jsonp(SERVERHOST + '/vue/getList').then(function (response) {
        this.lists = response.data
        this.lists.forEach(function (i) {
          i['link'] = i['link'].split('\n')//  以换行符分割范例中的url用以展示
        })
      }, function (response) { console.log(response) })
    }

//  getVersion接口获取Web App版本信息数据
    Vue.prototype.getVersion = function () {
      this.$http.jsonp(SERVERHOST + '/vue/getVersion').then(function (response) {
        this.versionInfo = response.data
        this.$emit('appTitleUpdate', this.versionInfo)
      })
    }

    //  获取链接
    Vue.prototype.getUrl = function (url) {
      this.$http.jsonp(SERVERHOST + '/url', {params: {url: url}}).then(function (response) {
        if (response.data) {
          if (response.data.code === 200) {
            response.data.data.forEach(function (item, index) {
              response.data.data[index] = document.location.origin + item// 返回的url前面添加host地址
            })
            var list = response.data.data.concat(this.result)
            this.result = list
              // this.$emit('resultUpdate', this.result)//  这里使用watch 观察数据变化然后更新组件
          } else if (response.data.code === 500) {
            if (typeof (response.data.data) === 'string') {
              alert(response.data.data)//  弹窗提示服务器返回的data数据
            }
          }
        }
        this.loadDone()//  完成loading状态
      }, function (error) { //  服务器报错
          // error.url
        console.error(error)
        alert('Oops Invalid')
        this.loadDone()//  完成loading状态
      })
    }
  }
}
