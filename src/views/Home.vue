<!--<template>-->
<!--  <div>-->
<!--    <waterfall :col="3" :data="dataArr" @loadmore="loadmore"  :width="itemWidth" :gutterWidth="gutterWidth" >-->
<!--      <template >-->
<!--        <div :class="`cell-item`" v-for="(item, index) in dataArr" :key="index" >-->
<!--          <img v-if="item.url" :src="item.url" alt="加载错误" preview="2"/>-->
<!--        </div>-->
<!--      </template>-->
<!--    </waterfall>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import { pictureList } from "@/request/api";-->
<!--export default {-->
<!--  name: "Home",-->
<!--  components: {},-->
<!--  data() {-->
<!--    return {-->
<!--      imgsArr: [-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-0847f9c5fb24ad48801b14f214f57b79_1440w.jpg"-->
<!--        },-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-e5657c85092acde7553f8c478d41674f_1440w.jpg"-->
<!--        },-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-d29df0fd9122caf79e96a93b06eb2ab7_1440w.jpg"-->
<!--        },-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-0847f9c5fb24ad48801b14f214f57b79_1440w.jpg"-->
<!--        },-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-e5657c85092acde7553f8c478d41674f_1440w.jpg"-->
<!--        },-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-d29df0fd9122caf79e96a93b06eb2ab7_1440w.jpg"-->
<!--        },-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-0847f9c5fb24ad48801b14f214f57b79_1440w.jpg"-->
<!--        },-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-e5657c85092acde7553f8c478d41674f_1440w.jpg"-->
<!--        },-->
<!--        {-->
<!--          url:-->
<!--            "https://pic1.zhimg.com/80/v2-d29df0fd9122caf79e96a93b06eb2ab7_1440w.jpg"-->
<!--        }-->
<!--      ],-->
<!--      dataArr: [],-->
<!--      page: 1,-->
<!--      perpage: 20,-->

<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.getList();-->
<!--  },-->
<!--  computed:{-->
<!--    itemWidth(){-->
<!--      return (231*0.5*(document.documentElement.clientWidth/375)) // #rem布局 计算宽度-->
<!--    },-->
<!--    gutterWidth(){-->
<!--      return (12*0.5*(document.documentElement.clientWidth/375))	//#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    getList() {-->
<!--      this.loading = true;-->
<!--      let { page, perpage } = this;-->
<!--      let data = { where_id: "GE-1", order: ["id DESC"], page, perpage };-->
<!--      pictureList(data).then(res => {-->
<!--        if (res.data.err_code === 0) {-->
<!--          let data = res.data;-->
<!--          this.isEnd = page * perpage >= data.total;-->

<!--          if (page != 1) {-->
<!--            this.dataArr = [...this.dataArr, ...data.list];-->
<!--          } else {-->
<!--            this.dataArr = data.list;-->
<!--          }-->
<!--          this.$previewRefresh();-->
<!--          console.log(this.dataArr);-->
<!--        } else {-->
<!--          this.$message.success(res.data.err_msg);-->
<!--        }-->
<!--        this.loading = false;-->
<!--      });-->
<!--    },-->

<!--    loadmore(index) {-->
<!--      console.log(123123)-->
<!--      // this.data = this.data.concat(this.data);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
<!--<style lang="less" >-->
<!--.cell-item {-->
<!--  img {-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--  }-->
<!--}-->
<!--</style>-->
