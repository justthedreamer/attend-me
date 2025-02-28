import {Role} from "../model/Roles.ts";
import HomeView from "../views/Common/HomeView.vue";
import type {RouteRecordRaw} from "vue-router";
import StudentAttendanceView from "../views/Student/StudentAttendanceView.vue";
import LecturerCourseDetailsView from "../views/Lecturer/LecturerCourseDetailsView.vue";
import LecturerDesktopView from "../views/Lecturer/LecturerDesktopView.vue";
import StudentDesktopView from "../views/Student/StudentDesktopView.vue";
import StudentCourseDetailsView from "../views/Student/StudentCourseDetailsView.vue";
import StudentDeviceRegistrationView from "../views/Student/StudentRegisterDeviceView.vue";
import LecturerAttendanceScannerView from "../views/Lecturer/LecturerAttendanceScannerView.vue";

export default class Routes {

    public static readonly HomeRoute: RouteRecordRaw = {
        path: "/",
        name: "home",
        component: HomeView,
    };

    public static readonly LecturerDesktop: RouteRecordRaw = {
        path: "/lecturer/desktop",
        name: "lecturer-desktop",
        component: LecturerDesktopView,
        meta: {requireAuth: true, role: Role.LECTURER}
    }

    public static readonly LecturerCourseDetails: RouteRecordRaw = {
        path: "/lecturer/course/:courseSessionId",
        name: "lecturer-course-details",
        component: LecturerCourseDetailsView,
        meta: {requireAuth: true, role: Role.LECTURER},
        props: true,
    }

    public static readonly StudentDesktop: RouteRecordRaw = {
        path: "/student/desktop",
        name: "student-desktop",
        component: StudentDesktopView,
        meta: {requireAuth: true, role: Role.STUDENT},
    }

    public static readonly StudentCourseDetails: RouteRecordRaw = {
        path: "/student/course/:courseGroupId",
        name: "student-course-details",
        component: StudentCourseDetailsView,
        props: true,
    }

    public static readonly StudentDeviceRegistration: RouteRecordRaw = {
        path: "/student/device/register/:token",
        name: "student-device-registration",
        component: StudentDeviceRegistrationView,
        props: true,
    }

    public static readonly StudentAttendance: RouteRecordRaw = {
        path: "/student/attendance",
        name: "student-attendance",
        component: StudentAttendanceView,
        meta: {requireAuth: true, role: Role.STUDENT}
    }

    public static readonly LecturerAttendanceScanner: RouteRecordRaw = {
        path: "/lecturer/attendance/scanner/:token",
        name: "lecturer-attendance-scanner",
        component: LecturerAttendanceScannerView,
        props: true,
    }

    public static readonly All: RouteRecordRaw[] = [
        this.HomeRoute,
        this.StudentDesktop,
        this.LecturerDesktop,
        this.LecturerCourseDetails,
        this.StudentCourseDetails,
        this.StudentAttendance,
        this.StudentDeviceRegistration,
        this.LecturerAttendanceScanner,
    ];
}
