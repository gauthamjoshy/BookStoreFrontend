import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { getHomeBookAPI } from '../../services/allAPI'

function LandingPage() {

  const [homeBook, setHomeBook] = useState([])

  const getHomebooks = async () => {
    const result = await getHomeBookAPI()
    console.log(result);
    setHomeBook(result.data)

  }

  useEffect(() => {
    getHomebooks()
  }, [])
  return (
    <>
      <Header />

      {/* Landing */}
      <div style={{ height: "500px" }} className='flex flex-col justify-center items-center bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpLQdypZOCxD34pO2SYbOYMAKfANSqAV-Swp830PmQ2NIV32VZpOrxY3maIR6iQRphKXQ&usqp=CAU)] bg-no-repeat bg-cover bg-center text-white'>
        <div className='w-full flex flex-col justify-center items-center' style={{ height: "500px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <h1 className='text-5xl font-bold'>Wonderful Gifts</h1>
          <p>Give Your Family and Friends a Book</p>
          <div className='mt-9 flex'>
            <input type="text" placeholder='Search Books' name="" id="" className='bg-white p-3 rounded-3xl placeholder-gray-500 w-100' />
            <FaMagnifyingGlass className='text-gray-500 text-2xl mt-3' style={{ marginLeft: "-40px" }} />

          </div>

        </div>

      </div>

      {/* New Arrivals */}
      <section className='md:px-40 p-5 flex flex-col justify-center items-center'>
        <h1 className='text-2xl font-bold'>New Arrivals</h1>
        <h1>Explore Our Latest Collections</h1>

        {homeBook.length > 0 ?
          <div className='md:grid grid-cols-4 w-full mt-5'>

            {homeBook?.map((item) => (
              <div className='p-3'>
                <div className='shadow p-3 rounded '>
                  <img width={"100%"} height={"300px"} src={item.imageUrl} alt="" />
                  <div className='text-center mt-3'>
                    <p className='font-bold text-2xl'>{item.title}</p>
                    <p className='font-bold text-xl'>{item.author}</p>
                    <p className='font-bold'>{item.price}</p>

                  </div>

                </div>

              </div>
            ))
            }

          </div>
          :
          <p>Loading....</p>

        }

        <div className='text-center my-5'>
          <Link to={"/all-books"}> <button className='px-3 py-2 text-white bg-blue-900 terxt-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white rounded'>Explore More</button> </Link>

        </div>

      </section>
      <Footer />
    </>
  )
}

export default LandingPage