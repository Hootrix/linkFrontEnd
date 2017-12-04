<template>
    <div class="input-group-addon" id="status">
        载入<span class="label label-success">{{loadCount}}</span>条链接。总数：<span class="label label-default">{{ total }}</span>&nbsp;&nbsp;<a
            v-on:click="reload" class="btn  btn-default btn-xs" href="javascript:void(0)"> <i class="icon-repeat"></i> 清空</a>
    </div>
</template>

<script>
export default {
  name: 'status_bar',
  props: {
    total: {
      default: 0
    },
    loadCount: {
      default: 0
    }
  },
  methods: {
    reload: function () {
      this.$emit('clearList')
    }
  }

}
</script>

<style scoped>
    .input-group-addon{
        white-space: normal; overflow: hidden; border: none; border-radius: 0px; padding-bottom: 2px;
    }
</style>
