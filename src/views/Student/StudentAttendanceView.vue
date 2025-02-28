<script setup lang="ts">
import {QrcodeSvg} from "qrcode.vue";
import {Backend} from "../../main.ts";
import {onMounted, onUnmounted, ref} from "vue";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage} from "../../events/MessageEvents.ts";

const {emit} = useEventBus()

const token = ref<string>("")
let tokenFetchIntervalId;

const fetchTokenAsync = async () => {
  try {
    await Backend.restoreTokens()
    const tokenResult = await Backend.userAttendanceTicketGet()
    token.value = tokenResult.token

  } catch (error) {
    emit(ErrorMessage, "Cannot fetch attendance ticket. " + error.message)
  }
}

onMounted(async () => {
  await Backend.restoreTokens()
  await fetchTokenAsync()

  tokenFetchIntervalId = setInterval(async () => {
    await fetchTokenAsync()
  }, 2000)
})

onUnmounted(() => {
  clearInterval(tokenFetchIntervalId)
})

</script>

<template>
  <header>
    <h1>Register Your Attendance</h1>
    <p>Please scan the QR code with your device to register your attendance.</p>
  </header>
  <div id="qr-code-wrapper">
    <qrcode-svg :value="token"
                :size="500"
                v-if="token !== ''"/>
  </div>
</template>

<style scoped>
#qr-code-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>