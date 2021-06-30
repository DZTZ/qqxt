<template>
  <div id="app">
    <div class="header">
      <div class="header-content">
        <div class="logo">
          <img :src="logoUrl" alt="logo" />
        </div>
        <div class="title">
          青青虾条
        </div>
      </div>
    </div>
    <div class="content">
      <waterfall :col="3" :data="dataArr" @loadmore="loadmore">
        <template>
          <div class="cell-item" v-for="(item, index) in dataArr" :key="index">
            <img v-if="item.url" :src="item.url" alt="加载错误" />
          </div>
        </template>
      </waterfall>
    </div>
  </div>
</template>
<script>
import { pictureList, labelList } from "@/request/api";
export default {
  data() {
    return {
      dataArr: [],
      logoUrl: require("@/assets/images/xia.svg"),
      label: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.tableLoading = true;
      let label = this.label;
      let data = { where_id: "GE-1", order: ["id DESC"] };
      if (label) {
        data.where_label = "LIKE-" + label;
      }
      pictureList(data).then(res => {
        if (res.data.err_code === 0) {
          this.dataArr = res.data.list;
        } else {
          this.$message.success(res.data.err_msg);
        }
        this.tableLoading = false;
      });
    },
    loadmore() {
      console.log(999999);
    }
  }
};
</script>
<style lang="less">
@import url("~@/assets/styles/global.css");

.header {
  padding: 10px;
  .header-content {
    max-width: 1000px;
    margin: 0 auto;
  }
}

.logo {
  width: 44px;
  display: inline-block;
  vertical-align: bottom;
  img {
    width: 100%;
  }
}
.title {
  vertical-align: bottom;
  display: inline-block;
  font-size: 16px;
  color: #66cac0;
  font-width: 600;
  line-height: 44px;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  .cell-item {
    margin: 0 0.5rem 1rem 0.5rem;
  }
}
@media screen and (max-width: 375px) {
  .content {
    .cell-item {
      margin: 0 0.3rem 0.6rem 0.3rem;
    }
  }
}
</style>
