<script setup lang="ts">
import {QrcodeStream} from 'vue-qrcode-reader'
import type {DetectedBarcode} from "vue-qrcode-reader";
import {Backend} from "../../main.ts";
import {onMounted} from "vue";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage, SuccessMessage} from "../../events/MessageEvents.ts";

const props = defineProps({
  token: String
})

const {emit} = useEventBus()

const onDetect = async (data: DetectedBarcode[]) => {
  try {
    const code = data[0]
    const result = await Backend.courseSessionAttendanceRegister(code.rawValue)
    emit(SuccessMessage, `${result.name} ${result.surname} successfully attended!`)

  } catch (error) {

    if (error instanceof Error) {
      emit(ErrorMessage, "Cannot attend right now. " + error.message)
    } else {
      emit(ErrorMessage, "Cannot attend right now, an unexpected error occurred. ")
    }

  }
}

onMounted(() => {
  Backend.deviceTokenResult = {token: props.token}
})

</script>

<template>
  <h1>Attendance Scanner</h1>
  <hr>
  <div>
    <qrcode-stream @detect="onDetect"/>
  </div>
</template>