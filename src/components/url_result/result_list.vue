<template>
  <div>
    <div
      v-for="(item,index) in localResult"
      class="input-group"
    >
      <input
        class="form-control"
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
          v-bind:id="['n-text-'+index]"
        >No.{{index | position(localResult.length)}}</button>
      </span>
      <span
        v-else
        v-bind:class="['copy btn','input-group-addon']"
        v-on:click="copy(index)"
        v-bind:id="['n-text-'+index]"
      >No.{{index | position(localResult.length)}}</span>

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
      localLoadNum: 0
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
    }
  },
  methods: {
    // 拷贝链接
    copy: function (index) {
      document.querySelector('#index-' + index).select()
      if (document.execCommand('copy')) {
        const selector = document.querySelector('#n-text-' + index)
        selector.innerText = selector.innerText.toUpperCase()
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
