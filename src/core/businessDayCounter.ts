import { Utils } from "../common/utils";
import { Constants } from "../models/constants";
import { PhDated, PhWeekOrDay } from "../models/datesByState";

export class BusinessDayCounter {
	public WeekdaysBetweenTwoDates (firstDate: Date, secondDate: Date): number {
		let days = 0;
		for (let date = Utils.dateAsTime(firstDate) + Constants.DAY_MILLISECONDS; date < Utils.dateAsTime(secondDate); date += Constants.DAY_MILLISECONDS) {
			const day = new Date(date).getDay();
			if (day > 0 && day < 6) days+=1;
		}
		return days;
	}

	public BusinessDaysBetweenTwoDates (firstDate: Date,
		secondDate: Date, publicHolidays: Array<PhDated|PhWeekOrDay>, phRulesFn: (arg0: PhDated | PhWeekOrDay, arg1: number) => number
	): number { //
		let days = 0;
		const unixPhTimes = new Set();
        
		// Build a unique set of the public holidays as unix times
		for (const ph in publicHolidays) {
			const phDate: PhDated|PhWeekOrDay = publicHolidays[ph];
			const adjustedDateAsTime = phRulesFn(phDate, Constants.CURRENT_YEAR);
			if (adjustedDateAsTime !== 0) unixPhTimes.add(adjustedDateAsTime);
		}

		for (let date = Utils.dateAsTime(firstDate) + Constants.DAY_MILLISECONDS; date < Utils.dateAsTime(secondDate); date += Constants.DAY_MILLISECONDS) {
			const dateToCheck = new Date(date);
			const dayToCheck = dateToCheck.getDay();
			if (dayToCheck > 0 && dayToCheck < 6 && !unixPhTimes.has(date)) days+=1;
		}

		return days;
	}
}