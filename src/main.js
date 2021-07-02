import Vue from "vue";
import App from "./App.vue";
// import App from "./views/Home.vue";
import axios from "./request/axios";
import waterfall from "vue-waterfall2";
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";

Vue.use(preview);
Vue.use(waterfall);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$formRequest = axios.formRequest.post;

new Vue({
  render: h => h(App)
}).$mount("#app");
