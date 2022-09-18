/**
 * Created by hhtji on 2017/6/11 0011.
 * 创建Vue全局js函数
 */
export default {
  install: function (Vue, options) {
    // options;
    const SERVERHOST = 'https://link.hhtjim.com' //  请求服务器的地址 document.location.origin
    // const SERVERHOST = 'http://link' //  请求服务器的地址 document.location.origin

    //  全局真实提交url的操作
    Vue.prototype.submitAction = async function (urlData) {
      if (
        this.isLoading ||
        !urlData ||
        /^\s*$/.test(urlData)
      ) {
        return
      }
      this.showStatusBar = true //  显示状态条的组件
      this.loading() //  设置为载入状态  修改提交按钮的class
      var list = []
      if (this.isNeedRequest(urlData)) {
        list = await this.getUrl(urlData)
      } else { // js操作
        list = this.getUrlLocal(urlData)
        if (!list) {
          alert('Oops 链接不支持~')
        }
      }
      if (list) {
        this.result = list.concat(this.result)
      }
      this.loadDone()
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

    //  判断是否 需要网络请求后端
    Vue.prototype.isNeedRequest = function (url) {
      //  执行网络请求的正则匹配
      const regx = [
        /vdisk\.weibo\.com/
      ]
      for (let i in regx) {
        if (regx[i].test(url)) return true
      }
      return false
    }

    //  getList接口获取url范例数据
    Vue.prototype.getList = function () {
      this.$axios.get(SERVERHOST + '/api/getList').then(response => {
        // console.info(response.data)
        this.lists = response.data
        this.lists.forEach(function (i) {
          i['link'] = i['link'].split('\n') //  以换行符分割范例中的url用以展示
        })
        window.localStorage['url_list'] = JSON.stringify(this.lists) // 缓存。用于index.vue中判断版本号新旧来获取缓存
      })
    }

    //  getVersion接口获取Web App版本信息数据
    Vue.prototype.getVersion = function () {
      this.$axios.get(SERVERHOST + '/api/getVersion').then(response => {
        this.versionInfo = response.data
        window.localStorage['version'] = this.versionInfo.APP_VERSION // 保存版本号
        this.$emit('appTitleUpdate', this.versionInfo)
      })
    }

    Vue.prototype.getUrl = async function (url) {
      /**
       * 网络请求获取链接
       */
      try {
        let response = await this.$axios
        .get(SERVERHOST + '/url/', {
          params: { url: url }
        })
        response.data.data.forEach(function (item, index) {
          response.data.data[index] = SERVERHOST + item // 返回的url前面添加host地址
        })
        console.log(response.data.data)
        return response.data.data
      } catch (err) {
        // console.log(err)
        alert('Oops err~')
      }
      this.loadDone() //  完成loading状态

      // var list = await this.$axios
      //   .get(SERVERHOST + '/url', {
      //     params: { url: url }
      //   })
      //   .then(response => {
      //     console.log(response)
      //     if (response.data) {
      //       if (response.data.code === 200) {
      //         response.data.data.forEach(function (item, index) {
      //           response.data.data[index] = document.location.origin + item // 返回的url前面添加host地址
      //         })
      //         return response.data.data
      //         // this.$emit('resultUpdate', this.result)//  这里使用watch 观察数据变化然后更新组件
      //       } else if (response.data.code === 500) {
      //         if (typeof response.data.data === 'string') {
      //           alert(response.data.data) //  弹窗提示服务器返回的data数据
      //         }
      //       }
      //     }
      //     this.loadDone() //  完成loading状态
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     alert('Oops~ Request Invalid')
      //     this.loadDone() //  完成loading状态
      //   })
      // return list
    }

    Vue.prototype.getUrlLocal = function (url) {
      /**
       * 本地正则操作获取链接
       */

      let regxs = [
        [/(xiami)\.com\/song\/([a-zA-Z0-9]+)/, '.mp3'],
        [/y\.(qq)\.com\/.*\/mv\/.*\/([a-zA-Z0-9]+)\.html/, '.mp4'],
        [/y\.(qq)\.com\/.*\/([a-zA-Z0-9]+)\.html/, '.mp3'],
        [/(?:(?:music|y|www)\.)?(taihe|baidu)\.com\/song\/(\d+)/, '.mp3'],
        [/music\.(163)\.com.*mv.*(?:\?|&)id=(\d+)/g, '.mp4'],
        [/music\.(163)\.com.*(?:\?|&)id=(\d+)/g, '.mp3'],
        [/(ximalaya)\.com\/qinggan\/\d+\/(\d+)/, '.mp3'],
        [/(vdisk)\.weibo\.com\/s\/(\w+)/, ''],
        [/(imusic)\.cn\/#ring\/order\/(\d+)/, '.mp3'],
        [/v\.(yinyuetai)\.com\/video\/(\d+)/, '.mp4'],
        [/(1ting)\.com\/player\/(\w{2})\/player_(\d+)\.html/, '.mp3'],
        [/(kuwo)\.cn\/(?:play_detail|yinyue)\/(\d+)/, '.mp3'],
        [/(streamja)\.com\/(\w+)/, ''],

        // todo
        // [/music\.(migu)\.cn.*\/song\/([a-zA-Z0-9]+)/, '.mp3']
        // [/weibo.com\/p\/(\d+)/, '.mp3']
        // [/drive\.wps\.cn\/view\/l\/(\w+)/, '']
        // [/(kugo)o:\/\/\|Music\|.*\|\d+\|(\w+)\|\/?/, '']
        // [/kugou\.com\/song\/#hash=(\w{32})/,'.mp3'],
        // /onedrive\.live\.com/,
        // /10155\.com/,
        [/app-(echo)\.com\/sound\/(\d+)/, '.mp3']
      ]
      for (let i in regxs) {
        let regx = regxs[i] instanceof RegExp ? regxs[i] : regxs[i][0]
        let ext = regxs[i] instanceof RegExp ? '' : regxs[i][1]
        if (regx.test(url)) {
          // 替换名称
          let $R1 = RegExp.$1
          $R1 = $R1.replace('taihe', 'baidu')
          if (url.indexOf('y.baidu.com') > -1 || url.indexOf('y.taihe.com') > -1) { // 音乐人
            $R1 += '/yyr'
          }
          $R1 = $R1.replace('1ting', 'yt')
          $R1 = $R1.replace('yinyuetai', 'yyt')
          $R1 = $R1.replace('kuwo', 'kw')
          $R1 = $R1.replace('imusic', 'aimusic')
          // console.log(RegExp.length)
          let urlPath = `${$R1}`

          // 查找所有正则非空的捕获组 进行向后拼接
          let n = 2
          for (;;) {
            let val = RegExp['$' + n]
            if (val === '') break
            urlPath = urlPath + `/${val}`
            n++
          }
          // console.log(urlPath)
          const result = [`${SERVERHOST}/${urlPath}${ext}`]
          return result
        }
      }
    }
  }
}
