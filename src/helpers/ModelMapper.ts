import type {AttendanceLog, CourseSessionListItem} from "../backend/AttendMeBackendClientBase.ts";
import type {SessionWithAttendance} from "../model/SessionWithAttendance.ts";
import {DateHelper} from "./DateHelper.ts";

export class ModelMapper {

    static MapCourseSessionListItemToSessionWithAttendance(session: CourseSessionListItem, attendanceLogs: AttendanceLog[]): SessionWithAttendance {
        const sessionWithAttendance: SessionWithAttendance = {
            ...session,
            date: DateHelper.formatNumericDate(session.dateStart),
            timeStart: DateHelper.formatTime(session.dateStart),
            timeEnd: DateHelper.formatTime(session.dateEnd),
            attendance: attendanceLogs.some(log => log.courseSessionId === session.courseSessionId)
        }

        return sessionWithAttendance;
    }
}

