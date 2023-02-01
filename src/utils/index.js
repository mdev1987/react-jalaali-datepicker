import jalaali from 'jalaali-js'
import { SHAMSI_WEEKDAY_SORT, WEEKDAY } from "../consts";

console.log(jalaali.jalaaliWeek(1400, 4, 3))

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


export const getJalaaliNumberOfDays = (year, month) => {
    return jalaali.jalaaliMonthLength(year, month);
}

export const getJalaaliMonthDays = (year, month) => {
    const date = jalaali.jalaaliToDateObject(year, month, 1);
    const firstDayOfWeek = SHAMSI_WEEKDAY_SORT.indexOf(new Intl.DateTimeFormat('en-US-u-ca-persian', { weekday: 'short' }).format(date));
    const numberDaysOfMonth = getJalaaliNumberOfDays(year, month);
    let dayIndex = 1;
    const fullMonth = [];
    [...Array(SHAMSI_WEEKDAY_SORT.length * 6).keys()].forEach(item => {
        if (item >= firstDayOfWeek && item < numberDaysOfMonth + firstDayOfWeek) {
            fullMonth[item] = dayIndex++;
        } else {
            fullMonth[item] = null;
        }
    })

    return fullMonth;
}

// const toEnglishDigits = (number) => {
//     const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
//     return +(String(number).replace(/[۰-۹]/g, char => persian.indexOf(char)))
// };

export const toPersianDigits = (number) => {
    const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return (String(number).replace(/[0-9]/g, char => persian[+char]))
}