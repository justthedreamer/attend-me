import {Role} from "@/model/app/Roles";
import ErrorView from "@/views/ErrorView.vue";
import HomeView from "@/views/HomeView.vue";
import LecturerView from "@/views/LecturerView.vue";
import StudentView from "../views/StudentDesktop.vue";
import type {RouteRecord, RouteRecordRaw} from "vue-router";

export default class Routes {

    public static readonly HomeRoute: RouteRecordRaw = {
        path: "/",
        name: "home",
        component: HomeView,
    };

    public static readonly StudentRoute: RouteRecordRaw = {
        path: "/student",
        name: "student",
        component: StudentView,
        meta: {requireAuth: true, role: Role.STUDENT},
    };

    public static readonly LecturerRoute: RouteRecordRaw = {
        path: "/lecturer",
        name: "lecturer",
        component: LecturerView,
        meta: {requireAuth: true, role: Role.LECTURER},
    };

    public static readonly ErrorRoute: RouteRecordRaw = {
        path: "/error",
        name: "error",
        component: ErrorView,
    };

    public static readonly LecturerDesktop: RouteRecordRaw = {
        path: "/lecturer/desktop",
        name: "lecturer-desktop",
        component: LecturerView,
        meta: {requireAuth: true, role: Role.LECTURER}
    }

    public static readonly StudentDesktop: RouteRecordRaw = {
        path: "/student/desktop",
        name: "student-desktop",
        component: StudentView,
        meta: {requireAuth: true, role: Role.STUDENT},
    }

    public static readonly All: RouteRecordRaw[] = [
        this.HomeRoute,
        this.StudentRoute,
        this.LecturerRoute,
        this.ErrorRoute,
        this.LecturerDesktop,
        this.StudentDesktop,
    ];
}
