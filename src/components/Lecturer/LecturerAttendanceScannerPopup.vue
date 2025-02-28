<script setup lang="ts">
import {QrcodeSvg} from "qrcode.vue";
import {onMounted, ref} from "vue";
import {Backend} from "../../main.ts";
import Routes from "../../router/routes.ts";
import {useRouter} from "vue-router";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage, SuccessMessage} from "../../events/MessageEvents.ts";

const props = defineProps({
  isVisible: Boolean,
  sessionId: String
})

const router = useRouter()

const bus = useEventBus()

const token = ref<string | null>(null);

const emit = defineEmits(["close"])

const close = () => {
  emit("close")
}

const getLink = () => {
  const relativePath = router.resolve({
    name: Routes.LecturerAttendanceScanner.name,
    params: {token: token.value}
  }).href;

  return `${window.location.origin}${relativePath}`
}

const copyLink = async () => {
  try {
    const url = getLink()
    await navigator.clipboard.writeText(url);
    bus.emit(SuccessMessage, "Link copied.")

  } catch (error) {
    bus.emit(ErrorMessage,
        "Cannot copy link at this moment. Ensure your browser support clipboard. " + error.message)
  }
}

onMounted(async () => {
  try {
    const tokenResult = await Backend.courseSessionAttendanceScannerTokenGet(props.sessionId)
    token.value = tokenResult.token;

  } catch (error) {
    bus.emit(ErrorMessage, "Cannot fetch attendance scanner token. " + error.message)
  }
})


</script>

<template>
  <div id="session-attendance-scanner" v-if="isVisible">
    <header>
      <h2>Attendance Scanner</h2>
      <button class="close-button" @click="close">&#10005;</button>
    </header>
    <hr>
    <p class="text-center">Scan following QR code to open attendance scanner, or copy the direct link.</p>
    <div id="attendance-qr-code">
      <template v-if="token">
        <qrcode-svg :value="getLink()" :size="300"/>
        <button id="direct-link-button" class="btn-primary" @click="copyLink">Copy link</button>
      </template>
      <template v-else>
        <span>Failed to load token.</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
#session-attendance-scanner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: var(--color-aurora-whiteish-gray);
  color: var(--color-polar-night-darkest);
  width: calc(100vw - 3rem);
  height: calc(100vh - 3rem);
  max-width: 600px;
  max-height: 800px;
  border-radius: 10pt;
  overflow-y: scroll;
  scrollbar-width: none;
}

#attendance-qr-code {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

#direct-link-button {
  max-width: 150px;
}

header {
  display: flex;
  justify-content: space-between;
}

header, p {
  padding: 1rem;
}
</style>