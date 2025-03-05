export interface SessionWithAttendance {
    courseId?: number;
    courseName?: string;
    courseGroupId?: number;
    courseGroupName?: string;
    courseSessionId?: number;
    dateStart?: Date,
    dateEnd?: Date,
    date: string;
    timeStart: string;
    timeEnd: string;
    locationName?: string;
    attendance: boolean;
}