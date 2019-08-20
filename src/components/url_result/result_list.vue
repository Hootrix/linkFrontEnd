<template>
    <div>
    <div v-for="(item,index) in localResult"  class="input-group">
        <input class="form-control" type="text" onmouseover="this.select()" v-model="localResult[index]">
        <span title="测试外链播放" style="overflow: hidden; display: none;"
              onclick="Link.openWindow($(this).prevAll('input').val(),'Music',960,300)" class="input-group-btn">
            <button type="button" class="btn btn-default">试听</button>
        </span>
        
      <span v-if="index<localLoadNum" class="input-group-btn">
          <button  class="btn btn-success">No.{{index | position(localResult.length)}}</button>
      </span>
      <span v-else v-bind:class="['copy btn','input-group-addon']">No.{{index | position(localResult.length)}}</span>  
         
    </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard'
export default{
  name: 'result-list',
  props: {
    result: {
      default: []
    },
    loadNum: {
      default: 0
    }
  },
  data: function () {
    return {
      localResult: [],
      localLoadNum: 0
    }
  },
  mounted: function () {
    const clipboard = new Clipboard('.copy', {
      text: function (trigger) {
        return trigger.parentNode.parentNode.firstChild.value
      }
    })//  复制粘贴 js初始化
    clipboard.on('success', function (e) {
//      console.info('Action:', e.action)
//      console.info('Text:', e.text)
//      console.info('Trigger:', e.trigger)
      e.trigger.innerText = e.trigger.innerText.toUpperCase()//  拷贝成功 修改为大写No
    })
    console.log('复制功能：' + clipboard)
  },
  watch: {
    result: function (n, o) {
      this.localResult = n
    },
    loadNum: function (n, o) {
      this.localLoadNum = n
    }
  },
  methods: {
  },
  filters: {
    position: function (index, total) {
      return total - index
    }
  }
}
</script>
<style scoped>
    /* .input-group{margin-top: 10px;} */
</style>
