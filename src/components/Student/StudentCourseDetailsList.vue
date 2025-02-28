<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import AttendanceState from "../Course/AttendanceState.vue";
import StudentCourseProgressBar from "./StudentCourseProgressBar.vue";
import type {SessionWithAttendance} from "../../model/SessionWithAttendance.ts";
import type {AttendanceLog, CourseSessionListItem} from "../../backend/AttendMeBackendClientBase.ts";
import {Backend} from "../../main.ts";
import {ModelMapper} from "../../helpers/ModelMapper.ts";
import StudentCourseAttendanceGraph from "./StudentCourseAttendanceGraph.vue";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage} from "../../events/MessageEvents.ts";

const router = useRouter();
const route = useRoute();
const {emit} = useEventBus();

const sessionsWithAttendance = ref<SessionWithAttendance[]>([]);
const courseName = ref<string>("");
const courseGroupName = ref<string>("");

const totalAttendanceCount = computed(() => {
  return sessionsWithAttendance.value.filter(session => session.attendance).length;
})
const totalSessionsCount = computed(() => {
  return sessionsWithAttendance.value.length;
})

onMounted(async () => {
  try {
    const courseGroupId = route.params.courseGroupId as number;
    const courseData: CourseSessionListItem[] = await Backend.courseStudentGroupSessionsGet(courseGroupId);
    const attendanceLogs: AttendanceLog[] = await Backend.courseStudentAttendanceGet(courseGroupId);

    sessionsWithAttendance.value = courseData
        .map(item => ModelMapper.MapCourseSessionListItemToSessionWithAttendance(item, attendanceLogs))
        .reverse();

    if (courseData.length > 0) {
      courseName.value = courseData[0].courseName;
      courseGroupName.value = courseData[0].courseGroupName;
    }

  } catch (error) {
    emit(ErrorMessage, "Cannot fetch course data." + error.message)
  }
});
</script>

<template>
  <div id="course-details" class="rounded-cart">
    <h2>{{ courseName }}</h2>
    <h3>{{ courseGroupName }}</h3>

    <hr/>

    <div id="course-progress">
      <h4>Course progress</h4>
      <StudentCourseProgressBar :sessions="sessionsWithAttendance"/>
    </div>

    <div id="attendance-summary">
      <h4>Attendance summary</h4>
      <StudentCourseAttendanceGraph :total-attendance-count="totalAttendanceCount"
                                    :total-sessions-count="totalSessionsCount"/>
    </div>

  </div>
  <div id="sessions-history">
    <h2>Sessions history</h2>
    <div class="rounded-cart bg-gradient-polar-blue-to-green" v-for="session in sessionsWithAttendance"
         :key="session.courseSessionId">
      <p>Date: {{ session.date }}</p>
      <p>Time: {{ session.timeStart }} - {{ session.timeEnd }}</p>
      <p>Location: {{ session.locationName }}</p>
      <AttendanceState :attendance="session.attendance" :course-session-id="session.courseSessionId"/>
    </div>
  </div>
</template>

<style scoped>
#course-details {
  text-align: center;
}

#sessions-history {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}

#course-progress {
  margin-block: 2rem;
}

#course-progress h4, #attendance-summary h4 {
  margin-bottom: 1rem;
}
</style>