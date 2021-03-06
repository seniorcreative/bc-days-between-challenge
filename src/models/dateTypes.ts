export enum PhType {
    ALWAYS_SAME_DATE,
    MONDAY_IF_WEEKEND,
    MONTH_WEEK_DAY,
}

export interface Ph {
    name: string;
    type: PhType;
    year: number;
    month: number;
}

export interface PhDated extends Ph {
    date: number;
    fullDay: boolean;
}

export interface LocalePublicHoliday {
    date: string;
    fullDay: boolean;
}

export interface PhWeekOrDay extends Ph {
    week: number;
    day: number;
    fullDay: boolean;
}