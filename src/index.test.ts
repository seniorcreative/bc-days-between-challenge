import { BusinessDayCounter } from "./core/businessDayCounter";
import { RulesProvider } from "./core/rulesProvider";
import { DatesByState } from "./models/datesByState";

const app   = new BusinessDayCounter();
const dates = new DatesByState();
const rules = RulesProvider.getInstance();

describe("Scenario 1: test business day calculations", () => {
	it("should output the correct number of business days based on date", () => {
		const startDate = new Date("7 Oct 2013");
		const endDate = new Date("9 Oct 2013");
		expect(app.WeekdaysBetweenTwoDates(startDate, endDate)).toBe(1);
	});
});

describe("Scenario 2: test business day calculations", () => {
	it("should output the correct number of working days based on date", () => {
		const startDate = new Date("7 Oct 2013");
		const endDate = new Date("1 Jan 2014");
		expect(app.BusinessDaysBetweenTwoDates(startDate, endDate, dates.NATIONAL, rules)).toBe(59);
	});
});

describe("Scenario 2: test business day calculations", () => {
	it("should output the correct number of working days based on date", () => {
		const startDate = new Date("4 March 2013");
		const endDate = new Date("30 June 2013");
		expect(app.BusinessDaysBetweenTwoDates(startDate, endDate, [...dates.NATIONAL,...dates.NSW], rules)).toBe(82);
	});
});