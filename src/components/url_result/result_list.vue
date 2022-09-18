<template>
  <div>
    <div
      v-for="(item,index) in localResult"
      class="input-group"
      @mouseover="hover(index)"
      @mouseleave="hover_position = null" 
    >
      <input
        class=" form-control"
        type="text"
        onmouseover="this.select()"
        v-model="localResult[index]"
        v-bind:id="['index-'+index]"
      >
      <!-- <span
        title="测试外链播放"
        style="overflow: hidden; display: none;"
        onclick="Link.openWindow($(this).prevAll('input').val(),'Music',960,300)"
        class="input-group-btn"
      >
        <button
          type="button"
          class="btn btn-default"
        >试听</button>
      </span> -->

      <span
        v-if="index<localLoadNum"
        class="input-group-btn"
      >
        <button
          class="n-text btn btn-success"
          v-on:click="copy(index)"
          v-bind:id="[`p-text-${$options.filters.position(index,localResult.length)}`]"
          :style="[(hover_position === $options.filters.position(index,localResult.length) || copy_success_position === $options.filters.position(index,localResult.length))?{'min-width': `${hover_span_width}px`}:{'min-width': 'auto'}]"
        >
        <template v-if="copy_success_position === $options.filters.position(index,localResult.length)">✔️</template>
        <i v-else-if="hover_position === $options.filters.position(index,localResult.length)" class="icon-copy"></i>
        <template v-else>No.{{index | position(localResult.length)}}</template>
        </button>
      </span>
      <span
        v-else
        v-bind:class="['copy btn','input-group-addon']"
        v-on:click="copy(index)"
        v-bind:id="[[`p-text-${$options.filters.position(index,localResult.length)}`]]"
        :style="[(hover_position === $options.filters.position(index,localResult.length) || copy_success_position === $options.filters.position(index,localResult.length))?{'min-width': `${hover_span_width}px`}:{'min-width': 'auto'}]" 
      >
        <template v-if="copy_success_position === $options.filters.position(index,localResult.length)">✔️</template>
        <i v-else-if="hover_position === $options.filters.position(index,localResult.length)" class="icon-copy"></i>
        <template v-else>No.{{index | position(localResult.length)}}</template>
      </span>

    </div>
  </div>
</template>
<script>

export default {
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
      localLoadNum: 0,
      
      hover_position:{
        default:null,
      },
      hover_span_width:{
        default:'auto',
      },
      copy_success_position:{
        default:null,
      },
      timer: null  // 定时器名称  
    }
  },
  mounted: function () {

  },
  watch: {
    result: function (n, o) {
      this.localResult = n

    },

    loadNum: function (n, o) {
      this.localLoadNum = n
    },
  },
  methods: {
    // 拷贝链接
    copy: function (index) {
      var $this = this;
      document.querySelector('#index-' + index).select()
      // console.log("document.execCommand('copy')")
      if (document.execCommand('copy')) {
        this.copy_success_position = this.$options.filters.position(index,this.localResult.length);

        if(this.timer){
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          $this.copy_success_position = null;
        }, 3000);
        
        // const selector = document.querySelector('#n-text-' + index)
        // selector.innerText = selector.innerText.toUpperCase()
      }
    },
    hover: function(index){
      // console.log('localLoadNum',this.localLoadNum)
      var position = this.$options.filters.position(index,this.localResult.length);
      var div = document.getElementById(`p-text-${position}`);
      if(div){
        this.hover_span_width = div.offsetWidth
        this.hover_position = position
      }
    }
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
