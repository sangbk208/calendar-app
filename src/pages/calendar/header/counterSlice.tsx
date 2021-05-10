import { createSlice } from '@reduxjs/toolkit';

export const counter = createSlice({
    name: 'counter',
    initialState : { selectedMonth: {month:8, year:1998}, },
    reducers:{
        fetchSelectedMonth: (state:any, action) =>{
            const date = action.payload;
            state.selectedMonth = {
                month: date.month,
                year : date.year,
            };
        },
        increment: (state:any) =>{
            const date = new Date(state.selectedMonth.year, state.selectedMonth.month, 1);
            date.setMonth(date.getMonth() + 1);
            const newDate = new Date(date);
            state.selectedMonth = {month: newDate.getMonth(), year : newDate.getFullYear(),}
        },
        decrement: (state:any) =>{
            const date = new Date(state.selectedMonth.year, state.selectedMonth.month, 1);
            date.setMonth(date.getMonth() - 1);
            const newDate = new Date(date);
            state.selectedMonth = {month: newDate.getMonth(), year : newDate.getFullYear(),}
        },
    }
});

const {reducer, actions} = counter;

export const {fetchSelectedMonth, increment, decrement} = actions;
export default reducer;