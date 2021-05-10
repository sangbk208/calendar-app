import React from 'react';
import { useSelector } from 'react-redux';

function CalenderLabel() {
    const selectedDate = useSelector((state: any) => state.counter.dateSelected);

    return (
        <div>
            <span>{selectedDate.month} </span>
            <span>{selectedDate.year}</span>
        </div>
    );
}

export default CalenderLabel;