import { Utils } from "../common/utils";
import { Constants } from "../models/constants";
import { PhDated, PhWeekOrDay, LocalePublicHoliday } from "../models/dateTypes";
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
		const localeFullDays = [];
		const localeHalfDays = [];
        
		// Build a unique set of the public holidays as unix times
		for (const ph in publicHolidays) {
			const phDate: PhDated|PhWeekOrDay = publicHolidays[ph];
			const localeDate: LocalePublicHoliday = rules.publicHolidays(phDate);
			// console.log(JSON.stringify(localeDate.date));
			localeFullDays.push(localeDate.date);
			if (!localeDate.fullDay) localeHalfDays.push(localeDate.date);
		
		}


		for (let date = Utils.dateAsTime(firstDate) + Constants.DAY_MILLISECONDS; date < Utils.dateAsTime(secondDate); date += Constants.DAY_MILLISECONDS) {
			const dateToCheck = new Date(date);
			const dayToCheck = dateToCheck.getDay();
			const convertedDate = new Date(date).toLocaleDateString(Constants.LOCALE);
			if (dayToCheck > 0 && dayToCheck < 6) {
				if (localeFullDays.indexOf(convertedDate) === -1) {
					days+=1;
				}
				if (localeHalfDays.indexOf(convertedDate) !== -1) {
					days+=0.5;
				}
			}
		}

		return days;
	}
}