import { BusinessDayCounter } from "./core/businessDayCounter";
import { RulesProvider } from "./core/rulesProvider";
import { DatesByState } from "./models/datesByState";

const app   = new BusinessDayCounter();
const dates = new DatesByState();
const rules = RulesProvider.getInstance();

describe("Scenario 1: test business day calculations", () => {
	it("should output the correct number of business days based on date", () => {
		const dateRanges : Array<Array<Date>> = [
			[new Date("7 Oct 2013"), new Date("9 Oct 2013")],
			[new Date("5 Oct 2013"), new Date("14 Oct 2013")],
			[new Date("7 Oct 2013"), new Date("1 Jan 2014")],
		];
		expect(app.WeekdaysBetweenTwoDates(dateRanges[0][0], dateRanges[0][1])).toBe(1);
		expect(app.WeekdaysBetweenTwoDates(dateRanges[1][0], dateRanges[1][1])).toBe(5);
		expect(app.WeekdaysBetweenTwoDates(dateRanges[2][0], dateRanges[2][1])).toBe(61);
	});
	it("should return zero for a startDate equal to or later than the endDate", () => {
		expect(app.WeekdaysBetweenTwoDates(new Date("7 Oct 2013"), new Date("5 Oct 2013"))).toBe(0);
	});
});

describe("Scenario 2: test business day calculations", () => {
	it("should output the correct number of working days based on date", () => {

		const dateRanges : Array<Array<Date>> = [
			[new Date("7 Oct 2013"), new Date("9 Oct 2013")],
			[new Date("24 Dec 2013"), new Date("27 Dec 2013")],
			[new Date("7 Oct 2013"), new Date("1 Jan 2014")],
		];
		expect(app.BusinessDaysBetweenTwoDates(dateRanges[0][0], dateRanges[0][1], dates.NATIONAL, rules)).toBe(1);
		expect(app.BusinessDaysBetweenTwoDates(dateRanges[1][0], dateRanges[1][1], dates.NATIONAL, rules)).toBe(0);
		expect(app.BusinessDaysBetweenTwoDates(dateRanges[2][0], dateRanges[2][1], dates.NATIONAL, rules)).toBe(59);

	});
});

describe("Scenario 3: test business day calculations for custom holiday types", () => {
	it("should output the correct number of working days based on custom holiday rules", () => {
		const startDate = new Date("4 March 2013");
		const endDate = new Date("30 June 2013");
		expect(app.BusinessDaysBetweenTwoDates(startDate, endDate, [...dates.NATIONAL,...dates.NSW], rules)).toBe(82.5);
	});
});