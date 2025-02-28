<script setup lang="ts">

import {useRouter} from "vue-router";
import Routes from "../../router/routes.ts";

const router = useRouter()

const props = defineProps({
  courseSessionId: Number,
  courseGroupId: Number,
  courseGroupName: String,
  courseName: String,
  courseDate: String,
  sessionTimeStart: String,
  sessionTimeEnd: String,
  locationName: String,
})

const navigateToCourseDetails = async (courseSessionId: number) => {
  await router.push({
    name: Routes.LecturerCourseDetails.name,
    params: {courseSessionId: courseSessionId}
  })
}

</script>

<template>
  <div class="rounded-cart bg-gradient-polar-blue-to-green">
    <h2>{{ props.courseName }}</h2>
    <p>Group: {{ props.courseGroupName }}</p>
    <p>Date: {{ props.courseDate }}</p>
    <p>Time: {{ props.sessionTimeStart }}-{{ props.sessionTimeEnd }}</p>
    <p>Location: {{ props.locationName }}</p>
    <button class="btn-secondary" @click="navigateToCourseDetails(props.courseSessionId)">Details</button>
  </div>
</template>