<script setup lang="ts">

import {useRouter} from "vue-router";
import Routes from "../../router/routes.ts";

const router = useRouter()

const props = defineProps({
  courseSessionId: Number,
  courseGroupId: Number,
  courseName: String,
  courseDate: String,
  locationName: String,
  sessionTimeStart: String,
  sessionTimeEnd: String,
  sessionAttendance: Boolean,
})

const navigateToAttendanceView = async (courseSessionId: number) => {
  await router.push({
    name: Routes.StudentAttendance.name,
    params: {courseSessionId}
  })
}

const navigateToCourseDetails = async (courseGroupId: number) => {
  await router.push({
    name: Routes.StudentCourseDetails.name,
    params: {courseGroupId}
  })
}

</script>

<template>
  <div class="rounded-cart bg-gradient-polar-blue-to-green">
    <h2>{{ props.courseName }}</h2>
    <p>Date: {{ props.courseDate }}</p>
    <p>Time: {{ props.sessionTimeStart }}-{{ props.sessionTimeEnd }}</p>
    <p>Location: {{ props.locationName }}</p>

    <button class="btn-primary"
            v-if="!props.sessionAttendance"
            @click="navigateToAttendanceView(props.courseSessionId)">Attend Me
    </button>

    <p v-if="props.sessionAttendance">Attended &#10004;</p>
    <button class="btn-secondary" @click="navigateToCourseDetails(props.courseGroupId)">Details</button>
  </div>
</template>