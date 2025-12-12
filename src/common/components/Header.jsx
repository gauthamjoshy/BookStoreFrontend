import React, { useContext, useEffect, useState } from 'react'
import { FaFacebookSquare, FaInstagram, FaUser } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdOutlineMenu } from 'react-icons/md'
import { TiThMenu } from 'react-icons/ti'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SERVERURL from '../../services/serverURL'
import { userAuthContext } from '../../context/AuthContext'

function Header() {

    const [listStatus, setListStatus] = useState(false)
    const [dropdownStatus, setDropdownStatus] = useState(false)
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")
    console.log(token);
    console.log(username);
    const [userProfile, setUserProfile] = useState("")


    const navigate = useNavigate()

    // path protect
  const {setAuthorisedUser} = useContext(userAuthContext)

    const logout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        toast.success(`Logout Successul`)
        setAuthorisedUser(false)
        navigate("/")
    }



    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        if (sessionStorage.getItem("existingUser")) {
            const name = JSON.parse(sessionStorage.getItem("existingUser"))
            setUsername(name.username)
            const existingProfile = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserProfile(existingProfile.profile)
        }
        console.log(userProfile);


    }, [])


    return (
        <>
            <div className='grid grid-cols-3 p-3'>
                {/* logo */}
                <div className='flex items-center'>
                    <img width={"50px"} height={"50px"} src="https://static.vecteezy.com/system/resources/thumbnails/006/552/415/small/book-and-studen-logo-free-vector.jpg" alt="" />
                    <h4 className='font-bold text-2xl ms-2 md:hidden'>Book Store</h4>

                </div>

                {/* Title */}
                <div className='md:flex justify-center items-center hidden'>
                    <h1 className='text-2xl font-bold'>Boook Store</h1>

                </div>

                {/* Login */}
                <div className='md:flex justify-end items-center hidden me-6'>
                    <FaInstagram className='me-3 text-2xl' />
                    <FaXTwitter className='me-3 text-2xl' />
                    <FaFacebookSquare className='me-3 text-2xl' />

                    {!token ?
                        <Link to={"/login"}>
                            <button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white gap-1'> <FaUser /> Login</button>
                        </Link>

                        :

                        <div className='relative inline-block text-left'>
                            <button onClick={() => setDropdownStatus(!dropdownStatus)} className='w-full bg-white px-3 py-2 shadow-xs hover:bg-gray-400 flex items-center border rounded-lg'>
                                <img src={userProfile == "" ? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png": userProfile.startsWith("https")? userProfile : `${SERVERURL}/imgUploads/${userProfile}`} width={"50px"} height={"50px"} alt="" style={{ borderRadius: "50%" }} />
                                <p className='ms-2'>{username}</p>
                            </button>

                            {dropdownStatus &&
                                <div className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg'>
                                    <Link to={"/profile"} className='block px-4 py-2 text-sm text-gray-70'>Profile</Link>
                                    <button onClick={logout} className='block px-4 py-2 text-sm text-gray-70'>Logout</button>

                                </div>}

                        </div>
                    }
                </div>

            </div>

            <nav className='w-full bg-gray-900 text-white p-5'>
                <div className='flex justify-between items-center md:hidden'>
                    <button onClick={() => setListStatus(!listStatus)}><MdOutlineMenu className='text-2xl hover:border-2 shadow' /></button>
                    <Link to={"/login"}>
                        <button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white gap-1'> <FaUser className='me-2' /> Login</button>
                    </Link>

                </div>

                <ul className={listStatus ? "flex flex-col" : "md:flex justify-center items-center hidden"}>
                    <li><Link to={"/"} className='mx-4'>Home</Link></li>
                    <li><Link to={"/all-books"} className='mx-4'>Books</Link></li>
                    <li><Link to={"/careers"} className='mx-4'>Careers</Link></li>
                    <li><Link to={"/contact"} className='mx-4'>Contact</Link></li>

                </ul>
            </nav>
        </>
    )
}

export default Header