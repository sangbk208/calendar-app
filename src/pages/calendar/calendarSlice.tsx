import { createSlice } from '@reduxjs/toolkit';

const getDaysInMonth = (month:number, year:number) => {
    const date = new Date(year, month, 1);
    const days = [];
    const addArray = (day:any, position:string) =>{
        return{
            date: day.getDate(),
            day: day.getDay(),
            month: day.getMonth(),
            year: day.getFullYear(),
            monthPosition: position,
        }
    }
    while (date.getMonth() === month) {
        days.push(addArray(new Date(date), 'current month'));
        date.setDate(date.getDate() + 1);
    }    
    const lastDay = days[days.length-1].day;
    for(let i=1; i<7-lastDay; i++){
        days.push(addArray(new Date(date), 'next month'));
        date.setDate(date.getDate() + 1);
    }
    const leng = days[0].day;
    const firstDay = new Date(year, month, 1);
    for(let i=0; i<leng; i++){
        firstDay.setDate(firstDay.getDate() - 1);
        days.unshift(addArray(new Date(firstDay), 'previous month'));
    }
    return days;
  }

export const calendar = createSlice({
    name: 'calendar',
    initialState : {
        currentDate: {},
        allDaysInMonth: [],
        selectedDate:{},
},
    reducers:{
        fetchSelectedDate: (state:any, action) =>{
            const date = action.payload;
            state.selectedDate = date;
        },
        fetchAllDays: (state:any, action) =>{
            const {month, year} = action.payload;
            state.allDaysInMonth = getDaysInMonth(month, year);
        },
        fetchCurrentDate: (state:any) =>{
            const today = new Date();
            state.currentDate = {
                date: today.getDate(),
                day : today.getDay(),
                month: today.getMonth(),
                year : today.getFullYear(),
            };
        },
    }
});

const {reducer, actions} = calendar;

export const {fetchAllDays, fetchCurrentDate, fetchSelectedDate} = actions;
export default reducer;