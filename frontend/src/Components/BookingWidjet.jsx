import React from 'react'
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const BookingWidjet = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate()
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  }, [user])

  let numberOfNights = 0
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  }

  const currentDate = new Date().toISOString().split('T')[0]

  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn, checkOut, numberOfGuests, name, phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id
    if (bookingId) {
      navigate("/Booking/" + bookingId)
    }
  }

  return (
    <div className="bg-white flex flex-col shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input type="date"
              value={checkIn}
              min={currentDate}
              onChange={ev => setCheckIn(ev.target.value)} className=' border rounded-2xl p-1' />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input type="date" value={checkOut}
              min={currentDate}
              onChange={ev => setCheckOut(ev.target.value)} className=' border rounded-2xl p-1' />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input type="number"
            value={numberOfGuests}
            onChange={ev => setNumberOfGuests(ev.target.value)} />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
              value={name}
              onChange={ev => setName(ev.target.value)} />
            <label>Phone number:</label>
            <input type="tel"
              value={phone}
              onChange={ev => setPhone(ev.target.value)} />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className=" primary my-4 p-2">
        Book this place for
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  )
}

export default BookingWidjet