import { BusinessDayCounter } from "./core/businessDayCounter";
import { RulesProvider } from "./core/rulesProvider";
import { DatesByState } from "./models/datesByState";

const app   = new BusinessDayCounter();
const dates = new DatesByState();
const rules = RulesProvider.getInstance();

const weekDays : Array<Array<Date>> = [
	[new Date("7 Oct 2013"), new Date("9 Oct 2013")],
	[new Date("5 Oct 2013"), new Date("14 Oct 2013")],
	[new Date("7 Oct 2013"), new Date("1 Jan 2014")],
	[new Date("7 Oct 2013"), new Date("5 Oct 2013")]
];

for (const date in weekDays) {
	const startDate = weekDays[date][0];
	const endDate = weekDays[date][1];
	const startDateShort = startDate.toLocaleDateString("en-AU");
	const endDateShort =endDate.toLocaleDateString("en-AU");
	console.log(`Working days between ${startDateShort} and ${endDateShort}: ${app.WeekdaysBetweenTwoDates(startDate, endDate)}`);
}

const businessDays : Array<Array<Date>> = [
	[new Date("7 Oct 2013"), new Date("9 Oct 2013")],
	[new Date("24 Dec 2013"), new Date("27 Dec 2013")],
	[new Date("7 Oct 2013"), new Date("1 Jan 2014")],
];

for (const date in businessDays) {
	const startDate = businessDays[date][0];
	const endDate = businessDays[date][1];
	const startDateShort = startDate.toLocaleDateString("en-AU");
	const endDateShort =endDate.toLocaleDateString("en-AU");
	console.log(`Business days between ${startDateShort} and ${endDateShort} : ${app.BusinessDaysBetweenTwoDates(startDate, endDate, dates.ALL, rules)}`);
}