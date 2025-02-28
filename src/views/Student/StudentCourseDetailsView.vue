<script setup lang="ts">
import StudentCourseDetailsList from "../../components/Student/StudentCourseDetailsList.vue";
import {onMounted} from "vue";
import {Backend} from "../../main.ts";

onMounted(async () => {
  await Backend.restoreTokens()
})
</script>

<template>
  <h1>Course details</h1>
  <StudentCourseDetailsList></StudentCourseDetailsList>
</template>

<style scoped>
h1{
  text-align: center;
}
</style>