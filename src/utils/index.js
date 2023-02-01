import { WEEKDAY } from "../consts";

export function getNumberDaysOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function getDaysOfMonth(year, month) {
    const firstWeekDayOfMonth = new Date(year, month, 1).getDay();
    const numberDaysOfMonth = getNumberDaysOfMonth(year, month);
    let dayIndex = 1;
    const fullMonth = [];
    [...Array(WEEKDAY.length * 6).keys()].forEach((item) => {
        if (item >= firstWeekDayOfMonth &&
            item < numberDaysOfMonth + firstWeekDayOfMonth) {
            fullMonth[item] = dayIndex++;
        } else {
            fullMonth[item] = null;
        }

    })
    return fullMonth;
}