export interface SessionWithAttendance {
    courseId: number;
    courseName: string;
    courseGroupId: number;
    courseGroupName: string;
    courseSessionId: number;
    dateFrom: Date,
    dateTo: Date,
    date: string;
    timeStart: string;
    timeEnd: string;
    locationName: string;
    attendance: boolean;
}