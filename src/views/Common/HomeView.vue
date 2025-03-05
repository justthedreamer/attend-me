<script setup lang="ts">
import LoginForm from '../../components/Common/LoginForm.vue';
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {Backend} from "../../main.ts";
import {SessionStorage} from "../../auth/SessionStorage.ts";
import {redirectToDesktopAsync} from "../../helpers/RediretionHelper.ts";

const router = useRouter()

onMounted(async () => {
  Backend.restoreTokens()
  const role = SessionStorage.getRole()
  await redirectToDesktopAsync(router, role!)
})

</script>

<template>
  <main>
    <div class="vh-100 bg-base">
      <LoginForm/>
    </div>
  </main>
</template>
