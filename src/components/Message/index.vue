<template>
  <div :class="`box ${isShow ? 'is-show' : ''}`">
    <p v-if="isMobile">图片右下方有下载按钮</p>
    <p v-else>长按可保存图片</p>
    <p>点击可查看大图</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    txt: {
      type: String,
      default: ""
    },
    isMobile: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less">
.box {
  position: fixed;
  right: -400px;
  top: 10%;
  padding: 4px 10px;
  border-radius: 5px 0 0 5px;
  color: #fff;
  font-size: 16px;
  transition: right 2s;
  background: #66cac0;
}

.is-show {
  right: 0;
}

@media screen and (max-width: 375px) {
  .box {
    font-size: 14px;
  }
}
</style>
