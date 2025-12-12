import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { MdOutlineVerified } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { addBookAPI, deleteUserAddedBookAPI, getUserBooksAPI, getUserBroughtBooksAPI } from '../../services/allAPI'
import EditProfile from '../components/EditProfile'
import { userProfileUpdateContext } from '../../context/ContextShare'
import SERVERURL from '../../services/serverURL'

function Profile() {
  const [sellBookSatatus, setSellBookStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseHistory, setPurchaseHistory] = useState(false)
  const [preview, setPreview] = useState("")
  const [allUploadImages, setAllUploadImages] = useState([])
  const [userAddBooks, setUserAddBooks] = useState([])
  const [userBroughtBook, setUserBroughtBook] = useState([])

  // to show profile image
  const [userProfile, setUserProfile] = useState("")

  // contextShare
  const { userProfileUpdateStatus } = useContext(userProfileUpdateContext)

  //token
  const [token, setToken] = useState("")
  //to get name
  const [username, setUsername] = useState("")

  const [bookDetails, setBookDetails] = useState({
    title: "", author: "", noOfPages: "", imageUrl: "", price: "", dPrice: "", abstract: "", publisher: "", languages: "", isbn: "", category: "", uploadImages: []
  })
  console.log(bookDetails);

  const reset = () => {
    setBookDetails({
      title: "", author: "", noOfPages: "", imageUrl: "", price: "", dPrice: "", abstract: "", publisher: "", languages: "", isbn: "", category: "", uploadImages: []

    })
    setPreview("")
    setAllUploadImages([])
  }

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImages: fileArray })
    // convert files to url
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)

    // preview of images
    let images = allUploadImages
    images.push(url)
    setAllUploadImages(images)

  }
  console.log(allUploadImages);


  const handleAddBook = async () => {
    const { title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, languages, isbn, category, uploadImages } = bookDetails

    if (!title || !author || !noOfPages || !imageUrl || !price || !dPrice || !abstract || !publisher || !languages || !isbn || !category || uploadImages.length == 0) {
      toast.info(`Fill the form completely`)
    } else {
      //req header
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      //req body - formData()
      const reqBody = new FormData()

      //append - reqBody.append(key, value)
      // reqBody.append("title", title)   ----can be done this way-----   
      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.forEach(img => {
            reqBody.append("uploadImages", img)
          })
        }
      }

      try {
        const result = await addBookAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success(`Book Added Succefully`)
          reset()
        } else if (result.status == 401) {
          toast.warning(result.response.data)
        } else {
          toast.error(`Error in adding book`)
        }

      } catch (error) {
        toast.error(`Somethong went wrong`)
      }
    }
  }

  const getUserAddedBooks = async () => {
    try {
      //req header
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserBooksAPI(reqHeader)
      console.log(result);
      setUserAddBooks(result.data)

    } catch (error) {
      console.log(error);

    }
  }


  // delete book
  const handleDeleteBook = async (id) => {
    try {
      const result = await deleteUserAddedBookAPI(id)
      console.log(result);
      getUserAddedBooks()

      if (result.status == 200) {
        toast.success(`Book deleted successfully`)
      } else {
        toast.error(`Something went wrong`)
      }

    } catch (error) {
      console.log(error);
    }
  }


  // get user brought books
  const getBroughtBooks = async () => {
    try {
      //req header
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserBroughtBooksAPI(reqHeader)
      console.log(result);
      setUserBroughtBook(result.data)

    } catch (error) {
      console.log(error);
    }
  }
  console.log(userBroughtBook);


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    if (sessionStorage.getItem("existingUser")) {
      const name = JSON.parse(sessionStorage.getItem("existingUser"))
      setUsername(name.username)
    }
  }, [userProfileUpdateStatus])

  // useEffect(() => {
  //   if (bookStatus == true) {
  //     getUserAddedBooks()
  //   }
  //   getBroughtBooks()

  // }, [bookStatus, purchaseHistory])
  useEffect(() => {
  if (bookStatus) {
    getUserAddedBooks()
  }
}, [bookStatus])

