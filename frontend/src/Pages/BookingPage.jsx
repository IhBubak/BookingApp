import React from 'react'
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import PlaceGallery from "../Components/PlaceGallery"
import BookingDates from "../Components/BookingDates"

const BookingPage = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id])

    if (!booking) {
        return(
            <div>Booking does not exist</div>
        )
    }
    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <Link to={"https://maps.google.com/?q=" + booking.place.address} className="my-2 block">{booking.place.address}</Link>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}

export default BookingPage