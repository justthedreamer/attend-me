<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Backend} from "../../main.ts";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage, SuccessMessage} from "../../events/MessageEvents.ts";
import {redirectToDesktopAsync} from "../../helpers/RediretionHelper.ts";
import {SessionStorage} from "../../auth/SessionStorage.ts";

const router = useRouter();
const {emit} = useEventBus()

const login = ref<string>("");
const password = ref<string>("");

const handleLogIn = async (): Promise<void> => {
  try {
    await Backend.userLogin(login.value, password.value);
    const role = SessionStorage.getRole()
    await redirectToDesktopAsync(router, role)
    emit(SuccessMessage, "Login successful.")
  } catch (error) {
    emit(ErrorMessage, error.message)
  }
}
</script>

<template>
  <div id="login-wrapper">
    <form id="login-form"
          class="form form-column light-form form-row-column"
          @submit.prevent="handleLogIn">
      <header>AttendMe</header>

      <div class="form-row">
        <label for="login-input">Login</label>
        <input id="login-input"
               type="text"
               placeholder="Enter your login"
               required
               v-model="login">
      </div>

      <div class="form-row">
        <label for="password-input">Password</label>
        <input id="password-input"
               type="password"
               placeholder="Enter your password"
               required
               v-model="password">
      </div>

      <button class="btn-primary" type="submit">Sign In</button>
    </form>
  </div>
</template>

<style scoped>
#login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>

