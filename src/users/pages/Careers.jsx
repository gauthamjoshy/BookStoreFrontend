import React, { useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaArrowUpRightFromSquare, FaLocationDot } from 'react-icons/fa6'
import { IoMdCloseCircle } from 'react-icons/io'

function Careers() {
  const [applyStatus, setApplyStatus] = useState(false)
  return (
    <>
      <Header />
      <div className='md:px-40 p-5'>
        <div className='text-center my-5'>
          <h1 className='text-3xl font-bold mb-5'>Careers</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim sit nemo culpa, similique ratione, doloribus a numquam consequatur pariatur molestiae minus consequuntur distinctio quibusdam corrupti in. Facilis qui voluptatem asperiores voluptate quibusdam quia perspiciatis nihil ad dolorem pariatur aliquid debitis ducimus quam possimus mollitia eos esse doloremque voluptas, doloribus placeat.</p>

        </div>
        <div className='my-10'>
          <h1 className='text-2xl font-bold'>Current Openings</h1>
          <div className='flex my-10 justify-center items-center'>
            <input type="text" name="" id="" placeholder='Search by title' className='p-2 border border-gray-200 text-black w-100 placeholder-gray-500' />
            <button className='text-white p-2 bg-blue-900 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-900'>Search</button>

          </div>

        </div>
        {/* Job listing */}
        <div className='border border-gray-200 p-5 shadow my-5'>
          <div className='flex mb-5'>
            <div className='w-full'>
              <h1>Frontend Developer</h1>
              <hr />
            </div>
            <button onClick={() => setApplyStatus(true)} className='bg-blue-900 text-white p-3 ms-5 flex items-center'>Apply <FaArrowUpRightFromSquare className='ms-2' /> </button>

          </div>
          <p className='flex '> <FaLocationDot className='me-2 mt-1' /> Kochi</p>
          <p className='text-lg my-2'>Job Type : Full Time</p>
          <p className='text-lg my-2'>Salary : 2000-3000/month</p>
          <p className='text-lg my-2'>Qualification : Btech</p>
          <p className='text-lg my-2'>Experience : 1-2yr</p>
          <p className='text-lg my-2 text-justify'> Description : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia facere id vero, repellat provident eaque, minima sapiente in, laudantium fugiat doloribus? Laboriosam, repudiandae? Voluptatibus, excepturi!</p>

        </div>

      </div>

      {/*  */}
      {applyStatus &&
        <div className='relative z-10 overflow-y-hidden'>
          <div className='bg-gray-200/75 fixed inset-0'>
          <div className='flex justify-center items-center min-h-screen scroll-auto'>
            <div className='rounded bg-white w-100 h-auto'>
              <div className='bg-black text-white flex justify-between items-center p-3'>
                <h1>Application Form</h1>
                <button><IoMdCloseCircle /></button>

              </div>
              <div className='grid grid-cols-2 p-3'>
                <div><input type="text" /></div>
                <div><input type="text" /></div>
              </div>

            </div>

          </div>

          </div>

        </div>
      }
      <Footer />
    </>
  )
}

export default Careers