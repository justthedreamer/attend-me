<script setup lang="ts">

import {computed} from "vue";
import type {SessionWithAttendance} from "../../model/SessionWithAttendance.ts";

const props = defineProps({
  sessions: Array<SessionWithAttendance>
})

const completedSessionsCount = computed(() => {
  const now = new Date()
  return props.sessions?.filter(session => now >= session.dateEnd).length;
})

const totalSessionsCount = computed(() => {
  return props.sessions?.length
})

const completionPercentage = computed(() => {
  return (completedSessionsCount.value / totalSessionsCount.value) * 100;
});

</script>

<template>
  <div class="course-progress-bar">
    <div class="progress-bar bg-gradient-polar-blue-to-green move-gradient"
         :style="{width: `${completionPercentage}%`}">
    </div>
    <div class="course-progress-bar-sessions-count">{{ totalSessionsCount }}/{{ completedSessionsCount }}</div>
  </div>
</template>

<style scoped>
.course-progress-bar {
  position: relative;
  display: flex;
  overflow: hidden;

  max-width: 300px;
  height: 20px;
  border: 1px solid #ccc;
  margin: 0 auto;
  border-radius: 10pt;
  font-size: 14px;
  align-items: center;
  font-weight: bold;
}

.course-progress-bar-sessions-count {
  position: absolute;
  width: 100%;
  text-align: center;
  color: var(--color-aurora-whiteish-gray);
}

.progress-bar {
  justify-self: flex-start;
  height: 100%;
  background-color: black;
  margin: 0;
  transition: width .3s;
}

</style>