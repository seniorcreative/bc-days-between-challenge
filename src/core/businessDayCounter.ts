import { Utils } from "../common/utils";
import { phDated, phType, phWeekOrDay } from "../models/datesByState";
import { Constants } from "../models/constants";

export class BusinessDayCounter {
	WeekdaysBetweenTwoDates (firstDate: Date, secondDate: Date, publicHolidays: Date[]|undefined): number {
		let days = 0;
		for (let date = Utils.dateAsTime(firstDate) + Constants.DAY_MILLISECONDS; date < Utils.dateAsTime(secondDate); date += Constants.DAY_MILLISECONDS) {
			const day = new Date(date).getDay();
			if (day > 0 && day < 6) days+=1;
		}
		return days;
	}

	BusinessDaysBetweenTwoDates (firstDate: Date,
		secondDate: Date, publicHolidays: Date[]
	): number { // todo
		return this.WeekdaysBetweenTwoDates(firstDate, secondDate, publicHolidays);
	}
}

export class phRules {
	getAdjustedDate (publicHoliday: phDated|phWeekOrDay, year: number): number|undefined {
		
		let offset = 0;
        
		switch (publicHoliday.type) {
		case phType.MONDAY_IF_WEEKEND: {
			const ph = publicHoliday as phDated;
			const date = new Date(year, ph.month - 1, ph.date - 1);
			const day = date.getDay();
			if (day === 0) { offset = Constants.DAY_MILLISECONDS; }
			if (day === 6) { offset = Constants.DAY_MILLISECONDS * 2; }

			return date.getTime() + offset;
		}
		case phType.MONTH_WEEK_DAY: {
			const ph = publicHoliday as phWeekOrDay;
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
			throw new Error("Please specify a public holiday type");
		}
		}
	}
}
