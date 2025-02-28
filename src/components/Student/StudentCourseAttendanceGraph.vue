<script setup lang="ts">
const props = defineProps({
  totalSessionsCount: Number,
  totalAttendanceCount: Number,
})

</script>

<template>
  <div class="course-attendance-graph">
    <div class="dots">
      <div class="graph-item attended" v-for="index in props.totalAttendanceCount" :key="index"></div>
      <div class="graph-item not-attended" v-for="index in props.totalSessionsCount" :key="index"></div>
    </div>
    <p>{{ totalAttendanceCount }}/{{ totalSessionsCount }}</p>
  </div>
</template>

<style scoped>
.course-attendance-graph {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.course-attendance-graph > .dots {
  display: flex;
  justify-content: center;
  max-width: 75%;
  margin: 0 auto;
  gap: 1rem;
}

.course-attendance-graph > .dots > .graph-item {
  border: 1px solid white;
  border-radius: 50%;
  width: 10px;
  height: 10px;
}

.attended {
  background-color: var(--color-aurora-green);
}
</style>