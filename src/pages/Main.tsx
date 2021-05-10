import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Calendar from './calendar/Calendar';
import { fetchSelectedMonth } from './calendar/header/counterSlice';
import { fetchAllDays, fetchCurrentDate } from './calendar/calendarSlice';


function Main() {
    const dispatch = useDispatch();

    useEffect(()=>{
        const date = new Date();
        dispatch(fetchAllDays({month:date.getMonth(), year: date.getFullYear(),}));
        dispatch(fetchCurrentDate());
        dispatch(fetchSelectedMonth({month: date.getMonth(), year:date.getFullYear()}));
    },[dispatch]);

    return (
        <div>
            <Calendar/>
        </div>
    );
}

export default Main;