import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import BookingDates from "../Components/BookingDates"
import { HiOutlineCreditCard} from "react-icons/hi2"


const OwnBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        })
    }, [])
    return (
        <div className=' pt-8'>
            {bookings?.length === 0 && (
                <div>Still no bookings are made</div>
            )}
            {bookings?.length > 0 && bookings.map(booking => (
                <Link key={booking._id} to={`/booking/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="w-48">
                        {booking.place.photos.length > 0 && (
                            <img className=' object-cover' src={"http://localhost:4000/uploads/" + booking.place.photos[0]} alt="show first one" />
                        )}
                    </div>
                    <div className="py-3 pr-3 grow">
                        <h2 className="text-xl">{booking.place.title}</h2>
                        <div className="text-xl">
                            <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
                            <div className="flex gap-1">
                                <HiOutlineCreditCard className='w-8 h-8'/>
                                <span className="text-2xl">
                                    Total price: ${booking.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default OwnBookingsPage