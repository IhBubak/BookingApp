import React from 'react'
import { differenceInCalendarDays, format } from "date-fns"
import { MdOutlineNightlightRound, MdOutlineCalendarMonth} from "react-icons/md"

const BookingDates = ({ booking, className }) => {
    return (
        <div className={"flex gap-1 " + className}>
            <MdOutlineNightlightRound className=" w-6 h-6"/>
            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights:
            <div className="flex gap-1 items-center ml-2">
                <MdOutlineCalendarMonth className='w-6 h-6'/>
                {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
            </div>
            &rarr;
            <div className="flex gap-1 items-center">
                <MdOutlineCalendarMonth className=' w-6 h-6'/>
                {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
            </div>
        </div>
    )
}

export default BookingDates