/* eslint-disable no-unused-vars */
import { PhDated, PhWeekOrDay, PhType } from "./dateTypes";

export class DatesByState {

	private _all: Array<PhDated|PhWeekOrDay> = [
		// {
		// 	name: "Anzac Day",
		// 	type: PhType.ALWAYS_SAME_DATE,
		// 	year: 2013,
		// 	month: 4,
		// 	date: 25
		// },
		{
			name: "Christmas Day",
			type: PhType.MONDAY_IF_WEEKEND,
			year: 2013,
			month: 12,
			date: 25
		},
		{
			name: "Boxing Day",
			type: PhType.MONDAY_IF_WEEKEND,
			year: 2013,
			month: 12,
			date: 26
		},
		{
			name: "New Years Day",
			type: PhType.MONDAY_IF_WEEKEND,
			year: 2014,
			month: 1,
			date: 1
		},
		// {
		// 	name: "Queens Birthday",
		// 	type: PhType.MONTH_WEEK_DAY,
		// 	year: 2022,
		// 	month: 6,
		// 	week: 2,
		// 	day: 1
		// }
	];

	private _vic: Array<PhDated|PhWeekOrDay> = [
		{
			name: "Melbourne Cup Day",
			type: PhType.MONTH_WEEK_DAY,
			year: 2022,
			month: 11,
			week: 2,
			day: 2
		}
	];

	public get ALL (): Array<PhDated|PhWeekOrDay> {
		return this._all;
	}

	public get VIC (): Array<PhDated|PhWeekOrDay> {
		return this._vic;
	}
}
