<script setup lang="ts">
import {Backend} from "../../main.ts";
import {onMounted, onUnmounted, ref} from "vue";
import type {CourseSessionAttendanceRecord, CourseSessionListItem} from "../../backend/AttendMeBackendClientBase.ts";
import {DateHelper} from "../../helpers/DateHelper.ts";
import LecturerAttendanceScannerPopup from "../../components/Lecturer/LecturerAttendanceScannerPopup.vue";
import LecturerDeviceRegistrationPopup from "../../components/Lecturer/LecturerDeviceRegistrationPopup.vue";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage} from "../../events/MessageEvents.ts";
import Navigation from "../../components/Common/Navigation.vue";

const props = defineProps({
  courseSessionId: Number,
})

const {emit} = useEventBus()

const session = ref<CourseSessionListItem | null>();
const students = ref<CourseSessionAttendanceRecord[]>([]);
const attendanceScannerPopupState = ref<boolean>(false)
const deviceRegistrationPopupState = ref<boolean>(false)

let fetchingStudentListIntervalId: number;

const fetchSessionDetailsAsync = async (sessionId: number) => {
  try {
    session.value = await Backend.courseTeacherSessionGet(sessionId)
  } catch (error) {

    if (error instanceof Error) {
      emit(ErrorMessage, "Cannot fetch session details. " + error.message)

    } else {
      emit(ErrorMessage, "Cannot fetch session details.")
    }
  }
}

const fetchStudentsListAsync = async (sessionId: number) => {
  try {
    students.value = await Backend.courseSessionAttendanceListGet(sessionId)
  } catch (error) {
    if (error instanceof Error) {
      emit(ErrorMessage, "Cannot fetch session details. " + error.message)

    } else {
      emit(ErrorMessage, "Cannot fetch session details, an unexpected error occurred.")
    }
  }
}

const markAsAttendedAsync = async (student: CourseSessionAttendanceRecord) => {
  try {
    await Backend.courseSessionAttendanceToggle(student.attenderUserId, student.courseSessionId, true)
    await fetchStudentsListAsync(student.courseSessionId!)
  } catch (error) {
    if (error instanceof Error) {
      emit(ErrorMessage, "Cannot attend right now. " + error.message)
    } else {
      emit(ErrorMessage, "Cannot attend right now, an unexpected error occurred.")
    }
  }
}

const markAsUnattendedAsync = async (student: CourseSessionAttendanceRecord) => {
  try {
    await Backend.courseSessionAttendanceToggle(student.attenderUserId, student.courseSessionId, false)
    await fetchStudentsListAsync(student.courseSessionId!)
  } catch (error) {
    if (error instanceof Error) {
      emit(ErrorMessage, "Cannot mark as unattended right now. " + error.message)

    } else {
      emit(ErrorMessage, "Cannot mark as unattended right now, an unexpected error occurred.")
    }
  }
}

const toggleAttendanceScannerPopup = () => {
  attendanceScannerPopupState.value = !attendanceScannerPopupState.value
}

const toggleDeviceRegistrationPopup = () => {
  deviceRegistrationPopupState.value = !deviceRegistrationPopupState.value;
}

onMounted(async () => {
  const sessionId = props.courseSessionId!

  await fetchSessionDetailsAsync(sessionId)

  await fetchStudentsListAsync(sessionId)

  fetchingStudentListIntervalId = setInterval(() => {
    fetchStudentsListAsync(sessionId)
  }, 2000)

})

onUnmounted(() => {
  clearInterval(fetchingStudentListIntervalId)
})
</script>

<template>
  <Navigation/>
  <LecturerAttendanceScannerPopup :is-visible="attendanceScannerPopupState"
                                  :session-id="courseSessionId"
                                  @close="toggleAttendanceScannerPopup"/>

  <LecturerDeviceRegistrationPopup :is-visible="deviceRegistrationPopupState"
                                   :students="students"
                                   @close="toggleDeviceRegistrationPopup"/>
  <header>
    <h1>Course Details</h1>
  </header>

  <hr>

  <section id="course-details-section">
    <div id="course-details" v-if="session">
      <h2>{{ session.courseName }}</h2>
      <p>Group: {{ session.courseGroupName }}</p>
      <p>Date: {{ DateHelper.formatNumericDate(session!.dateStart!) }}</p>
      <p>Time: {{ DateHelper.formatTime(session!.dateStart!) }}-{{ DateHelper.formatTime(session!.dateEnd!) }}</p>
      <p>Location: {{ session.locationName }}</p>
    </div>
    <div id="course-actions">
      <button class="btn-primary" @click="toggleAttendanceScannerPopup" @close="toggleAttendanceScannerPopup">Attendance
        Scanner
      </button>
      <button class="btn-secondary" @click="toggleDeviceRegistrationPopup" @close="toggleDeviceRegistrationPopup">Device
        registration
      </button>
    </div>
  </section>

  <hr>

  <section id="students-list">
    <h2>Students</h2>

    <hr>

    <table class="table alternate-dark-rows">
      <tr>
        <th>Student</th>
        <th class="text-center">Index</th>
        <th class="text-center">Attendance</th>
        <th class="text-center">Action</th>
      </tr>
      <tr v-for="student in students">
        <td>{{ student.userName }} {{ student.userSurname }}</td>
        <td class="text-center">{{ student.studentAlbumIdNumber }}</td>
        <td class="color-success text-center" v-if="student.wasUserPresent">Attended</td>
        <td class="color-error text-center" v-else>Missed</td>
        <td>
          <button class="btn-primary" v-if="!student.attendanceLogId" @click="markAsAttendedAsync(student)">Attend
          </button>
          <button class="btn-primary" v-if="student.attendanceLogId" @click="markAsUnattendedAsync(student)">
            Unattended
          </button>
        </td>
      </tr>
    </table>
    <p v-if="students.length === 0">No students to display...</p>
  </section>
</template>

<style scoped>
#course-details-section {
  display: flex;
  align-items: center;
}

#course-details {
  width: 100%;
}

#course-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
}

button {
  max-width: 150px;
}

table button {
  display: block;
  margin: 5px auto;
}
</style>