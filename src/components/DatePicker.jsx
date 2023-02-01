import React, { useState } from 'react'
import { MONTH, WEEKDAY } from '../consts';
import { getDaysOfMonth } from '../utils';
import './DatePicker.css'

function DatePicker() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleChangeMonth = (num) => {
        setSelectedMonth(prev => Math.min(Math.max(prev + num, 0), 11))
    }

    const isDateSelected = (day) => {
        return (selectedDate.getFullYear() === +selectedYear)
            && (selectedDate.getMonth() === +selectedMonth)
            && (selectedDate.getDate() === +day)
    }
    return (
        <div className='datepicker'>
            <div className='header'>
                <div className='month'>
                    <button
                        disabled={selectedMonth <= 0}
                        onClick={() => handleChangeMonth(-1)}
                        className='btn-month'>&lt;</button>
                    <span>
                        <em>{MONTH[selectedMonth]}</em>&nbsp;&nbsp;
                        <select value={selectedYear}
                            onChange={event => setSelectedYear(+event.target.value)}>
                            {[...Array(15).keys()].map(item => {
                                const year = 2015 + item;
                                return (
                                    <option key={item} value={year}>{year}</option>
                                )
                            })}
                        </select>
                    </span>
                    <button
                        disabled={selectedMonth >= 11}
                        onClick={() => handleChangeMonth(1)}
                        className='btn-month'>&gt;</button>
                </div>
                <div className='weekday'>
                    {WEEKDAY.map((weekDay, index) => (
                        <span key={index}>{weekDay}</span>
                    ))}
                </div>
            </div>
            <hr />
            <div className='days'>
                {getDaysOfMonth(selectedYear, selectedMonth)
                    .map((day, index) => (
                        day ? (
                            <button
                                onClick={() => setSelectedDate(new Date(selectedYear, selectedMonth, day))}
                                key={index}
                                className={`btn-day ${isDateSelected(day) && 'active'}`}>
                                {day}
                            </button>) : (<div key={index}></div>)
                    ))}
            </div>
            <hr />
            <div className='selected-date'>
                selected date: &nbsp;
                <strong>
                    {`${selectedDate.getFullYear()} - 
                    ${selectedDate.getMonth().toString().padStart(2, 0)} -
                    ${selectedDate.getDate().toString().padStart(2, 0)}`}
                </strong>
            </div>
        </div>
    )
}

export default DatePicker
