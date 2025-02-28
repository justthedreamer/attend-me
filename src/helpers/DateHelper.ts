export class DateHelper {
    static formatNumericDate(date: string | Date): string {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    }

    static formatTime(date: string | Date): string {
        const dateObj = new Date(date);
        return dateObj.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
}