import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../common/components/Footer'
import AdminSidebar from '../components/AdminSidebar'
import { toast } from 'react-toastify'
import { updateAdminProfileAPI } from '../../services/allAPI'
import SERVERURL from '../../services/serverURL'
import { adminProfileUpdateContext } from '../../context/ContextShare'

function AdminSettings() {
  const [token, setToken] = useState("")
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profile: ""
  })
  const [existingProfile, setExistingProfile] = useState("")
  const [preview, setPreview] = useState("")
  const {setAdminProfileUpdateStatus} = useContext(adminProfileUpdateContext)

  console.log(adminDetails);
  console.log(existingProfile);

  const handleReset = () => {
    let user = JSON.parse(sessionStorage.getItem("existingUser"))
    setAdminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
    setExistingProfile(user.profile)
    setPreview("")
  }

  const handleFile = (e) => {
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })

    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async () => {
    const { username, password, confirmPassword } = adminDetails
    if (!username || !password || !confirmPassword) {
      toast.info(`Fill the details completely`)
    } else {
      if (password != confirmPassword) {
        toast.warning(`Password mismatch`)
      } else {
        // reqHeader
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        if (preview) {
          const reqBody = new FormData()
          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }

          const result = await updateAdminProfileAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success(`Profile updated succesfully`)
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setAdminProfileUpdateStatus(result)
          } else {
            toast.error(`Somthing went wrong`)
          }


        } else {
          const result = await updateAdminProfileAPI({ username, password, profile: existingProfile }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success(`Profile updated succesfully`)
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setAdminProfileUpdateStatus(result)
          } else {
            toast.error(`Somthing went wrong`)
          }
        }
      }
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      let user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
      setExistingProfile(user.profile)
    }
  }, [])
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div>
          <AdminSidebar />
        </div>
        <div className='p-4 '>
          <h1 className='text-3xl font-semibold my-10 text-center'>Settings</h1>
          <div className='md:grid grid-cols-2 mt-10'>
            <div className='md:px-10 px-5'>
              <p className='text-justify mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sint minima tempora sit nostrum repellendus dolorem. Laboriosam consequuntur molestiae unde maxime voluptatem rerum voluptates totam earum quidem exercitationem adipisci ut sapiente dolor cum aperiam odit doloremque illum, esse quas magnam facere. Harum vel totam veritatis reiciendis molestiae voluptatibus id voluptas deserunt tempora. Odit, inventore? Eveniet consequuntur eos minus nihil illo. Laborum provident tenetur veritatis illum consectetur consequatur architecto, esse officiis. Possimus nisi quisquam tenetur consectetur, sapiente voluptates quas odit laudantium enim eligendi, sunt quos dicta quidem! Quas suscipit aliquid deserunt dignissimos placeat commodi qui quae perferendis sit, dolorem repellendus corrupti.</p>
              <p className='text-justify mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sint minima tempora sit nostrum repellendus dolorem. Laboriosam consequuntur molestiae unde maxime voluptatem rerum voluptates totam earum quidem exercitationem adipisci ut sapiente dolor cum aperiam odit doloremque illum, esse quas magnam facere. Harum vel totam veritatis reiciendis molestiae voluptatibus id voluptas deserunt tempora. Odit, inventore? Eveniet consequuntur eos minus nihil illo. Laborum provident tenetur veritatis illum consectetur consequatur architecto, esse officiis. Possimus nisi quisquam tenetur consectetur, sapiente voluptates quas odit laudantium enim eligendi, sunt quos dicta quidem! Quas suscipit aliquid deserunt dignissimos placeat commodi qui quae perferendis sit, dolorem repellendus corrupti.</p>
            </div>
            <div className='md:px-10 px-5'>
              <form action="" className='bg-blue-200 md:p-10 *p-5 rounded my-10 md:my-0' >
                <div className='flex justify-center items-center my-10'>
                  <label htmlFor="editUserProfile">
                    <input onChange={(e) => handleFile(e)} type="file" id='editUserProfile' style={{ display: "none" }} />
                    {existingProfile == ""?
                      < img src={preview ? preview : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"} style={{ width: "170px", height: "170px", borderRadius: "50%" }} alt="" />
                    :
                    <img src={preview ? preview : `${SERVERURL}/imgUploads/${existingProfile}`} style={{ width: "170px", height: "170px", borderRadius: "50%" }} alt="" />
                    }
                  </label>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Username</label>
                  <input value={adminDetails?.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='bg-white rounded w-full p-2' name="" id="" />
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Password</label>
                  <input value={adminDetails?.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='bg-white rounded w-full p-2' name="" id="" />
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Confirm Password</label>
                  <input value={adminDetails?.confirmPassword} onChange={(e) => setAdminDetails({ ...adminDetails, confirmPassword: e.target.value })} type="text" placeholder='Confirm Password' className='bg-white rounded w-full p-2' name="" id="" />
                </div>
                <div className='flex justify-between mt-10 gap-5'>
                  <button type='button' onClick={handleReset} className='bg-amber-600 text-white p-4 w-1/2 hover:border hover:text-amber-600 hover:bg-white'>Reset</button>
                  <button type='button' onClick={handleSubmit} className='bg-green-600 text-white p-4 w-1/2 hover:border hover:text-green-600 hover:bg-white'>Submit</button>
                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default AdminSettings