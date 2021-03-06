import { PhDated, PhWeekOrDay, PhType } from "./dateTypes";

export class DatesByState {

	private _national: Array<PhDated|PhWeekOrDay> = [
		{
			name: "Christmas Day",
			type: PhType.MONDAY_IF_WEEKEND,
			year: 2013,
			month: 12,
			date: 25,
			fullDay: true
		},
		{
			name: "Boxing Day",
			type: PhType.MONDAY_IF_WEEKEND,
			year: 2013,
			month: 12,
			date: 26,
			fullDay: true
		},
		{
			name: "New Years Day",
			type: PhType.MONDAY_IF_WEEKEND,
			year: 2014,
			month: 1,
			date: 1,
			fullDay: true
		}
	];

	private _vic: Array<PhDated|PhWeekOrDay> = [
		{
			name: "Melbourne Cup Day",
			type: PhType.MONTH_WEEK_DAY,
			year: 2022,
			month: 11,
			week: 2,
			day: 2,
			fullDay: true
		}
	];

	private _nsw: Array<PhDated|PhWeekOrDay> = [
		{
			name: "Anzac Day",
			type: PhType.ALWAYS_SAME_DATE,
			year: 2013,
			month: 4,
			date: 25,
			fullDay: false
		},
		{
			name: "Queens Birthday",
			type: PhType.MONTH_WEEK_DAY,
			year: 2013,
			month: 6,
			week: 2,
			day: 1,
			fullDay: true
		}
	];

	public get NATIONAL (): Array<PhDated|PhWeekOrDay> {
		return this._national;
	}

	public get VIC (): Array<PhDated|PhWeekOrDay> {
		return this._vic;
	}

	public get NSW (): Array<PhDated|PhWeekOrDay> {
		return this._nsw;
	}
}
