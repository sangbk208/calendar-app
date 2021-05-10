import { useState } from 'react';
import './calendar-container.scss';
import ReminderNote from './reminders/ReminderNote';
import { fetchSelectedDate } from '../calendarSlice';
import ReminderModal from './reminders/ReminderModal';
import { useDispatch, useSelector } from 'react-redux';
import { convertDate } from '../../../common/customFunc';

function RenderDates() {
    const allDaysInMonth = useSelector((state: any) => state.calendar.allDaysInMonth);
    const currentDate = useSelector((state: any) => state.calendar.currentDate);
    const notes = useSelector((state:any)=>state.reminderNote.notes);
    const [open, setOpen] = useState(false);
    const [dateClick, setDateClick] = useState('dataIsNull');
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOnclickModal = (item:any) =>{
        setDateClick(item);
        dispatch(fetchSelectedDate(item));
        handleOpen();
    }

    return (
        <div className='render-dates'>
                {allDaysInMonth.map((item:any) => (
                    <div key={item.date + item.monthPosition} 
                            className={`render-dates__wrap ${item.date===currentDate.date && item.month===currentDate.month && item.year===currentDate.year && 'render-dates__wrap-active'}`}>
                        <span className={`render-dates__date
                                            ${item.monthPosition!=='current month' && 'render-dates__date-dmonth'}
                                        `}
                        >
                            {item.date}
                            <span onClick={()=>handleOnclickModal(item)} className="render-dates__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
                            </span>
                        </span>
                        <ReminderNote date={item} note={notes[convertDate(item)]}/>
                    </div>
                ))}
                {typeof(dateClick)!== 'string' && <ReminderModal date={dateClick} type='ADD' open={open} onClose={handleClose}/>}
        </div>
    );
}

export default RenderDates;