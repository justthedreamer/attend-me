<script setup lang="ts">
import {onMounted, ref} from "vue";
import {LoaderState} from "./LoaderState.ts";
import {Backend} from "../../main.ts";

const props = defineProps({
  userId: Number
})

const state = ref<LoaderState>(LoaderState.LOADING)
const deviceName = ref<string>("")

onMounted(async () => {
  const user = await Backend.userGet(props.userId)

  if (user) {
    state.value = LoaderState.SUCCESS
    deviceName.value = user.deviceName!
  } else {
    state.value = LoaderState.FAILED
  }
})
</script>

<template>
  <template v-if="state === LoaderState.SUCCESS">
    <template v-if="!deviceName">Missing</template>
    <template v-else>
      {{ deviceName}}
      <br>
      <button class="btn btn-warning">Reset</button>
    </template>
  </template>

  <template v-if="state === LoaderState.LOADING">Loading...</template>

  <template v-if="state === LoaderState.FAILED">Failed...</template>
</template>