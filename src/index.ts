import { BusinessDayCounter } from "./core/businessDayCounter";

const app = new BusinessDayCounter();

const startDate: Date = new Date("20 Jun 2022");
const endDate: Date = new Date("24 Jun 2022");

console.log(`Days between: ${app.WeekdaysBetweenTwoDates(startDate, endDate)}`);
