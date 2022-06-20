/* eslint-disable no-unused-vars */
export enum phType {
    ALWAYS_SAME_DATE,
    MONDAY_IF_WEEKEND,
    MONTH_WEEK_DAY,
}

export interface ph {
    name: string;
    type: phType;
    month: number;
}

export interface phDated extends ph {
    date: number;
}

export interface phWeekOrDay extends ph {
    week: number;
    day: number;
}

export const datesByState = {
	ALL: [
		{
			name: "Anzac Day",
			type: phType.ALWAYS_SAME_DATE,
			month: 4,
			date: 25
		},
		{
			name: "Christmas Day",
			date: 25,
			type: phType.MONDAY_IF_WEEKEND,
			month: 12
		}
	],
	VIC: [
		{
			name: "Melbourne Cup Day",
			type: phType.MONTH_WEEK_DAY,
			month: 11,
			week: 2,
			day: 2
		}
	]
};
