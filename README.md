# Demo Calendar

Go to [https://andmaltes.github.io/demoCalendar/](https://andmaltes.github.io/demoCalendar/) to check the calendar demo.

## Features

Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.

Display reminders on the calendar view in the correct time order.

Allow the user to select color when creating a reminder and display it appropriately.

Ability to edit reminders – including changing text, city, day, time and color.

Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city.

Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.

![Unit Tests](docs/img/UnitTests.PNG)

## Even More Features

Expand the calendar to support more than the current month.

Properly handle overflow when multiple reminders appear on the same date.

Functionality to delete one or ALL the reminders for a specific day.

Redux used for the structure of the calendar.

### Bonus

Drag and Drop events!

## Some Screenshots

![Demo Calendar](docs/img/demoCalendar.PNG)

![Add Reminder](docs/img/AddReminder.PNG)

![Mobile](docs/img/Mobile.PNG)

## Constraints

For a correct weather forectast, a very limited list of destinations is Available.

When mergin with the backend, make sure the city autocomplete is fill with the correct name.refer to: [http://bulk.openweathermap.org/sample/](http://bulk.openweathermap.org/sample/)

Open Weather only allows the forecast of the three next days in its free version.

Internet Explorer 10+ Compatibility

## Installation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

### Dependencies

This Angular project uses the following dependencies:

- angular/animations 7.2.15
- angular/cdk 7.3.7
- angular/common 7.2.0
- angular/compiler 7.2.0
- angular/core 7.2.0
- angular/forms 7.2.0
- angular/material 7.3.7
- angular/platform-browser 7.2.0
- angular/platform-browser-dynamic 7.2.0
- angular/router 7.2.0
- bootstrap 4.3.1
- core-js 2.5.4
- hammerjs 2.0.8
- luxon 1.13.1
- mat-color-picker 1.4.3
- moment 2.24.0
- ng-pick-datetime 7.0.0
- ng-pick-datetime-moment 1.0.8
- ngx-color-picker 7.5.0
- ngx-material-timepicker 3.0.3
- redux 3.7.2
- rxjs 6.3.3
- tinycolor2 1.4.1
- tslib 1.9.0
- zone.js 0.8.26

### List of Files

    │   browserslist
    │   favicon.ico
    │   index.html
    │   karma.conf.js
    │   main.ts
    │   polyfills.ts
    │   styles.scss
    │   test.ts
    │   tree.txt
    │   tsconfig.app.json
    │   tsconfig.spec.json
    │   tslint.json
    │
    ├───app
    │   │   app.component.html
    │   │   app.component.scss
    │   │   app.component.spec.ts
    │   │   app.component.ts
    │   │   app.module.ts
    │   │
    │   ├───components
    │   │   ├───calendar
    │   │   │       calendar.component.html
    │   │   │       calendar.component.scss
    │   │   │       calendar.component.spec.ts
    │   │   │       calendar.component.ts
    │   │   │
    │   │   └───dialogs
    │   │       └───reminder
    │   │               reminder.component.html
    │   │               reminder.component.scss
    │   │               reminder.component.spec.ts
    │   │               reminder.component.ts
    │   │
    │   ├───pipes
    │   │       calendarformat.ts
    │   │
    │   └───services
    │           weather-forecast.service.spec.ts
    │           weather-forecast.service.ts
    │
    ├───assets
    │       .gitkeep
    │
    ├───environments
    │       environment.prod.ts
    │       environment.ts
    │
    ├───interfaces
    │       forecast.ts
    │
    └───redux
            actions.ts
            interface.ts
            reducer.ts

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Dependencies

Remember that node_modules is not present in this project. Run `npm install` before using this repository.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
