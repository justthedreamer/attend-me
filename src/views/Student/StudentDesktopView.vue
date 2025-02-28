<script setup lang="ts">
import CourseListFilters from "../../components/Course/CourseListFilters.vue";
import type {CourseSessionListFilters} from "../../backend/AttendMeBackendClientBase.ts";
import {ref} from "vue";
import type {SessionWithAttendance} from "../../model/SessionWithAttendance.ts";
import {AttendMeBackendHelper} from "../../helpers/AttendMeBackendHelper.ts";
import StudentCourseCart from "../../components/Student/StudentCourseCart.vue";
import Navigation from "../../components/Common/Navigation.vue";

const filter = ref<CourseSessionListFilters | null>(null);
const sessions = ref<SessionWithAttendance[]>([]);

const handleFilterChanged = async (newFilter: CourseSessionListFilters) => {
  filter.value = newFilter;
  await fetchAndSetSessionsAsync()
}

const fetchAndSetSessionsAsync = async () => {
  sessions.value = await AttendMeBackendHelper.getStudentSessionsWithAttendanceAsync(filter.value);
}

</script>

<template>
  <Navigation/>
  <h1>Student Desktop</h1>

  <section id="sessions-filters">
    <h2>Filters</h2>
    <CourseListFilters @filterInitialized="handleFilterChanged"
                       @filterChanged="handleFilterChanged"/>
  </section>

  <section id="sessions-section">
    <h2>Sessions</h2>
    <div id="sessions">
      <StudentCourseCart v-for="session in sessions"
                         :course-session-id="session.courseSessionId"
                         :course-name="session.courseName"
                         :course-group-id="session.courseGroupId"
                         :course-date="session.date"
                         :session-time-end="session.timeEnd"
                         :session-time-start="session.timeStart"
                         :session-attendance="session.attendance"
                         :location-name="session.locationName"/>

      <p class="italic color-shy-white" v-if="sessions.length === 0">No sessions matching the filter criteria were
        found.</p>
      <p v-if="!filter">Loading...</p>
    </div>
  </section>

</template>

<style scoped>
section {
  padding: 1rem;
}

#sessions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>