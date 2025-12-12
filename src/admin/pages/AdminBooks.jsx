import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookStatusAPI, getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allAPI'

function AdminBooks() {

  const [bookListStatus, setBookListStatus] = useState(true)
  const [userListStatus, setUserListStatus] = useState(false)

  // logic
  const [allBooks, setAllBooks] = useState([])
  const [token, setToken] = useState("")
  const [allUsers, setAllUsers] = useState([])

  const getAllBooks = async () => {
    try {
      const result = await getAllBooksAdminAPI()
      // console.log(result);
      if (result.status == 200) {
        setAllBooks(result.data)
      }


    } catch (error) {
      console.log(error);

    }
  }

  const approveBook = async (id) => {
    // console.log(id);
    try {
      const result = await approveBookStatusAPI(id)
      // console.log(result);
      setAllBooks(result.data)
      getAllBooks()

    } catch (error) {
      console.log(error);

    }

  }

  const getAllUsers = async () => {

    //req header
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getAllUsersAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setAllUsers(result.data)
      }

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    getAllBooks()
    if (sessionStorage.getItem("token"))
      setToken(sessionStorage.getItem("token"))

  }, [])


  return (
    <>
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />

        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-center font-extrabold'>All Books</h1>
          {/* tabs */}
          <div className='flex justify-center items-center my-8 font-medium text-lg'>
            <p onClick={() => { setUserListStatus(false), setBookListStatus(true) }} className={bookListStatus ? "text-blue-500 p-4 border-gray-200 border-t border-r rounded cursor-pointer" : 'border-b p-4 border-gray-200 cursor-pointer'}>Books</p>
            <p onClick={() => { setUserListStatus(true), setBookListStatus(false), getAllUsers() }} className={userListStatus ? "text-blue-500 p-4 border-gray-200 border-t border-r rounded cursor-pointer" : 'border-b p-4 border-gray-200 cursor-pointer'}>Users</p>
          </div>

          {bookListStatus &&
            <>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-6'>
                {allBooks?.length > 0 ?
                  allBooks?.map((book, index) => (
                    <div key={index} className='shadow-lg bg-white rounded-xl p-4 hover:shadow-xl transition'>
                      <img width={"100%"} height={"300px"} src={book?.imageUrl} alt="" />
                      <div className='flex flex-col justify-center items-center mt-4'>
                        <p>{book?.title}</p>
                        <p>{book?.author}</p>
                        <p className='text-green-600 font-bold'>$ {book?.dPrice}</p>
                        {book?.status == "pending" &&
                          <button type='button' onClick={() => approveBook(book?._id)} className='w-full mt-3 p-3 rounded border bg-green-700 text-white hover:border-green-600 hover:bg-white hover:text-green-700'>Approve</button>
                        }

                        {book?.status == "approved" &&
                          <div>
                            <img style={{ width: "100px" }} src="https://png.pngtree.com/png-vector/20191029/ourmid/pngtree-approved-stamp-round-grunge-approved-sign-sticker-seal-png-image_1870479.jpg" alt="" />
                          </div>
                        }

                      </div>

                    </div>

                  ))

                  :
                  <p className='text-red-700 text-center font-semibold mt-10 text-xl'>No books available</p>
                }
              </div>
            </>
          }

          {userListStatus && (
            <>
              {allUsers?.length > 0 ? (
                <div className="grid md:grid-cols-3 w-full my-5">
                  {allUsers.map((user, index) => (
                    <div key={index} className="shadow rounded p-2 m-2 bg-gray-200">
                      <p className="text-red-700 font-bold">ID:{user?._id}</p>
                      <div className="flex items-center mt-3">
                        <img
                          width={"80px"}
                          height={"100px"}
                          style={{ borderRadius: "50%" }}
                          src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg"
                          alt=""
                        />
                        <div className="flex flex-col ml-3 w-full">
                          <p className="text-blue-800 text-lg font-bold">{user?.username}</p>
                          <p>{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-700 text-center font-semibold mt-10 text-xl">
                  No user available
                </p>
              )}
            </>
          )}


        </div>

      </div>
    </>
  )
}

export default AdminBooks