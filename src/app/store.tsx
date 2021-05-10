import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../pages/calendar/calendarSlice';
import counterReducer from '../pages/calendar/header/counterSlice'
import reminderNoteReducer from '../pages/calendar/container/reminders/reminderNoteSlice';

const store = configureStore({
    reducer:{
        calendar: calendarReducer,
        counter: counterReducer,
        reminderNote: reminderNoteReducer,
    },
});

export default store;