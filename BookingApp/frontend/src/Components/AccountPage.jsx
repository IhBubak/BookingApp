import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { Navigate, useParams } from 'react-router-dom'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import PlacesPage from './PlacesPage'
import { AiOutlineUser, AiOutlineUnorderedList } from "react-icons/ai"
import { FaRegBuilding } from "react-icons/fa"

const AccountPage = () => {
  //handle delay for slow connections
  const { ready, user, setUser } = useContext(UserContext)
  const { subpage } = useParams()
  const navigate = useNavigate()

  function linkClasses(type = null) {
    let tailwindClasses = "py-2 px-4 hover:bg-rose-600 hover:text-white hover:rounded-full "
    if (type === "profile" && subpage === undefined) {
      tailwindClasses += "bg-rose-600 text-white rounded-full"
    }
    if (type === subpage) {
      tailwindClasses += "bg-rose-600 text-white rounded-full"
    }
    return tailwindClasses
  }
  async function logout() {
    await axios.post("/logout")
    setUser(null)
    navigate("/login")
  }

  if (!ready) {
    return "Loading..."
  }
  if (ready && !user) {
    return <Navigate to="/login" />
  }
  return (
    <div>
      <nav className='w-full flex mt-8 gap-4 justify-center'>
        <Link className={linkClasses("profile")} to={"/account"}>
        <AiOutlineUser className="inline-flex text-lg mx-1" />
          My Profile
          </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          <AiOutlineUnorderedList className="inline-flex text-lg mx-1"/>
          My Bookings
          </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          <FaRegBuilding className="inline-flex text-lg mx-1"/>
          My Accomodations
          </Link>
      </nav>
      {subpage === undefined && (
        <div className=' text-center max-w-lg mx-auto gap-2 my-8'>
          logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className='w-1/2 p-1 my-2'>Logout</button>
        </div>
      )
      }
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  )
}

export default AccountPage