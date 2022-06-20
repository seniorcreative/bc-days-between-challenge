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

There's a phRules method which the `core/BusinessDayCounter.ts` class method accepts if public holiday data is passed to it.

## Assumptions
- We are not searching by specific state but there is an allowance for this in the data model (eg. Melbourne Cup Day is VIC only).

## Issues to be resolved
There's a bug with using the following monday for public holiday if a holiday falls on a weekend, when the monday might already be a holiday. For example if Xmas day falls on a sunday, and the monday boxing day is a public holiday already.

Using the current year to check against the public holidays when they are set to fall on the second tuesday in the month for example - this could be done more elegantly , being derived from the start date. But if the end date is a later year, we would need to increment that year.

## Some ideas for expansion
Accept node command line input with process.stdin for start and end date.
Allow for Easter Dates for example which change by year. Calculate when Easter is.

