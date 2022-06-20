import { BusinessDayCounter } from "./core/businessDayCounter";
import { PhRulesFn } from "./core/phRules";
import { DatesByState } from "./models/datesByState";

const app = new BusinessDayCounter();

const startDate: Date = new Date("20 Dec 2022");
const endDate: Date = new Date("28 Dec 2022");
if (startDate >= endDate) throw new Error("Start date needs to be before end date");
const startDateShort = startDate.toLocaleDateString("en-AU");
const endDateShort = endDate.toLocaleDateString("en-AU");

console.log(`Working days between ${startDateShort} and ${endDateShort}: ${app.WeekdaysBetweenTwoDates(startDate, endDate)}`);
console.log(`Business days between ${startDateShort} and ${endDateShort} : ${app.BusinessDaysBetweenTwoDates(startDate, endDate, DatesByState.ALL, PhRulesFn)}`);
