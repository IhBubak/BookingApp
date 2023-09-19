import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import Perks from '../Components/Perks'
import { useNavigate } from "react-router-dom"
import PhotosUploader from '../Components/PhotosUploader'

const PlacesFormPage = () => {

    const { action } = useParams()
    const [title, setTitle] = useState("")
    const [adress, setAdress] = useState("")
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState("")
    const [perks, setPerks] = useState([])
    const [extraInfos, setExtraInfos] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const navigate = useNavigate()

    useEffect(() => {
        if (action === "new" || action === undefined) {
            return
        }
        axios.get('/places/' + action).then(response => {
            const { data } = response
            setTitle(data.title)
            setAdress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfos(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    }, [action])

    async function savePlace(e) {
        e.preventDefault()
        if (action === "new") {
            const placeData = { title, adress, addedPhotos, description, perks, extraInfos, checkIn, checkOut, maxGuests, price }
            const { data } = await axios.post("/places", placeData)
            if (data) {
                navigate("/account/places")
            }
        } else {
            const placeData = { title, adress, addedPhotos, description, perks, extraInfos, checkIn, checkOut, maxGuests, price }
            const { data } = await axios.put("/places/" + action, placeData)
            if (data) {
                navigate("/account/places")
            }
        }
    }

    return (
        <div>
            <form onSubmit={savePlace}>
                <h2 className=' text-xl mt-4 mb-1'>Title</h2>
                <input type="text" placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
                <h2 className=' text-xl mt-4 mb-1'>Adress</h2>
                <input type="text" placeholder='adress' value={adress} onChange={e => setAdress(e.target.value)} />
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                <h2 className=' text-xl mt-4 mb-1'>Description</h2>
                <textarea placeholder='write a description of your place...' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <h2 className=' text-xl mt-4 mb-1'>Perks</h2>
                <Perks selected={perks} onChange={setPerks} />
                <h2 className=' text-xl mt-4 mb-1'>Extra Infos</h2>
                <textarea placeholder='for more spezifications, wishes... for your place...' value={extraInfos} onChange={e => setExtraInfos(e.target.value)}></textarea>
                <h2 className=' text-xl mt-4 mb-1'>Add check In and Out</h2>
                <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h4 className='mt-2 -mb-1'>Check in time</h4>
                        <input type="text" placeholder='14' value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div>
                        <h4 className='mt-2 -mb-1'>Check out time</h4>
                        <input type="text" placeholder='11' value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>
                    <div>
                        <h4 className='mt-2 -mb-1'>Max Number of Guests</h4>
                        <input type="number" placeholder='' value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                    </div>
                    <div>
                        <h4 className='mt-2 -mb-1'>Price</h4>
                        <input type="number" placeholder='' value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className='w-1/2 my-4 p-1 text-xl'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage