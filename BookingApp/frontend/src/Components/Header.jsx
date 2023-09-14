import React, { useContext } from 'react'
import { TbBrandBooking, TbSearch } from "react-icons/tb"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineUser } from "react-icons/ai"
import { Link } from "react-router-dom"
import { UserContext } from '../Context/UserContext'

const Header = () => {
    const{user}= useContext(UserContext)
    return (
        <div>
            <header className="flex justify-between items-center">
                <Link to={"/"} className="flex items-center w-1/3">
                    <TbBrandBooking className="text-rose-600 text-4xl" />
                    <span className="ml-1">Booking App</span>
                </Link>
                <div className="flex justify-around w-1/3 p-2 gap-2 border border-stone-400 shadow-lg shadow-stone-200 rounded-full">
                    <div>Anywhere</div>
                    <div className="border-l border-stone-300"></div>
                    <div>Any week</div>
                    <div className="border-l border-stone-300"></div>
                    <div>Add guests</div>
                    <button className=" flex items-center justify-center bg-rose-600 text-white rounded-full w-6"><TbSearch className=" text-lg" /></button>
                </div>
                <div className="flex w-1/3">
                    <div className='flex ml-auto p-2 gap-2 border border-stone-400 shadow-lg shadow-stone-200 rounded-full'>
                    <button className=" flex items-center justify-center bg-rose-600 text-white rounded-full w-6"><GiHamburgerMenu className=" text-lg" /></button>
                    <Link to={user?"/account":"/login"} className=" flex items-center justify-center bg-rose-600 text-white rounded-full w-6"><AiOutlineUser className="w-full h-full p-[2px] text-lg" /></Link>
                    {!!user && (
                            <span>
                                {user.name}
                            </span>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header