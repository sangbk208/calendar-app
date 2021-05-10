import './calendar-container.scss';
import RenderDates from './RenderDates';
import RenderWeekDays from './RenderWeekDays';


function CalendarViewContainer() {
    return (
        <div className='calendar-container'>
            <RenderWeekDays/>
            <RenderDates/>
        </div>
    );
}

export default CalendarViewContainer;