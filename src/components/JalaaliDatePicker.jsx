import './DatePicker.css'
import { SHAMSI_WEEKDAY, SHAMSI_MONTH, } from '../consts/index'
import { useState } from 'react'
import jalaali from 'jalaali-js'
import { getJalaaliMonthDays, toPersianDigits } from '../utils'

const jDate = jalaali.toJalaali(new Date());
function JalaaliDatePicker() {
    const [selectedDate, setSelectedDate] = useState(jDate);
    const [selectedYear, setSelectedYear] = useState(jDate.jy)
    const [selectedMonth, setSelectedMonth] = useState(jDate.jm)

    const handleChangeMonth = (num) => {
        setSelectedMonth(prev => Math.min(Math.max(prev + num, 1), 12))
    }

    const isDateSelected = (day) => {
        return (selectedDate.jy === +selectedYear)
            && (selectedDate.jm === +selectedMonth)
            && (selectedDate.jd === +day)
    }
    return (
        <div className='datepicker'>
            <div className='header'>
                <div className='month'>
                    <button
                        disabled={selectedMonth >= 12}
                        onClick={() => handleChangeMonth(1)}
                        className='btn-month'>&lt;</button>
                    <span className='rtl'>
                        {SHAMSI_MONTH[selectedMonth - 1]}&nbsp;&nbsp;
                        <select value={selectedYear}
                            onChange={event => setSelectedYear(+event.target.value)}>
                            {[...Array(15).keys()].map(item => {
                                const year = 1395 + item;
                                return (
                                    <option key={item} value={year}>{toPersianDigits(year)}</option>
                                )
                            })}
                        </select>
                    </span>
                    <button
                        disabled={selectedMonth <= 1}
                        onClick={() => handleChangeMonth(-1)}
                        className='btn-month'>&gt;</button>
                </div>
                <div className='weekday rtl'>
                    {SHAMSI_WEEKDAY.map((weekDay, index) => (
                        <span key={index}>{weekDay}</span>
                    ))}
                </div>
            </div>
            <hr />
            <div className='days rtl'>
                {getJalaaliMonthDays(selectedYear, selectedMonth)
                    .map((day, index) => (
                        day ? (
                            <button
                                onClick={() => {
                                    const gDate = jalaali.toGregorian(selectedYear, selectedMonth, day)
                                    setSelectedDate(jalaali.toJalaali(gDate.gy, gDate.gm, gDate.gd))
                                }}
                                key={index}
                                className={`btn-day ${isDateSelected(day) && 'active'}`}
                            >
                                {toPersianDigits(day)}
                            </button>) : (<div key={index}></div>)
                    ))}
            </div>
            <hr />
            <div className='selected-date'>
                selected date: &nbsp;
                <strong>
                    {`${toPersianDigits(selectedDate.jy)} - 
                    ${toPersianDigits(selectedDate.jm.toString().padStart(2, 0))} -
                    ${toPersianDigits(selectedDate.jd.toString().padStart(2, 0))}`}
                </strong>
            </div>
        </div>
    )
}



export default JalaaliDatePicker