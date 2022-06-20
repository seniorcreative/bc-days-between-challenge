import { BusinessDayCounter, PhRules } from "./core/businessDayCounter";
import { DatesByState } from "./models/datesByState";

const app = new BusinessDayCounter();

const startDate: Date = new Date("10 Jun 2022");
const endDate: Date = new Date("17 Jun 2022");

console.log(`Days between: ${app.WeekdaysBetweenTwoDates(startDate, endDate)}`);
console.log(`Business Days between: ${app.BusinessDaysBetweenTwoDates(startDate, endDate, DatesByState.ALL, PhRules)}`);
