## Brandcrowd date challenge
Checks the number of working days in between two dates.

## Prerequisites

- Install [Node.js 16+](https://nodejs.dev/).

## Quick Start

```sh
# Install dependencies.
npm ci

# Build the app.
npm run build

# Start the app.
npm run start
```

## Testing

```sh
# Run unit tests.
npm run test
```

## Linting
```sh
# Run linting
npm run lint
```

## Methodology
There's a dates model see `models/datesByState.ts`.
There's a rulesProvider singleton which the `core/BusinessDayCounter.ts` method `BusinessDaysBetweenTwoDates` accepts if public holiday data is passed to it.

## Assumptions
There is an allowance for AU state only in the data model (eg. Melbourne Cup Day is VIC only).

## Issues to be resolved
There's a potential bug with using the following monday for public holiday if a holiday falls on a weekend, when the monday might already be a holiday. For example if Christmas day falls on a sunday, and the monday (Boxing day) is a public holiday already.

## Some ideas for expansion
Accept node command line input with process.stdin for start and end date.
Allow for Easter Dates for example which change by year. Calculate when Easter is.

