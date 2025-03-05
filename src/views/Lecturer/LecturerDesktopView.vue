<script setup lang="ts">
import {ref} from "vue";
import type {CourseSessionListFilters, CourseSessionListItem} from "../../backend/AttendMeBackendClientBase.ts";
import CourseListFilters from "../../components/Course/CourseListFilters.vue";
import LecturerCourseCart from "../../components/Lecturer/LecturerCourseCart.vue";
import {DateHelper} from "../../helpers/DateHelper.ts";
import {AttendMeBackendHelper} from "../../helpers/AttendMeBackendHelper.ts";
import Navigation from "../../components/Common/Navigation.vue";

const filter = ref<CourseSessionListFilters | null>(null)
const sessions = ref<CourseSessionListItem[]>([])

const handleFilterChanged = async (newFilter: CourseSessionListFilters) => {
  filter.value = newFilter;
  await fetchAndSetSessionsAsync()
}

const fetchAndSetSessionsAsync = async () => {
  const sessionsCollection = await AttendMeBackendHelper.getLecturerSessionsAsync(filter.value);

  if (!sessionsCollection) {
    throw new Error("Cannot fetch lecturer sessions right now.")
  }

  sessions.value = sessionsCollection.reverse();
}

</script>

<template>
  <Navigation/>
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
                          :course-group-name="session.courseGroupName"
                          :course-date="DateHelper.formatNumericDate(session!.dateStart!)"
                          :session-time-start="DateHelper.formatTime(session!.dateStart!)"
                          :session-time-end="DateHelper.formatTime(session!.dateEnd!)"
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
