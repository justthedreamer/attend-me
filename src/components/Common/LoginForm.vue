<script setup lang="ts">
import {inject, ref} from "vue";
import {Backend} from "../main.ts";
import {Auth} from "../helpers/Auth.ts";
import {useRouter} from "vue-router";
import Routes from "../router/routes.ts";
import {Role} from "../model/app/Roles.ts";
import type {TokenResult} from "../backend/AttendMeBackendClientBase.ts";
import {ServiceCollection} from "../DI.ts";
import type {ISessionStorage} from "../auth/ISessionStorage.ts";

interface LoginForm {
  login: string;
  password: string;
}

const formData = ref<LoginForm>({
  login: "",
  password: "",
})
const usernameErrorMessage = ref<string>("")
const passwordErrorMessage = ref<string>("")

const router = useRouter();
const sessionStorage = inject<ISessionStorage>(ServiceCollection.SESSION_STORAGE.key)

const handleLoginFormSubmit = async (): Promise<void> => {
  try {
    // temporary use credentials from configuration. todo
    const loginResult: TokenResult = await Backend.userLogin(Auth.lecturer_login, Auth.lecturer_password)

    if (!loginResult) {
      throw new Error("Login failed.") //todo
    }

    const role = sessionStorage.getRole()

    switch (role) {
      case Role.STUDENT: {
        await router.push(Routes.StudentDesktop.path)
        break;
      }
      case Role.LECTURER: {
        await router.push(Routes.LecturerDesktop.path)
        break;
      }
      default: {
        throw new Error("Role is not supported." + role)
      }
    }
  } catch (error) {
    throw error;
  }
}
</script>

<template>
  <div class="position-fixed top-50 start-50 translate-middle bg-light p-4 border rounded shadow "
       style="max-width: 400px; width: 100%;">
    <h1>AttendMe</h1>
    <form class="form" @submit.prevent="handleLoginFormSubmit">
      <label for=" login" class="form-label">Login</label>
      <input id="login" v-model="formData.login" type="text" placeholder="login" class="form-control" value="stu14705"/>
      <p class="form-text">{{ usernameErrorMessage.message }}</p>
      <label for="password" class="form-label">Password</label>
      <input id="password" v-model="formData.password" type="password" placeholder="password" class="form-control"
             value="14705"/>
      <p class="form-text">{{ passwordErrorMessage.message }}</p>
      <button type="submit" class="btn btn-primary form-control mt-2" @click="Login">Login</button>
    </form>
  </div>
</template>

