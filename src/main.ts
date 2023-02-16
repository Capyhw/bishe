import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";

const app = createApp(App);
//注册 @element-plus/icons-vue
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
app.use(ElementPlus, {
  locale: zhCn,
});
