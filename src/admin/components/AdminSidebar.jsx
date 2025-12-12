import React, { useContext, useEffect, useState } from 'react'
import { FaGraduationCap, FaHome } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { PiBooks } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import SERVERURL from '../../services/serverURL'
import { adminProfileUpdateContext } from '../../context/ContextShare'

function AdminSidebar() {
    const [adminName, setAdminName] = useState("")
    const [existingProfile, setExistingProfile] = useState("")

    const {adminProfileUpdateStatus} = useContext(adminProfileUpdateContext)

    useEffect(()=>{
        setAdminName(JSON.parse(sessionStorage.getItem("existingUser")).username)
        setExistingProfile(JSON.parse(sessionStorage.getItem("existingUser")).profile)
    }, [adminProfileUpdateStatus])
    return (
        <>
            <div className='bg-gray-200 w-full md:min-h-screen flex items-center flex-col'>
                <div className='my-10'>
                    <img src={existingProfile == ""? "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80" : `${SERVERURL}/imgUploads/${existingProfile}`} style={{width:"170px", height:"170px", borderRadius:"50%"}} alt="" />

                </div>
                <h1 className='text-2xl mb-10'>{}</h1>
                <div className='mb-10'>
                    <div className='mb-4 flex'>
                        {/* <input type="radio" id='home' readOnly /> */}
                        <Link to={"/admin-home"}><label htmlFor="home" className='flex ms-3'> <FaHome className='mt-1 me-1' /> Home</label></Link>

                    </div>
                    <div className='mb-4 flex'>
                        {/* <input type="radio" id='books' readOnly /> */}
                        <Link to={"/admin-books"}><label htmlFor="books" className='flex ms-3'> <PiBooks className='mt-1 me-1' /> Books</label></Link>

                    </div>
                    <div className='mb-4 flex'>
                        {/* <input type="radio" id='careers' readOnly /> */}
                        <Link to={"/admin-careers"}><label htmlFor="careers" className='flex ms-3' > <FaGraduationCap className='mt-1 me-1' /> Careers</label></Link>

                    </div>
                    <div className='mb-4 flex'>
                        {/* <input type="radio" id='settings' readOnly /> */}
                        <Link to={"/admin-settings"}><label htmlFor="settings" className='flex ms-3'> <IoMdSettings className='mt-1 me-1' /> Home</label></Link>

                    </div>

                </div>

            </div>
        </>
    )
}

export default AdminSidebar