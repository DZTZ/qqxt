import Vue from "vue";
import App from "./App.vue";
import axios from "./request/axios";
import waterfall from "vue-waterfall2";

Vue.use(waterfall);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$formRequest = axios.formRequest.post;

new Vue({
  render: h => h(App)
}).$mount("#app");
