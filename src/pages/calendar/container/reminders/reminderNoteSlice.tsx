import { createSlice } from '@reduxjs/toolkit';
import {getIndex} from '../../../../common/customFunc';

export const reminderNote = createSlice({
    name: 'reminderNote',
    initialState : { notes:{} , noteInDate:{}},
    reducers:{
        fetchNote: (state:any, action) =>{
            const note = action.payload;
            state.noteInDate = note;
        },
        newNote: (state:any, action) =>{
            const {date, reminder} = action.payload;
            state.notes.hasOwnProperty(date)
                ?state.notes[date].push(reminder)
                :state.notes={...state.notes, ...{[date]:[reminder]}};
        },
        editNote: (state:any, action) =>{
            const {date, reminder} = action.payload;
            state.notes[date][getIndex(state.notes[date], reminder.id)] = reminder;            
        },
        deleteNote: (state:any, action) =>{
            const {date, reminder} = action.payload;
            state.notes[date].splice(getIndex(state.notes[date], reminder.id), 1);
        }
    }
});

const {reducer, actions} = reminderNote;

export const {newNote, editNote, deleteNote, fetchNote} = actions;
export default reducer;