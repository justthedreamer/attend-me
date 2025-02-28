import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/main.css';
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import backendConfig from "./config/backend.json"
import {AttendMeBackendClient} from "./backend/AttendMeBackendClient.ts";
import {VueQrcodeReader} from "vue-qrcode-reader";

const app = createApp(App);
const backend = new AttendMeBackendClient(backendConfig.base_url)

app.use(VueQrcodeReader)
app.use(router);

app.mount("#app");
export {backend as Backend}