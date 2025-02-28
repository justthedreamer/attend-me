<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'
import UINotificator from "./components/Common/UINotificator.vue";
import {onMounted, onUnmounted} from "vue";
import useEventBus from "./events/EventBus.ts";
import {checkIsAccessTokenExpired} from "./helpers/SessionHelper.ts";
import {ErrorMessage} from "./events/MessageEvents.ts";
import Routes from "./router/routes.ts";

const router = useRouter()
const {emit} = useEventBus()
let tokenExpiredCheckIntervalId;


const tokenExpirationAsyncHook = async () => {
  if (checkIsAccessTokenExpired()) {
    emit(ErrorMessage, "Session expired, you must sign in.")
    await router.push({name: Routes.HomeRoute.name})
  }
}

onMounted(async () => {
  tokenExpiredCheckIntervalId = setInterval(tokenExpirationAsyncHook, 60_000)
})

onUnmounted(() => {
  clearInterval(tokenExpiredCheckIntervalId)
})

</script>

<template>
  <main>
    <UINotificator/>
    <RouterView/>
  </main>
</template>
<style scoped>
nav {
  display: flex;
  justify-content: space-around;
}

main {
  padding: 1rem;
}
</style>