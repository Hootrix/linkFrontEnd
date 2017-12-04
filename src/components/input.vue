<template>
    <div class="input-group">
        <input v-model="localUrl" ref="currentInputVal" v-bind:value="[localUrl]" type="text" class="form-control input-lg" style="font-weight:bold;" placeholder="" v-bind:title="[inputTitle]" size="56" value="" onmouseover="this.select()" />
        <span class="input-group-btn">
            <input  v-on:click="submit" type="submit"  value="提  交"  v-bind:class="['btn btn-primary btn-lg',localIsLoading===true?'disabled':'']"/>
        </span>
    </div>
</template>
<script>
export default{
  props: {
    url: {
      default: ''
    },
    inputTitle: {
      default: ''
    },
    isLoading: {
      default: false
    }
  },
  data: function () {
    return {
      localUrl: '',
      localIsLoading: false
    }
  },
  methods: {
    submit: function () {
//      const inputCurrentUrl = this.$refs.currentInputVal.value //通过ref属性来获取对应的dom然后获取value
      this.$emit('submitInputUrl', this.localUrl)
    }
  },
  watch: {//  watch监听数据变化 若父组件将url值变化那就将本地（本组件）数据localUrl更新

//  TMD  watch传递的参数竟然是数组！！！！！！！！！！！！
    url: function (newValue, oldValue) {
      this.localUrl = newValue[0]
    },
    isLoading: function (newValue, oldValue) {
      this.localIsLoading = newValue[0] //  将父组件传递进来的值本地化，如果不这样的话会出现状态不一致，小问题~~~~
    }
  }
}
</script>
<style scoped>
.input-group{margin-top: 10px;}
</style>
