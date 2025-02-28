<script setup lang="ts">
import {useRouter} from "vue-router";
import Routes from "../../router/routes.ts";

const router = useRouter()

const props = defineProps({
  attendance: Boolean,
  courseSessionId: Number,
})

const navigateToAttendanceView = async () => {
  await router.push({name: Routes.StudentAttendance.name})
}

</script>

<template>
  <button class="btn-primary"
          v-if="!props.attendance"
          @click="navigateToAttendanceView">Attend Me
  </button>
  <p v-if="props.attendance">Attended &#10004;</p>
</template>
