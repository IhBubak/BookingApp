import React, { useEffect, useState } from 'react'
import { BiBookAdd } from "react-icons/bi"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import PlacesFormPage from './PlacesFormPage'

const PlacesPage = () => {
    const { action } = useParams()
    const [places, setPlaces] = useState([])

    useEffect(() => {
        if (action === undefined) {
            axios.get("/places").then(({ data }) => {
                setPlaces(data)
            }).catch(er => console.log(er))
        }
    }, [action])

    return (
        <div>
            {action === undefined && (
                <div className='flex flex-col items-center justify-center mt-8 text-center max-w-lg mx-auto gap-2'>
                    <Link to={"/account/places/new"} className='flex items-center justify-center w-1/2 p-1 my-2 gap-1 bg-rose-600 text-white rounded-full'><BiBookAdd className=' text-xl' />Add new place</Link>
                    My Places
                    <div className=''>
                        {places.length > 0 && places.map(place => (
                            <Link to={"/account/places/" + place._id} className='flex bg-stone-400 w-full p-4 m-2 gap-4 rounded-2xl' key={place._id}>
                                <div className='w-[150px] h-[150px] shrink-0 grow'>
                                    {place.photos.length > 0 && (
                                        <img className=' object-cover' src={"http://localhost:4000/uploads/" + place.photos[0]} alt="show first one" />
                                    )}
                                </div>
                                <div className='grow-0 shrink'>
                                    <h4 className=''>
                                        {place.title}
                                    </h4>
                                    <p className='mt-2 '>
                                        {place.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            )}
            {action !== undefined && (
                <PlacesFormPage />
            )}
        </div>
    )
}

export default PlacesPage