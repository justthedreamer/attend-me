import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/main.css';
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {ServiceCollection, registerService} from "./DI";
import {AttendMeBackendClient} from "./client/backend/AttendMebackendClient.ts";
import backendConfig from "./config/backend.json"

const app = createApp(App);
const backend = new AttendMeBackendClient(backendConfig.base_url)

registerService(app, ServiceCollection.TOKEN_STORAGE);
registerService(app, ServiceCollection.AUTHENTICATION_SERVICE);
registerService(app, ServiceCollection.LOGIN_HANDLER);

app.use(router);

app.mount("#app");

export {backend as Backend}