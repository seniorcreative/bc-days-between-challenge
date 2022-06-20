/* eslint-disable no-unused-vars */
export enum PhType {
    ALWAYS_SAME_DATE,
    MONDAY_IF_WEEKEND,
    MONTH_WEEK_DAY,
}

export interface Ph {
    name: string;
    type: PhType;
    month: number;
}

export interface PhDated extends Ph {
    date: number;
}

export interface PhWeekOrDay extends Ph {
    week: number;
    day: number;
}

export const DatesByState = {
	ALL: [
		{
			name: "Anzac Day",
			type: PhType.ALWAYS_SAME_DATE,
			month: 4,
			date: 25
		},
		{
			name: "Christmas Day",
			type: PhType.MONDAY_IF_WEEKEND,
			month: 12,
			date: 25
		},
		{
			name: "Queens Birthday",
			type: PhType.MONTH_WEEK_DAY,
			month: 6,
			week: 2,
			day: 1
		}
	],
	VIC: [
		{
			name: "Melbourne Cup Day",
			type: PhType.MONTH_WEEK_DAY,
			month: 11,
			week: 2,
			day: 2
		}
	]
};
