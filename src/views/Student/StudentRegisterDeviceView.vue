<script setup lang="ts">
import {ref} from "vue";
import type {DeviceRegisterDTO} from "../../backend/AttendMeBackendClientBase.ts";
import {Backend} from "../../main.ts";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage} from "../../events/MessageEvents.ts";
import Navigation from "../../components/Common/Navigation.vue";

const props = defineProps({
  token: String
})
const {emit} = useEventBus()


const deviceName = ref<string>("")
const userName = ref<string>("")
const userSurname = ref<string>("")
const indexNumber = ref<string>("")

const handleRegister = async () => {
  try {
    const dto: DeviceRegisterDTO = {
      deviceName: deviceName.value,
      studentName: userName.value,
      studentSurname: userSurname.value,
      albumIdNumber: indexNumber.value
    }

    const result = await Backend.userDeviceRegisterWithToken(props.token, dto)
    console.log(result)

  } catch (error) {
    emit(ErrorMessage, "Cannot register device. " + error.message)
  }
}
</script>

<template>
  <Navigation/>
  <div id="device-registration-wrapper">
    <section id="device-registration-description">
      <h1>Device registration</h1>
      <p>You can register your device using this form.</p>
    </section>

    <form id="device-registration-form"
          class="form form-column light-form"
          @submit.prevent="handleRegister">
      <div class="form-row">
        <label for="device-name">Device name</label>
        <input type="text"
               id="device-name"
               placeholder="Enter device name"
               required
               v-model="deviceName">
      </div>

      <div class="form-row">
        <label for="user-name">Your name</label>
        <input type="text"
               id="user-name"
               placeholder="Enter your name"
               required
               v-model="userName">
      </div>

      <div class="form-row">
        <label for="user-surname">Your surname</label>
        <input type="text"
               id="user-surname"
               placeholder="Enter your surname"
               required
               v-model="userSurname">
      </div>

      <div class="form-row">
        <label for="user-index-number">Your index number</label>
        <input type="number"
               id="user-index-number"
               placeholder="Enter your index number"
               required
               v-model="indexNumber">
      </div>

      <button type="submit" class="btn-primary">Register</button>
    </form>
  </div>
</template>

<style scoped>
#device-registration-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#device-registration-description {
  text-align: center;
}

#device-registration-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
}
</style>