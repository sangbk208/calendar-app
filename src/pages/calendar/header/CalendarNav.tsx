import './calendar-header.scss';
import { useEffect, useState } from 'react';
import { fetchAllDays } from '../calendarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { dateToStringInModal } from '../../../common/customFunc';
import { decrement, fetchSelectedMonth, increment } from './counterSlice';

function CalenderNav() {
    const selectedMonth = useSelector((state: any) => state.counter.selectedMonth);    
    const [monthYear, setMonthYear] = useState('1998-08');
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllDays({month:selectedMonth.month, year: selectedMonth.year}));
        setMonthYear(dateToStringInModal(selectedMonth,'month'));
    },[selectedMonth, dispatch]);

    const previousMonth = ()=>{
        dispatch(decrement());
    }    

    const nextMonth = ()=>{
        dispatch(increment());
    }    

    const handleOnChange = (e:any)=>{
        const value = e.target.value;
        setMonthYear(value);
        dispatch(fetchSelectedMonth({month:Number(value.split('-')[1]-1),year:Number(value.split('-')[0])}));
    }

    return (
        <div className='calendar-nav'>
            <div onClick={previousMonth} className='calendar-nav__btn'>Previous</div>
            <input onChange={handleOnChange} className='calendar-nav__input' type="month" name="bday-month" value={monthYear}></input>
            {/* <p className='calendar-nav__current-month'>{`${months[selectedMonth.month]} ${selectedMonth.year}`}</p> */}
            <div onClick={nextMonth} className='calendar-nav__btn'>Next</div>
        </div>
    );
}

export default CalenderNav;