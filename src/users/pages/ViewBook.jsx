import React, { useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaBackward, FaEye } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { getAbookAPI, makePaymentAPI } from '../../services/allAPI'
import SERVERURL from '../../services/serverURL'
import { loadStripe } from '@stripe/stripe-js';

function ViewBook() {
  const [modalstatus, setModalStatus] = useState(false)

  //state to store that particular getted book detail
  const [bookDetails, setBookDetails] = useState({})

  const { id } = useParams()

  const getAbook = async () => {
    const token = sessionStorage.getItem("token")
    // req header
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getAbookAPI(id, reqHeader)
      console.log(result);
      setBookDetails(result.data)

    } catch (error) {
      console.log(error);

    }
  }

  const handlePurchase = async () => {
    const stripe = await loadStripe('pk_test_51SdAsH39RD0Ct5BLjkO8KxMY9KSvPGGTHfzBsACNyK7Xt0p0Bnvyajn2QFrDsSWcTeWpyr3IGoFJB9XlQW4NSneH00emLg4Z2a');
    console.log(stripe);
    const token = sessionStorage.getItem("token")
    if (token) {
      // reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await makePaymentAPI(bookDetails, reqHeader)
        console.log(result);
        const checkoutSessionUrl = result.data.checkoutSessionUrl
        if (checkoutSessionUrl) {
          // redirect
          window.location.href = checkoutSessionUrl
        }

      } catch (error) {
        console.log(error);

      }
    }

  }


  useEffect(() => {
    getAbook()
  }, [])

  return (
    <>
      <Header />

      <div className='md:p-20 p-5'>
        <div className='w-full md:p-10 p-5'>
          <div className='flex justify-end'>
            <FaEye onClick={() => setModalStatus(true)} />

          </div>
          <div className='md:grid grid-cols-[1fr_3fr] w-full'>
            <div>
              <img src={bookDetails?.imageUrl} className='w-full h-100' alt="" />
            </div>
            <div className='px-4'>
              <h1 className='text-center font-medium text-2xl'>{bookDetails?.title}</h1>
              <p className='text-center text-blue-500'>{bookDetails?.author}</p>
              <div className='md:flex justify-between mt-10'>
                <p>Publisher : {bookDetails?.publisher}</p>
                <p>Language : {bookDetails?.languages}</p>
                <p>No.of pages : {bookDetails?.noOfPages}</p>

              </div>
              <div className='md:flex justify-between mt-10'>
                <p>Seller Mail : {bookDetails?.userMail}</p>
                <p>real Price : {bookDetails?.price}</p>
                <p>ISBN : {bookDetails?.isbn}</p>

              </div>
              <p className='text-justify mt-10'>{bookDetails?.abstract}</p>
              <div className='mt-10 flex justify-end gap-2'>
                <Link to={"/all-books"} className='flex px-4 py-3 bg-blue-800 text-white rounded hover:text-blue-800 hover:border hover:border-blue-800'>
                  <FaBackward className='mt-1 me-2' /> Back

                </Link>
                <button type='button' onClick={handlePurchase} className='px-4 py-3 bg-green-800 text-white rounded hover:text-green-800 hover:border hover:border-green-800'>
                  Buy $

                </button>

              </div>
            </div>

          </div>

        </div>

      </div>

      {modalstatus &&
        <div className='relative z-10 overflow-y-hidden'>
          <div className='bg-gray-500/75 fixed inset-0'>
            <div className='flex justify-center items-center min-h-screen scroll-auto'>
              <div className='bg-white rounded-2xl md:w-250 w-100'>
                <div className='bg-black text-white flex justify-between items-center p-3'>
                  <h3>Book Images</h3>
                  <button onClick={() => setModalStatus(false)}> <IoIosCloseCircle className='text-2xl' /> </button>
                </div>
                <div className='relative p-5'>
                  <p className='text-blue-600'>Camera Click of the book in the hand of the seller</p>

                </div>
                <div className='md:flex flex-wrap my-4 overflow-y-hidden'>

                  {bookDetails?.uploadImages?.length > 0 ?
                    bookDetails?.uploadImages?.map(img => (
                      <img height={"250px"} width={"250px"} className='mx-2 md:mb-0 mb-2' src={`${SERVERURL}/imgUploads/${img} `} alt="" />
                    ))


                    :

                    <p className='font-bold text-red-700 ms-5'>User Uploaded images are unavailable</p>
                  }
                </div>
              </div>

            </div>

          </div>

        </div>}



      <Footer />

    </>
  )
}

export default ViewBook