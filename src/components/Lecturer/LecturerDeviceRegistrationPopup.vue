<script setup lang="ts">

import type {CourseSessionAttendanceRecord} from "../../backend/AttendMeBackendClientBase.ts";
import DeviceRegistrationUserDeviceLoader from "./DeviceRegistrationUserDeviceLoader.vue";
import DeviceRegistrationLinkLoader from "./DeviceRegistrationLinkLoader.vue";

const emit = defineEmits(["close"])
const props = defineProps({
  isVisible: Boolean,
  students: Array<CourseSessionAttendanceRecord>
})

const close = () => {
  emit('close')
}
</script>

<template>
  <div id="device-registration-popup" v-if="isVisible">
    <header>
      <h2>Device registration</h2>
      <button @click="close">&#10005;</button>
    </header>

    <hr>

    <table class="table alternate-white-rows">
      <tr>
        <th>Student</th>
        <th class="text-center">Index</th>
        <th class="text-center">Device</th>
        <th class="text-center">Registration link</th>
      </tr>
      <tr v-for="student in students">
        <td>{{ student.userName }} {{ student.userSurname }}</td>
        <td class="text-center">{{ student.studentAlbumIdNumber }}</td>
        <td class="text-center">
          <DeviceRegistrationUserDeviceLoader :user-id="student.attenderUserId"/>
        </td>
        <td class="text-center">
          <DeviceRegistrationLinkLoader :user-id="student.attenderUserId"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#device-registration-popup {
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
  padding: 1rem;
  scrollbar-width: none;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

h2 {
  font-size: 1.5rem;
}

button {
  background-color: transparent;
  border: none;
  color: var(--color-polar-night-medium);
}
</style>