useEffect(() => {
  if (purchaseHistory) {
    getBroughtBooks()
  }
}, [purchaseHistory])



  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const existingProfile = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserProfile(existingProfile.profile)
    }
  }, [])
  console.log(userProfile);



  return (
    <>
      <Header />

      <div style={{ height: "200px" }} className='bg-black'>

      </div>
      <div className='bg-white p-3' style={{ width: "230px", height: "230px", borderRadius: "50%", marginLeft: "70px", marginTop: "-130px" }}>
        <img style={{ width: "200px", height: "200px", borderRadius: "50%" }} src={userProfile == "" ? "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80" : userProfile.startsWith("https")?userProfile : `${SERVERURL}/imgUploads/${userProfile}`} alt="" />
      </div>
      <div className='md:flex justify-between px-20 mt-5'>
        <div>
          <h1 className='font-bold md:text-3xl text-2xl'>{username}</h1>
          <MdOutlineVerified className='text-blue-500 ms-3 text-xl' />

        </div>
        <div>
          <EditProfile />
        </div>

      </div>
      <p className='md:px-20 px-5 my-5 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur placeat a modi veniam necessitatibus eaque!</p>



      <div className='flex justify-center items-center my-8 font-medium text-lg'>
        <p onClick={() => { setSellBookStatus(true), setBookStatus(false), setPurchaseHistory(false) }} className={sellBookSatatus ? "text-blue-500 p-4 border-gray-200 border-t border-r rounded cursor-pointer" : 'border-b p-4 border-gray-200 cursor-pointer'}>Sell Books</p>
        <p onClick={() => { setBookStatus(true), setSellBookStatus(false), setPurchaseHistory(false) }} className={bookStatus ? "text-blue-500 p-4 border-gray-200 border-t border-r rounded cursor-pointer" : 'border-b p-4 border-gray-200 cursor-pointer'}>Book Status</p>
        <p onClick={() => { setPurchaseHistory(true), setSellBookStatus(false), setBookStatus(false) }} className={purchaseHistory ? "text-blue-500 p-4 border-gray-200 border-t border-r rounded cursor-pointer" : 'border-b p-4 border-gray-200 cursor-pointer'}>Purchase History</p>

      </div>
      <div>
        {sellBookSatatus &&
          <div className='md:p-20 p-5'>
            <div className='bg-gray-200 md:p-10 p-5 rounded'>
              <h1 className='text-center text-3xl font-medium'>Book Details</h1>
              <div className='md:grid grid-cols-2'>


                <div className='md:my-10 mt-5 px-2'>
                  <div className='mb-3'>
                    <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.noOfPages} onChange={(e) => setBookDetails({ ...bookDetails, noOfPages: e.target.value })} type="text" placeholder='Number of pages' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} type="text" placeholder='Image URL' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.dPrice} onChange={(e) => setBookDetails({ ...bookDetails, dPrice: e.target.value })} type="text" placeholder='Discount Price' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} type="text" placeholder='Abstract' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>

                </div>

                <div className='md:my-10 px-2'>
                  <div className='mb-3'>
                    <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.languages} onChange={(e) => setBookDetails({ ...bookDetails, languages: e.target.value })} type="text" placeholder='Language' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>
                  <div className='mb-3'>
                    <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='p-2 bg-white rounded w-full' name="" id="" />
                  </div>

                  <div className='flex justify-center items-center mt-10 flex-col'>

                    {preview ? <img src={preview} alt="" style={{ width: "200px", height: "200px" }} />
                      :
                      <label htmlFor="upLoadBookImg">
                        <input onChange={(e) => handleFile(e)} type="file" name="" id="upLoadBookImg" style={{ display: "none" }} />
                        <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" alt="" style={{ width: "200px", height: "200px" }} />
                      </label>}

                    {preview &&
                      <div className='mt-10 flex items-center gap-5'>
                        {
                          allUploadImages.map((item, i) => (
                            <img src={item} key={i} alt="" style={{ width: "50px", height: "50px" }} />
                          ))
                        }


                        {allUploadImages.length < 3 &&
                          <label htmlFor="upLoadBookImg" className='ms-4' >
                            <input onChange={(e) => handleFile(e)} type="file" name="" id="upLoadBookImg" style={{ display: "none" }} />
                            <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" alt="" style={{ width: "50px", height: "50px" }} />
                          </label>}
                      </div>}

                  </div>
                  <div className='flex md:justify-end justify-between mt-5 gap-5'>
                    <button onClick={handleAddBook} className='bg-green-600 text-white p-4 w-1/2 hover:border hover:text-green-600 hover:bg-white'>Submit</button>
                    <button onClick={reset} className='bg-amber-600 text-white p-4 w-1/2 hover:border hover:text-amber-600 hover:bg-white'>Reset</button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        }

        {bookStatus &&
          <div className='p-10 my-20 shadow rounded'>

            {
              userAddBooks?.length > 0 ?
                userAddBooks?.map((book, index) => (
                  <div key={index} className='bg-gray-200 p-5 rounded mt-4'>
                    <div className='grid md:grid-cols-[3fr_1fr]'>
                      <div className='px-4'>
                        <h1 className='text-2xl'>{book?.title}</h1>
                        <h2>{book?.author}</h2>
                        <h3 className='text-blue-600'>$ {book?.price}</h3>
                        <p>{book?.abstract}</p>
                        <div className='flex mt-5 gap-3'>
                          {book?.status == "pending" ?
                            <img style={{ width: "70px", height: "70px" }} src="https://www.psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="" />
                            : book?.status == "approved" ?
                              <img style={{ width: "70px", height: "70px" }} src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png" alt="" />
                              :
                              <img style={{ width: "70px", height: "70px" }} src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="" />
                          }
                        </div>

                      </div>
                      <div className='px-4 mt-4 md:mt-4'>
                        <img className='w-full h-100' src={book?.imageUrl} alt="" />
                        <div className='flex justify-end mt-4'>
                          <button type='button' onClick={() => handleDeleteBook(book?._id)} className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                        </div>
                      </div>

                    </div>

                  </div>
                ))


                :

                <div className='flex justify-center items-center flex-col'>
                  <img style={{ width: "200px", height: "200px" }} src="https://img.freepik.com/premium-vector/realistic-push-pins-cartoon-style-that-are-realistic_579306-3339.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                  <p className='text-red-600 text-2xl'>No Book Added Yet</p>

                </div>
            }

          </div>
        }
        {purchaseHistory &&
          <div className='bg-gray-200 p-5 rounded mt-4 mb-10'>
            {userBroughtBook?.length > 0 ?
              userBroughtBook?.map((item, index) => (
                <div key={index} className='grid md:grid-cols-[3fr_1fr]'>
                  <div className='px-4'>
                    <h1 className='text-2xl'>{item?.title}</h1>
                    <h2>Author : {item?.author}</h2>
                    <h3 className='text-blue-600'>$ {item?.price}</h3>
                    <p>{item?.abstract}</p>
                    {/* <div className='flex mt-5 gap-3'>
                    <img style={{ width: "70px", height: "70px" }} src="https://www.psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="" />
                    <img style={{ width: "70px", height: "70px" }} src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png" alt="" />
                    <img style={{ width: "70px", height: "70px" }} src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="" />
                  </div> */}

                  </div>
                  <div className='px-4 mt-4 md:mt-4'>
                    <img className='w-full h-100' src={item?.imageUrl} alt="" />

                  </div>

                </div>
              ))

              :

              <p className='text-center text-2xl font-semibold text-red-500'>You havent brought any book ...!</p>
            }
          </div>
        }

      </div>


      {/* Book details */}
      {/* <div className='w-full h-auto'>
        <h1 className='font-bold text-center my-5'>Book Details</h1>
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div className='col-span-1'>
            <input type="text" placeholder='Title' className='rounded bg-gray-200 p-3 ' />
          </div>
          <div className='col-span-1'>
            <input type="text" placeholder='Title' className='rounded bg-gray-200 p-3 ' />
          </div>

        </div>

      </div> */}
      {/* <div className='md:p-20 p-5'>
        <div className='bg-gray-200 md:p-10 p-5 rounded'>
          <h1 className='text-center text-3xl font-medium'>Book Details</h1>
          <div className='md:grid grid-cols-2'>


            <div className='md:my-10 mt-5 px-2'>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>

            </div>

            <div className='md:my-10 px-2'>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>
              <div className='mb-3'>
                <input type="text" placeholder='Title' className='p-2 bg-white rounded w-full' name="" id="" />
              </div>

              <div className='flex justify-center items-center mt-10 flex-col'>
                <label htmlFor="upLoadBookImg">
                  <input type="file" name="" id="upLoadBookImg" style={{ display: "none" }} />
                  <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" alt="" style={{ width: "200px", height: "200px" }} />
                </label>
              </div>
              <div className='flex md:justify-end justify-between mt-5 gap-5'>
                <button className='bg-green-600 text-white p-4 w-1/2 hover:border hover:text-green-600 hover:bg-white'>Submit</button>
                <button className='bg-amber-600 text-white p-4 w-1/2 hover:border hover:text-amber-600 hover:bg-white'>Reset</button>
              </div>

            </div>
          </div>
        </div>

      </div> */}


      <Footer />
    </>
  )
}

export default Profile