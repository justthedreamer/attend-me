<script setup lang="ts">
import StudentCourseDetailsList from "../../components/Student/StudentCourseDetailsList.vue";
import {onMounted} from "vue";
import {Backend} from "../../main.ts";
import Navigation from "../../components/Common/Navigation.vue";

onMounted(async () => {
  await Backend.restoreTokens()
})
</script>

<template>
  <Navigation/>
  <h1>Course details</h1>
  <StudentCourseDetailsList></StudentCourseDetailsList>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>