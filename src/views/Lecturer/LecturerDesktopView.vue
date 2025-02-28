<script setup lang="ts">
import {ref} from "vue";
import type {CourseSessionListFilters, CourseSessionListItem} from "../backend/AttendMeBackendClientBase.ts";
import {Backend} from "../main.ts";
import CourseListFilters from "../components/Course/CourseListFilters.vue";
import WhiteBlockMessage from "../components/Common/WhiteBlockMessage.vue";
import LecturerCourseCart from "../components/Course/Lecturer/LecturerCourseCart.vue";
import {DateHelper} from "../helpers/DateHelper.ts";

const filter = ref<CourseSessionListFilters | null>(null)
const sessions = ref<CourseSessionListItem[]>([])

const handleFilterChanged = async (newFilter: CourseSessionListFilters) => {
  filter.value = newFilter;
  await fetchAndSetSessionsAsync()
}

const fetchAndSetSessionsAsync = async () => {
  try {
    const sessionsCollection = await Backend.courseTeacherSessionsGet({
      pageNumber: 1,
      pageSize: 999,
      filters: filter.value
    })

    sessions.value = sessionsCollection.items;
  } catch (error) {
    console.error(error);
  }

}

</script>

<template>
  <h1>Lecturer Desktop</h1>

  <section id="sessions-filters">
    <h2>Filters</h2>
    <CourseListFilters @filterInitialized="handleFilterChanged"
                       @filterChanged="handleFilterChanged"/>
  </section>

  <section id="sessions-section">
    <h2>Sessions</h2>
    <div id="sessions">
      <LecturerCourseCart v-for="session in sessions"
                          :course-session-id="session.courseSessionId"
                          :course-name="session.courseName"
                          :course-group-id="session.courseGroupId"
                          :course-date="DateHelper.formatNumericDate(session.dateStart)"
                          :session-time-start="DateHelper.formatTime(session.dateStart)"
                          :session-time-end="DateHelper.formatTime(session.dateEnd)"
                          :location-name="session.locationName"/>

      <WhiteBlockMessage v-if="sessions.length === 0" message="No sessions to display." :italic="true"/>
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
