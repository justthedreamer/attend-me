<script setup lang="ts">
import {QrcodeSvg} from "qrcode.vue";
import {Backend} from "../../main.ts";
import {onMounted, onUnmounted, ref} from "vue";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage} from "../../events/MessageEvents.ts";
import Navigation from "../../components/Common/Navigation.vue";

const {emit} = useEventBus()

const token = ref<string>("")
let tokenFetchIntervalId: number;

const fetchTokenAsync = async () => {
  try {
    Backend.restoreTokens()
    const tokenResult = await Backend.userAttendanceTicketGet()

    if (!tokenResult.token) {
      emit(ErrorMessage, "Failed to fetch attendance ticket.")
      return;
      
    } else {
      token.value = tokenResult.token

    }

  } catch (error) {

    if (error instanceof Error) {
      emit(ErrorMessage, "Cannot fetch attendance ticket. " + error.message)
    } else {
      emit(ErrorMessage, "Cannot fetch attendance ticket, an unexpected token occurred.")
    }
  }
}

onMounted(async () => {
  Backend.restoreTokens()
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
  <Navigation/>
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