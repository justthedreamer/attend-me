export class CourseFilterHelper {
    static getDateRangeForFilter(option: string): { dateStart: Date | null; dateEnd: Date | null } {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        const tomorrow = new Date(todayStart);
        tomorrow.setDate(todayStart.getDate() + 1);
        const tomorrowEnd = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59);

        // Calculate the start of the next week (next Monday)
        const nextMonday = new Date(todayStart);
        nextMonday.setDate(todayStart.getDate() + ((1 + 7 - todayStart.getDay()) % 7 || 7));
        const nextSunday = new Date(nextMonday);
        nextSunday.setDate(nextMonday.getDate() + 6);
        const nextSundayEnd = new Date(nextSunday.getFullYear(), nextSunday.getMonth(), nextSunday.getDate(), 23, 59, 59);

        switch (option) {
            case 'Today':
                return {dateStart: todayStart, dateEnd: todayEnd};
            case 'Tomorrow':
                return {dateStart: tomorrow, dateEnd: tomorrowEnd};
            case 'NextWeek':
                return {dateStart: nextMonday, dateEnd: nextSundayEnd};
            case 'Past':
                return {dateStart: null, dateEnd: now};
            case 'Future':
                return {dateStart: now, dateEnd: null};
            case 'All':
                return {dateStart: null, dateEnd: null};
            default:
                return {dateStart: null, dateEnd: null};
        }
    }
}
