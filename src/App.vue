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
        <div class="count">访问次数:{{ count }}</div>
      </div>
      <div class="tab-content">
        <div :class="`${!label ? 'activation' : ''}`" @click="selectLabel('')">
          ALL
        </div>
        <div
          v-for="item in labelList"
          :key="item.id"
          @click="selectLabel(item.label)"
          :class="`${label == item.label ? 'activation' : ''}`"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="content">
      <waterfall :col="3" :data="dataArr">
        <template>
          <div
            :class="`cell-item ${isMobile ? 'cell-item-hover' : ''}`"
            v-for="(item, index) in dataArr"
            :key="index"
          >
            <img v-if="item.url" :src="item.url" alt="加载错误" preview="2" />
            <div class="img-info" v-if="isMobile">
              <div class="date">{{ item.add_time }}</div>
              <div class="operation" title="下载" @click="onDownload(item)">
                <img :src="downloadIcon" alt="" />
                <span>{{ item.downloads }}</span>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
      <LoadingDiv :isShow="loading"></LoadingDiv>
      <Message :isShow="isMessage" :isMobile="isMobile"></Message>
    </div>
  </div>
</template>
<script>
import {
  pictureList,
  labelList,
  updatePicture,
  updateFrequency,
  getFrequency
} from "@/request/api";
import LoadingDiv from "@/components/loading";
import Message from "@/components/Message";
export default {
  components: {
    LoadingDiv,
    Message
  },
  data() {
    return {
      dataArr: [],
      logoUrl: require("@/assets/images/xia.svg"),
      downloadIcon: require("@/assets/images/download.png"),
      labelList: [],
      label: "",
      loading: false,
      current: 0,
      page: 1,
      perpage: 20,
      isEnd: false,
      isMessage: false,
      isMobile: !this.getMobile(),
      count: 0
    };
  },
  created() {
    this.getList();
    this.getLabelList();
    this.increase();
    setTimeout(() => {
      this.isMessage = true;
    }, 10000);
    setTimeout(() => {
      this.isMessage = false;
    }, 17000);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    getList() {
      this.loading = true;
      let { page, perpage } = this;
      let label = this.label;
      let data = { where_id: "GE-1", order: ["id DESC"], page, perpage };
      if (label) {
        data.where_label = "LIKE-" + label;
      }
      pictureList(data).then(res => {
        if (res.data.err_code === 0) {
          let data = res.data;
          this.isEnd = page * perpage >= data.total;

          if (page != 1) {
            this.dataArr = [...this.dataArr, ...data.list];
          } else {
            this.dataArr = data.list;
          }
          this.$previewRefresh();
          console.log(this.dataArr);
        } else {
          this.$message.success(res.data.err_msg);
        }
        this.loading = false;
      });
    },
    getLabelList() {
      labelList({ page: 1, perpage: 100 }).then(res => {
        if (res.data.err_code === 0) {
          this.labelList = res.data.list;
        } else {
          this.$message.success(res.data.err_msg);
        }
      });
    },
    increase() {
      getFrequency({ id: 1 }).then(res => {
        if (res.data.err_code === 0) {
          this.count = res.data.data.count;
          let access = localStorage.getItem("access"),
            newDate = Date.parse(new Date());
          if (!(access && access + 3600 > newDate)) {
            localStorage.setItem("access", newDate);
            let parameter = {
              where: `[["id", "=", "1"]]`,
              data: JSON.stringify({ count: ++this.count })
            };
            updateFrequency(parameter);
          }
        }
      });
    },
    selectLabel(label) {
      this.label = label;
      this.page = 1;
      this.getList();
    },
    getMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    onDownload({ url, id, downloads }) {
      var x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.responseType = "blob";
      x.onload = function() {
        var url = window.URL.createObjectURL(x.response);
        var a = document.createElement("a");
        a.href = url;
        a.download = "";
        a.click();
      };
      x.send();
      this.dataArr.map(item => {
        if (item.id == id) {
          item.downloads++;
        }
      });

      let parameter = {
        where: `[["id", "=", "${id}"]]`,
        data: JSON.stringify({ downloads: ++downloads })
      };
      updatePicture(parameter);
    },
    loadmore() {
      console.log(1231);
    },
    handleScroll() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      // let scrollTop =
      //   document.documentElement.scrollTop || document.body.scrollTop;
      // //变量windowHeight是可视区的高度
      // let windowHeight =
      //   document.documentElement.clientHeight || document.body.clientHeight;
      // //变量scrollHeight是滚动条的总高度
      // let scrollHeight =
      //   document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      // if (
      //   scrollTop + windowHeight + 80 > scrollHeight &&
      //   !this.isEnd &&
      //   !this.loading
      // ) {
      //   this.getList(this.page++);
      // }
      var scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      //滚动条滚动距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //窗口可视范围高度
      var clientHeight =
        window.innerHeight ||
        Math.min(
          document.documentElement.clientHeight,
          document.body.clientHeight
        );

      if (clientHeight + scrollTop >= scrollHeight) {
        console.log("===加载更多内容……===");
        this.getList(this.page++);
      }
    }
  }
};
</script>
<style lang="less">
bldy {
}
@import url("~@/assets/styles/global.css");
@button-bg: #66cac0;
.header-content {
  padding-bottom: 12px;
  user-select: none;
}

.header {
  padding: 10px 6px 0 6px;
  user-select: none;
  text-align: center;
  .tab-content {
    max-width: 986px;
    margin: 0 auto;
    div {
      display: inline-block;
      margin: 0 8px 8px 0;
      border: 1px solid #66cac0;
      color: #66cac0;
      padding: 2px 12px;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
    }
    .activation {
      background: #66cac0;
      color: #fff;
    }
  }
  .count {
    float: right;
    color: #66cac0;
    line-height: 48px;
    font-size: 14px;
    padding-right: 5px;
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
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.content {
  text-align: center;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 4px;
  .cell-item {
    margin: 1rem 0.5rem;
    position: relative;
    transition: all 0.3s;
    &:hover {
      .img-info {
        opacity: 1;
      }
    }
    .img-info {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      opacity: 0;
      transition: opacity 2s;
      padding: 4px 10px;
      //color: #66cac0;
      color: #fff;
      display: flex;
      .date {
        flex: 3;
      }
      .operation {
        flex: 2;
        text-align: right;
        cursor: pointer;
        img {
          width: 20px;
          vertical-align: middle;
          margin-right: 4px;
        }
        span {
          vertical-align: middle;
        }
        div {
        }
      }
    }
  }
  .cell-item-hover {
    //======动画开始======
    &:hover {
      filter: contrast(1.1);
      &:active {
        filter: contrast(0.9);
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border: 3px solid #66cac0;
        transition: all 0.5s;
        animation: clippath 3s infinite linear;
        border-radius: 10px;
      }
      &::after {
        animation: clippath 3s infinite -1.5s linear;
      }
    }
    //======动画结束======
  }
}

@media screen and (max-width: 375px) {
  .header {
    .tab-content {
      div {
        margin: 0 4px 4px 0;
      }
    }
  }
  .content {
    .cell-item {
      margin: 0.3rem 0.15rem;
      //======动画开始======
      &:hover {
        filter: contrast(1.1);
        &:active {
          filter: contrast(0.9);
        }
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border: 1px solid #66cac0;
          transition: all 0.5s;
          animation: clippath 3s infinite linear;
          border-radius: 10px;
        }
        &::after {
          animation: clippath 3s infinite -1.5s linear;
        }
      }
      //======动画结束======
    }
  }
}

@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }
  50% {
    clip-path: inset(98% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 98%);
  }
}
</style>
