import './reminder-note.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReminderModal from './ReminderModal';
import {fetchNote} from './reminderNoteSlice'

interface Props{
    date: any,
    note: any,
}
function ReminderNote({date, note}:Props) {    
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };
  
    const handleOnClickNote=(note:any, index:number)=>{
        handleOpen();
        if (index === 3){
            dispatch(fetchNote({}));
            return;
        }
        dispatch(fetchNote(note));
    }
    return (
        <div className='reminder-note'>
            {note && note.slice(0, 4).map((item:any, index:number)=>(
                <div key={index} onClick={()=>handleOnClickNote(item, index)} className='reminder-note__wrap'>
                    {<span className='reminder-note__title'>{index<3?item.time +' - '+ item.title:'...'}</span>}
                </div>
            ))}
            {open && <ReminderModal date={date} type='EDIT' open={open} onClose={handleClose}/>}
        </div>
    );
}

export default ReminderNote;