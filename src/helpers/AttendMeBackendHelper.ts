import {Backend} from "../main.ts";
import type {
    AttendanceLog,
    CourseSessionListFilters,
    CourseSessionListItem
} from "../backend/AttendMeBackendClientBase.ts";
import {ModelMapper} from "./ModelMapper.ts";
import type {SessionWithAttendance} from "../model/SessionWithAttendance.ts";
import useEventBus from "../events/EventBus.ts";
import {ErrorMessage} from "../events/MessageEvents.ts";

export class AttendMeBackendHelper {
    static async getStudentSessionsWithAttendanceAsync(filter: CourseSessionListFilters | null): Promise<SessionWithAttendance[]> {
        const {emit} = useEventBus()
        try {
            // Fetch session data
            const sessionData = await Backend
                .courseStudentSessionsGet({pageNumber: 1, pageSize: 999, filters: filter})
            const sessions = sessionData.items;

            // Extract distinct course groups.
            const courseGroupsIds = Array.from(new Set(sessions.map(session => session.courseGroupId)))

            // Fetch attendance logs
            let attendanceLogs: AttendanceLog[] = [];
            for (const id of courseGroupsIds) {
                const logs = await Backend.courseStudentAttendanceGet(id);
                attendanceLogs = attendanceLogs.concat(logs);
            }

            // Create the unified data array
            return sessions.map(session => ModelMapper.MapCourseSessionListItemToSessionWithAttendance(session, attendanceLogs)).reverse();

        } catch (error) {
            emit(ErrorMessage, "Cannot fetch sessions. " + error.message)
        }
    }

    static async getLecturerSessionsAsync(filter: CourseSessionListFilters | null): Promise<CourseSessionListItem[]> {
        const {emit} = useEventBus()

        try {
            const sessionsCollection = await Backend.courseTeacherSessionsGet({
                pageNumber: 1,
                pageSize: 9999,
                filters: filter
            })

            return sessionsCollection.items;
        } catch (error) {
            emit(ErrorMessage, "Cannot fetch sessions. " + error.message)
        }
    }
}

