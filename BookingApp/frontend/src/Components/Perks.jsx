import React from 'react'
import { BiWifi, BiTv, BiSolidParking, BiSolidCat, BiSolidDoorOpen } from "react-icons/bi"

const Perks = ({ selected, onChange }) => {
    function handleCheckClick(e) {
        const { checked, name } = e.target
        if (checked) {
            onChange([...selected, name])
        }
        else {
            onChange([...selected.filter(sn => sn !== name)])
        }
    }

    return (
        <div className='grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
            <label className='p-3 flex border rounded-xl gap-2 cursor-pointer items-center'>
                <input type="checkbox" checked={selected.includes('wifi')} name='wifi' onChange={handleCheckClick} />
                <BiWifi />
                <span>Wifi</span>
            </label>
            <label className='p-3 flex border rounded-xl gap-2 cursor-pointer items-center'>
                <input type="checkbox" checked={selected.includes('tv')} name='tv' onChange={handleCheckClick} />
                <BiTv />
                <span>TV</span>
            </label>
            <label className='p-3 flex border rounded-xl gap-2 cursor-pointer items-center'>
                <input type="checkbox" checked={selected.includes('park')} name='park' onChange={handleCheckClick} />
                <BiSolidParking />
                <span>Free Park Places</span>
            </label>
            <label className='p-3 flex border rounded-xl gap-2 cursor-pointer items-center'>
                <input type="checkbox" checked={selected.includes('pets')} name='pets' onChange={handleCheckClick} />
                <BiSolidCat />
                <span>Pets</span>
            </label>
            <label className='p-3 flex border rounded-xl gap-2 cursor-pointer items-center'>
                <input type="checkbox" checked={selected.includes('entrance')} name='entrance' onChange={handleCheckClick} />
                <BiSolidDoorOpen />
                <span>Private Entrance</span>
            </label>
        </div>
    )
}

export default Perks