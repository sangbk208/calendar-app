import {deleteNote, fetchNote} from './reminderNoteSlice'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNote, newNote } from './reminderNoteSlice';
import {convertDataInRedux, convertDate, convertTime, dateToStringInModal, uniqueID} from '../../../../common/customFunc';

interface Props{
    open?: Boolean, type?: string, onClose?: any, date?: any,
}

function ReminderModal({open, type, onClose, date}:Props) {
    const time = new Date();
    const dispatch = useDispatch();
    const [reminder, setReminder] = useState('');
    const [description, setDescription] = useState('');    
    const [timeInput, setTimeInput] = useState(convertTime(time));
    const notes = useSelector((state:any)=>state.reminderNote.notes);
    const note = useSelector((state:any)=>state.reminderNote.noteInDate);
    const [dateInput, setDateInput] = useState(dateToStringInModal(date,'date'));

    useEffect(()=>{
        const time = new Date();
        setDateInput(dateToStringInModal(date, 'date'));
        setTimeInput(convertTime(time));
    },[open, date]);
    
    useEffect(()=>{
        if(type==='EDIT'){
            setTimeInput(note.time);
            setReminder(note.title);
            setDescription(note.description);
        }
    },[note, type]);

    const handleOnChangeDate = (e:any)=>{
        setDateInput(e.target.value);        
    }

    const handleOnChangeTime = (e:any)=>{        
        setTimeInput(e.target.value);
    }

    const handleOnChangeReminder = (e:any)=>{
        const reminderSelect :any =document.getElementById("reminder");
        reminderSelect.style.border = '1px solid #d1d5da';  
        setReminder(e.target.value);
    }

    const handleOnChangeDescription = (e:any)=>{
        setDescription(e.target.value);
    }

    const handleReminderDelete = (item:any)=>{
        dispatch(deleteNote({date: convertDate(date),reminder:item}));
        resetState();
    }

    const resetState =()=>{
        setReminder('');
        setDescription('');
    }

    const handleOnSubmit =()=>{
        if(reminder===''){
            const reminderSelect :any =document.getElementById("reminder");
            reminderSelect.style.border = '1px solid #ef4444';
            return;
        }
        onClose();
        if (type==='EDIT' && notes[convertDate(date)].length>0 &&convertDate(date)===convertDataInRedux(dateInput)){
            dispatch(editNote({date: convertDataInRedux(dateInput),
                reminder:{ id: note.id, time: timeInput, title: reminder, description: description}}));
                // resetState();
                return;
        }
        dispatch(newNote({date: convertDataInRedux(dateInput), reminder: 
            { id:uniqueID(), time: timeInput, title: reminder, description: description,}}));
        resetState();
    }

    if (!open){
        return null
    }

    return (
        <div className="reminder-modal">
            {type==='EDIT' &&<div className='reminder-modal__list'>
                <div className="reminder-modal__list-header">
                    <span className="reminder-modal__title">
                            REMINDER LIST
                    </span>
                </div>
                <div className="reminder-modal__notes">
                    {Object.values(notes).length!==0? notes[convertDate(date)].map((item:any, index:number)=>(
                        <div key={index} className="reminder-modal__list-wrap">
                            <span className="reminder-note__title" onClick={()=>dispatch(fetchNote(item))}>{item.time +' - '+ item.title}</span>
                            <span className="reminder-modal__list-icon-delete" onClick={()=>handleReminderDelete(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                            </span>
                        </div>
                    )):''}
                </div>
            </div>}
            <div className="reminder-modal__content">
                <div className="reminder-modal__header">
                    <span className="reminder-modal__title">
                        {type} REMINDER
                    </span>
                    <span className="reminder-modal__icon" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </span>
                </div>
                <div className="reminder-modal__body">
                    <div className="reminder-modal__wrap">
                        <div className="reminder-modal__lable">
                            What do you want to remember?
                        </div>
                        <input onChange={handleOnChangeReminder} id='reminder' value={reminder}
                               className="reminder-modal__input reminder-modal__input--reminder" type='text'></input>
                    </div>
                    <div className="reminder-modal__wrap">
                        <div className="reminder-modal__lable">
                            Description of reminder?
                        </div>
                        <input onChange={handleOnChangeDescription} value={description}
                               className="reminder-modal__input reminder-modal__input--description" type='text'></input>
                    </div>
                    <div className="reminder-modal__wrap">
                        <div className="reminder-modal__lable">
                            When?
                        </div>
                        <input onChange={handleOnChangeDate} value={dateInput}
                               className="reminder-modal__input reminder-modal__input--date" type='date'></input>
                        <input onChange={handleOnChangeTime} value={timeInput}
                               className="reminder-modal__input reminder-modal__input--time" type='time'></input>
                    </div>
                    <div onClick={handleOnSubmit} className="reminder-modal__btn">{type}</div>
                </div>
                <div className="reminder-modal__footer"></div>
            </div>
        </div>
    );
}

export default ReminderModal;