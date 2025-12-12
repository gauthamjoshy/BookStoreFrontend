import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import SERVERURL from '../../services/serverURL'
import { toast } from 'react-toastify'
import { updateUserProfileAPI } from '../../services/allAPI'
import { userProfileUpdateContext } from '../../context/ContextShare'

function EditProfile() {

    const [offCanvas, setOffCanvas] = useState(false)

    // logic
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        bio: "",
        role: "",
        profile: ""

    })
    const [token, setToken] = useState("")
    const [existingProfile, setExistingProfile] = useState("")
    const [preview, setPreview] = useState("")

    // contextShare
    const {setUserProfileUpdateStatus} = useContext(userProfileUpdateContext)

    console.log(userDetails);
    console.log(existingProfile);

    const handleImageUpload = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setPreview(url)
    }

    // reset form
    // const handleFormReset = () => {
    //     setUserDetails({
    //         username: "",
    //         password: "",
    //         confirmPassword: "",
    //         bio: "",
    //         role: "",
    //         profile: ""
    //     })

    // }
    // update data
    // const handleUpdateData = ()=>{
    //     if(!userDetails.username || !userDetails.password || !userDetails.confirmPassword){
    //         if(userDetails.password == userDetails.confirmPassword){
    //             if(!preview){

    //             }else{

    //             }
    //         }else{
    //             alert(`Passwords do not match`)
    //         }
    //     }else{
    //         alert(`Please fill the required fields completely`)
    //     }
    // }/

    const handleReset = () => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserDetails({
            username: user.username,
            password: user.password,
            confirmPassword: user.password,
            bio: user.bio,
            role: user.role
        })
        setExistingProfile(user.profile)
    }

    const handleUpdate = async () => {
        const { username, password, confirmPassword, bio, role, profile } = userDetails
        if (!username || !password || !confirmPassword || !bio) {
            toast.info(`Fill the form completely`)
        } else {
            if (password != confirmPassword) {
                toast.warning(`Invalid credentials`)
            } else {
                //req header
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                // const reqBody = new FormData()
                if (preview) {
                    const reqBody = new FormData()
                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key])
                    }
                    const result = await updateUserProfileAPI(reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success(`Profile updated successfully`)
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setOffCanvas(false)
                        setUserProfileUpdateStatus(result)
                    } else {
                        toast.error(`Something went wrong`)
                    }

                } else {
                    const result = await updateUserProfileAPI({ username, password, bio, role, profile: existingProfile }, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success(`Profile updated successfully`)
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setOffCanvas(false)
                        setUserProfileUpdateStatus(result)
                    } else {
                        toast.error(`Somethig went wrong`)
                    }

                }
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({
                username: user.username,
                password: user.password,
                confirmPassword: user.password,
                bio: user.bio,
                role: user.role
            })
            setExistingProfile(user.profile)
        }
    }, [])

    return (
        <>
            <button onClick={() => setOffCanvas(true)} className='flex bg-blue-500 px-4 py-3 font-bold border border-blue-200'>
                <FaEdit className='mt-1 me-2' /> Edit
            </button>

            {offCanvas &&
                <div>
                    <div className='fixed inset-0 bg-gray-500/75 w-full h-full'></div>
                    <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
                        <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                            <h1>Edit User Profile</h1>
                            <button onClick={() => setOffCanvas(false)}>X</button>

                        </div>

                        <div className='flex justify-center items-center flex-col my-5'>
                            <label htmlFor="profilePic" className='' >
                                <input onChange={(e) => handleImageUpload(e)} type="file" style={{ display: "none" }} id='profilePic' />

                                {existingProfile == "" ?
                                    <img style={{ height: "150px", width: "150px", borderRadius: "50%" }} src={preview ? preview : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
                                    :
                                    <img style={{ height: "150px", width: "150px", borderRadius: "50%" }} src={preview ? preview : `${SERVERURL}/imgUploads/${existingProfile}`} alt="" />
                                }
                            </label>
                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='username' className='w-full border border-gray-300 placeholder:gray-500 p-2 rounded' />

                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='password' className='w-full border border-gray-300 placeholder:gray-500 p-2 rounded' />

                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <input value={userDetails.confirmPassword} onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })} type="text" placeholder='confirm password' className='w-full border border-gray-300 placeholder:gray-500 p-2 rounded' />

                        </div>
                        <div className='mt-10 mb-3 w-full px-5'>
                            <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} type="text" placeholder='bio' rows={5} className='w-full resize-none border border-gray-300 placeholder:gray-500 p-2 rounded' />

                        </div>

                        <div className='flex justify-between mt-10 gap-5 px-10'>
                            <button type='button' onClick={handleUpdate} className='bg-green-600 text-white p-4 w-1/2 hover:border hover:text-green-600 hover:bg-white'>Update</button>
                            <button type='button' onClick={handleReset} className='bg-amber-600 text-white p-4 w-1/2 hover:border hover:text-amber-600 hover:bg-white'>Reset</button>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile