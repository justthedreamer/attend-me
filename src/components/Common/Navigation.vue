<script setup lang="ts">
import {useRouter} from "vue-router";
import Routes from "../../router/routes.ts";
import {SessionStorage} from "../../auth/SessionStorage.ts";

const router = useRouter()

const handleLogout = async () => {
  SessionStorage.logout()
  await router.push({name: Routes.HomeRoute.name})
}
</script>

<template>
  <nav>
    <div id="logo">AttendMe</div>
    <button id="logout"
            @click="handleLogout">&#10149;
    </button>
  </nav>
  <hr>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}

#logo, #logout {
  font-size: 3rem;
  color: var(--color-steel-blue);
}

#logout {
  background-color: transparent;
  border: none;
}

</style>