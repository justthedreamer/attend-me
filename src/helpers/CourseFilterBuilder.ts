import type {CourseSessionListFilters} from "../backend/AttendMeBackendClientBase.ts";

export class CourseFilterBuilder {
    private search?: string = null
    private courseName?: string = null
    private courseGroupName?: string = null
    private locationName?: string = null
    private dateStart?: Date = null;
    private dateEnd?: Date = null;

    public withSearch(phrase: string | undefined): this {
        this.search = phrase;
        return this;
    }

    public withCourseName(name: string | undefined): this {
        this.courseName = name;
        return this;
    }

    public withCourseGroupName(name: string | undefined): this {
        this.courseGroupName = name;
        return this;
    }

    public withLocationName(name: string | undefined): this {
        this.locationName = name;
        return this;
    }

    public withDateStart(date: Date | undefined): this {
        this.dateStart = date;
        return this;
    }

    public withDateEnd(date: Date | undefined): this {
        this.dateEnd = date;
        return this;
    }

    public build(): CourseSessionListFilters {
        return {
            search: this.search,
            courseName: this.courseName,
            courseGroupName: this.courseGroupName,
            locationName: this.locationName,
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
        }
    }
}