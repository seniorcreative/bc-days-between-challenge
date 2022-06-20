import { Utils } from "../common/utils";
import { Constants } from "../models/constants";
import { PhDated, PhWeekOrDay } from "../models/dateTypes";
import { RulesProvider } from "./rulesProvider";

export class BusinessDayCounter {
	public WeekdaysBetweenTwoDates (firstDate: Date, secondDate: Date): number {
		if (secondDate <= firstDate) return 0;
		let days = 0;
		for (let date = Utils.dateAsTime(firstDate) + Constants.DAY_MILLISECONDS; date < Utils.dateAsTime(secondDate); date += Constants.DAY_MILLISECONDS) {
			const day = new Date(date).getDay();
			if (day > 0 && day < 6) days+=1;
		}
		return days;
	}

	public BusinessDaysBetweenTwoDates (firstDate: Date,
		secondDate: Date, publicHolidays: Array<PhDated|PhWeekOrDay>, rules: RulesProvider
	): number { //
		if (secondDate <= firstDate) return 0;
		let days = 0;
		const localeDates = new Set();
        
		// Build a unique set of the public holidays as unix times
		for (const ph in publicHolidays) {
			const phDate: PhDated|PhWeekOrDay = publicHolidays[ph];
			const adjustedDateAsTime = rules.publicHolidays(phDate);
			localeDates.add(adjustedDateAsTime);
		}

		for (let date = Utils.dateAsTime(firstDate) + Constants.DAY_MILLISECONDS; date < Utils.dateAsTime(secondDate); date += Constants.DAY_MILLISECONDS) {
			const dateToCheck = new Date(date);
			const dayToCheck = dateToCheck.getDay();
			if (dayToCheck > 0 && dayToCheck < 6 && !localeDates.has(new Date(date).toLocaleDateString(Constants.LOCALE))) days+=1;
		}

		return days;
	}
}