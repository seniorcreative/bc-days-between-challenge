import { Constants } from "../models/constants";
import { PhDated, PhType, PhWeekOrDay } from "../models/datesByState";

export const PhRulesFn = (publicHoliday: PhDated|PhWeekOrDay, year: number): number => {
		
	let offset = 0;
    
	switch (publicHoliday.type) {
	case PhType.MONDAY_IF_WEEKEND: {
		const ph = publicHoliday as PhDated;
		const date = new Date(year, ph.month - 1, ph.date);
		const day = date.getDay();
		if (day === 0) { offset = Constants.DAY_MILLISECONDS; }
		if (day === 6) { offset = Constants.DAY_MILLISECONDS * 2; }
		// TODO: Fix the issue here where there's a public holiday on the monday already 
		return date.getTime() + offset;
	}
	case PhType.MONTH_WEEK_DAY: {
		const ph = publicHoliday as PhWeekOrDay;
		const firstDayOfMonthDate = new Date(year, ph.month - 1, 1);
		const dayDiff = ph.day - firstDayOfMonthDate.getDay();
		if (dayDiff < 0) {
			// Day has already occured so we can't include this week as week 1 for it's first occurrence
			offset = dayDiff * Constants.DAY_MILLISECONDS + (ph.week * 7 * Constants.DAY_MILLISECONDS);
		} else {
			// Day has not yet occurred but is this week so include this week as week 1
			offset = dayDiff * Constants.DAY_MILLISECONDS + ((ph.week-1) * 7 * Constants.DAY_MILLISECONDS);
		}
		return firstDayOfMonthDate.getTime() + offset;
	}
	case PhType.ALWAYS_SAME_DATE: {
		const ph = publicHoliday as PhDated;
		const date = new Date(year, ph.month - 1, ph.date);
		return date.getTime();
	}
	default: {
		throw new Error("Type of public holiday not caught");
	}
	}
};
