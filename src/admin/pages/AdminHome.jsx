import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FaBook, FaUserGraduate, FaUsers } from 'react-icons/fa'
import { getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allAPI'

function AdminHome() {
  const [allBooks, setAllBooks] = useState([])
  const  [token, setToken] = useState("")
  const [allUsers, setAllUsers] =useState([])

  // get all books
  const getAllBooks = async () => {
    try {
      const result = await getAllBooksAdminAPI()
      console.log(result);
      setAllBooks(result.data)

    } catch (error) {
      console.log(error);

    }
  }

  // get all users
  const getAllUsers = async () => {
    try {
      // reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllUsersAPI(reqHeader)
      console.log(result);
      setAllUsers(result.data)
      

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    
  }, [])

  useEffect(() => {
    if(token){
      getAllBooks()
      getAllUsers()
    }
    
  }, [token])

  return (
    <>
      <AdminHeader />

      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div>
          <AdminSidebar />
        </div>
        <div>
          <div className='p-4'>
            <div className='md:grid grid-cols-3 text-white'>
              <div className='px-5'>
                <div className='grid grid-cols-[1fr_3fr] bg-blue-700 rounded p-4'>
                  <div className='flex justify-center items-center'>
                    <FaBook className='text-3xl' />
                  </div>
                  <div className=''>
                    <h1>Total No.of Books : </h1>
                    <h1 className='text-xl'>{allBooks?.length}</h1>
                  </div>

                </div>

              </div>
              <div className='px-5'>
                <div className='grid grid-cols-[1fr_3fr] bg-green-700 rounded p-4'>
                  <div className='flex justify-center items-center'>
                    <FaUsers className='text-3xl' />
                  </div>
                  <div className=''>
                    <h1>Total No.of Users : </h1>
                    <h1>{allUsers?.length}</h1>
                  </div>

                </div>

              </div>
              <div className='px-5'>
                <div className='grid grid-cols-[1fr_3fr] bg-yellow-700 rounded p-4'>
                  <div className='flex justify-center items-center'>
                    <FaUserGraduate className='text-3xl' />
                  </div>
                  <div className=''>
                    <h1>Total No.of Books : <span className='text-xl'>85</span> </h1>
                    <h1>85</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome