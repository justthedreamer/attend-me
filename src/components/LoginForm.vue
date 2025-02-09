<template>
  <div class="position-fixed top-50 start-50 translate-middle bg-light p-4 border rounded shadow "
       style="max-width: 400px; width: 100%;">
    <h1>AttendMe</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <label for=" login" class="form-label">Login</label>
      <input id="login" v-model="formData.login" type="text" placeholder="login" class="form-control" value="stu14705"/>
      <p class="form-text">{{ loginErrorMessage.message }}</p>
      <label for="password" class="form-label">Password</label>
      <input id="password" v-model="formData.password" type="password" placeholder="password" class="form-control"
             value="14705"/>
      <p class="form-text">{{ passwordErrorMessage.message }}</p>
      <button type="submit" class="btn btn-primary form-control mt-2" @click="Login">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {inject, ref} from "vue";
import {Backend} from "../main.ts";
import {Auth} from "../helpers/Auth.ts";
import type {LoginResult} from "../client/backend/AttendMeBackendClientBase.ts";
import {useRouter} from "vue-router";
import {ServiceCollection} from "../DI.ts";
import type {ITokenStorage} from "../auth/ITokenStorage.ts";
import {Role} from "../model/app/Roles.ts";
import Routes from "../router/routes.ts";
import Router from "../router";

const login_result = ref(null)

interface LoginForm {
  login: string;
  password: string;
}

interface ErrorMessage {
  message: string
}

const formData = ref<LoginForm>({
  login: "",
  password: "",
})

const loginErrorMessage = ref<ErrorMessage>({
  message: ""
})

const passwordErrorMessage = ref<ErrorMessage>({
  message: ""
})

const router = useRouter();

const LogIn = async () => {
  if (formData.value.login.length < 5) {
    throw Error("login should hav at least 5 characters.")
  }
  if (formData.value.password.length == 0) {
    throw Error("Provide password.")
  }

  await handleSubmit();
}

const token_storage = inject<ITokenStorage>(ServiceCollection.TOKEN_STORAGE.key)  

const login_result_handler = (login_result: LoginResult | null) => {
  if (!login_result) {
    router.push(Routes.HomeRoute.path)
    return;
  }

  token_storage.accessToken = login_result.token
  token_storage.role = login_result.token
  const role = token_storage.role;

  if (role === Role.STUDENT) {
    router.push(Routes.StudentDesktop.path)
  }
  if (role === Role.LECTURER) {
    router.push(Routes.LecturerDesktop.path)
  }

  router.push(Routes.ErrorRoute.path)
}

const handleSubmit = async (): Promise<void> => {
  try {
    const login_result: LoginResult = await Backend.userLogin(Auth.student_login, Auth.student_password)
    login_result_handler(login_result)
  } catch (error) {
    login_result_handler(null)
  }
}

</script>