import './calendar-container.scss';

const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function RenderWeekDays() {
    return (
        <div className="render-weekdays">
            {weekdays.map((value) => (
                <div key={value} className='render-weekdays__day'>
                    {value}
                </div>
            ))}
        </div>
    );
}

export default RenderWeekDays;