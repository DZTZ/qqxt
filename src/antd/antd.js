import Vue from "vue";

import {
  Button,
  Checkbox,
  Icon,
  Alert,
  Modal,
  message,
  Layout,
  Menu,
  Breadcrumb,
  Input,
  DatePicker,
  ConfigProvider
} from "ant-design-vue";

message.config({
  maxCount: 1,
  duration: 0
});

Vue.prototype.$message = message;

Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Icon);
Vue.use(Alert);
Vue.use(Modal);
Vue.use(message);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(ConfigProvider);
