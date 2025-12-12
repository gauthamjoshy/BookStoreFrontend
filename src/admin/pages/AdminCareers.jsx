import React, { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { FaArrowUpRightFromSquare, FaLocationDot } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function AdminCareers() {

  const [jobPostStatus, setJobPostStatus] = useState(true)
  const [applicantStatus, setApplicantStatus] = useState(false)

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
            <p onClick={() => { setApplicantStatus(false), setJobPostStatus(true) }} className={jobPostStatus ? "text-blue-500 p-4 border-gray-200 border-t border-r rounded cursor-pointer" : 'border-b p-4 border-gray-200 cursor-pointer'}>Jobs</p>
            <p onClick={() => { setApplicantStatus(true), setJobPostStatus(false) }} className={applicantStatus ? "text-blue-500 p-4 border-gray-200 border-t border-r rounded cursor-pointer" : 'border-b p-4 border-gray-200 cursor-pointer'}>Applicant</p>
          </div>

          {jobPostStatus &&
            <div className=''>
              <div className='md:flex justify-center items-center my-8 w-full md:px-20 px-5'>
                <div className='md:flex w-full ms-2 md:ms-0'>
                  <input type="text" placeholder='Search by title' className='border border-gray-200 placeholder-gray-200 p-2 md:w-1/4 w-3/4' />
                  <button className='bg-green-800 mt-5 md:mt-0 text-white p-2 rounded md:ms-2 hover:bg-white hover:border hover:border-green-700 hover:text-green-800'>Search</button>

                </div>
                <div>
                  <button className='bg-blue-800 mt-5 md:mt-0 w-full text-white p-2 rounded md:ms-2 hover:bg-white hover:border hover:border-blue-700 hover:text-blue-800'>Add Job +</button>
                </div>

              </div>

              {/* Job listing */}
              <div className='border border-gray-200 p-5 shadow my-5'>
                <div className='flex mb-5'>
                  <div className='w-full'>
                    <h1>Frontend Developer</h1>
                    <hr />
                  </div>
                  <button className='bg-red-900 text-white p-3 ms-5 flex items-center'>Delete <FaArrowUpRightFromSquare className='ms-2' /> </button>

                </div>
                <p className='flex '> <FaLocationDot className='me-2 mt-1' /> Kochi</p>
                <p className='text-lg my-2'>Job Type : Full Time</p>
                <p className='text-lg my-2'>Salary : 2000-3000/month</p>
                <p className='text-lg my-2'>Qualification : Btech</p>
                <p className='text-lg my-2'>Experience : 1-2yr</p>
                <p className='text-lg my-2 text-justify'> Description : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia facere id vero, repellat provident eaque, minima sapiente in, laudantium fugiat doloribus? Laboriosam, repudiandae? Voluptatibus, excepturi!</p>

              </div>
              <p className='text-red-800 font-bold text-2xl'>No Openings</p>

            </div>
            
            
          }
          {applicantStatus &&
            <div className='p-10'>
              <table>
                <thead>
                  <tr>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Sl.No</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Job Title</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Name</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Qualificatio</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>E-Mail</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Phone</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Cover Letter</th>
                    <th className='p-3 text-center bg-blue-800 text-white border border-gray-500'>Resumae</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border border-gray-500 p-2 text-center'>1</td>
                    <td className='border border-gray-500 p-2 text-center'>Software Tester</td>
                    <td className='border border-gray-500 p-2 text-center'>Sijo John</td>
                    <td className='border border-gray-500 p-2 text-center'>Btech</td>
                    <td className='border border-gray-500 p-2 text-center'>gij0@1gamil.com</td>
                    <td className='border border-gray-500 p-2 text-center'>1548595655</td>
                    <td className='border border-gray-500 p-2 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam rerum, facere excepturi aperiam omnis voluptatibus modi delectus ad sequi eligendi doloribus minus. Sapiente, aut modi.</td>
                    <td className='border border-gray-500 p-2 text-center'><Link className='text-blue-500 underline'>Resumae</Link> </td>
                  </tr>
                </tbody>
              </table>
              <p className='text-red-800 font-bold text-xl'>No Applications Are Available</p>
            </div>
          }

        </div>

      </div>
    </>
  )
}

export default AdminCareers