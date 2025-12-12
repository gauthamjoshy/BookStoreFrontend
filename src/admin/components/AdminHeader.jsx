import React, { useContext } from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userAuthContext } from '../../context/AuthContext'

function AdminHeader() {
    const navigate = useNavigate()

    // path protect
      const {setAuthorisedUser} = useContext(userAuthContext)

    const logout = ()=>{
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        toast.success(`Logout Successul`)
        setAuthorisedUser(false)
        navigate("/")
    }
    return (
        <>
            <nav className='px-5 py-2 flex justify-between'>
                {/* logo */}
                <div className='flex items-center'>
                    <img width={"75px"} height={"75px"} src="https://static.vecteezy.com/system/resources/thumbnails/006/552/415/small/book-and-studen-logo-free-vector.jpg" alt="" />
                    <h4 className='font-bold text-2xl ms-4 md:hidden'>Book Store</h4>

                </div>


                {/* Login */}
                <div className='ms-auto flex justify-center items-center me-5'>
                    <button onClick={logout} className='flex justify-between items-center border border-black rounded px-4 py-4 ms-3 hover:bg-black hover:text-white'>
                        <FaPowerOff className='me-3' />Logout</button>
                </div>

            </nav>

        </>
    )
}

export default AdminHeader