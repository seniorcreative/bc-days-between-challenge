import { Utils } from "../common/utils";
import { Constants } from "../models/constants";
import { PhDated, PhType, PhWeekOrDay } from "../models/datesByState";

export class BusinessDayCounter {
	WeekdaysBetweenTwoDates (firstDate: Date, secondDate: Date): number {
		let days = 0;
		for (let date = Utils.dateAsTime(firstDate) + Constants.DAY_MILLISECONDS; date < Utils.dateAsTime(secondDate); date += Constants.DAY_MILLISECONDS) {
			const day = new Date(date).getDay();
			if (day > 0 && day < 6) days+=1;
		}
		return days;
	}

	BusinessDaysBetweenTwoDates (firstDate: Date,
		secondDate: Date, publicHolidays: PhDated[]|PhWeekOrDay[], phRulesFn: (arg0: PhDated | PhWeekOrDay, arg1: number) => number
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

export const PhRulesFn = (publicHoliday: PhDated|PhWeekOrDay, year: number): number|undefined => {
		
	let offset = 0;
    
	switch (publicHoliday.type) {
	case PhType.MONDAY_IF_WEEKEND: {
		const ph = publicHoliday as PhDated;
		const date = new Date(year, ph.month - 1, ph.date - 1);
		const day = date.getDay();
		if (day === 0) { offset = Constants.DAY_MILLISECONDS; }
		if (day === 6) { offset = Constants.DAY_MILLISECONDS * 2; }

		return date.getTime() + offset;
	}
	case PhType.MONTH_WEEK_DAY: {
		const ph = publicHoliday as PhWeekOrDay;
		const firstDayOfMonthDate = new Date(year, ph.month - 1, 1);
		const dayDiff = ph.day - firstDayOfMonthDate.getDay();
		if (dayDiff < 0) {
			// Day has already occured so we can't include this week
			offset = dayDiff * Constants.DAY_MILLISECONDS + (ph.week * 7 * Constants.DAY_MILLISECONDS);
		} else {
			// Day has not yet occurred but is this week so include it
			offset = dayDiff * Constants.DAY_MILLISECONDS + ((ph.week-1) * 7 * Constants.DAY_MILLISECONDS);
		}

		return firstDayOfMonthDate.getTime() + offset;
	}
	default: {
		// throw new Error("Please specify a public holiday type");
		return 0;
	}
	}
};
