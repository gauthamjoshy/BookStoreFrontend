import React from 'react'
import { FaArrowRight, FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function Footer() {
  return (
    <>
    <div className='md:grid grid-cols-3 md:gap-9 bg-gray-900 text-white p-10'>
        <div>
            <h3>About Us</h3>
            <p className='mt-3 text-justify'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem pariatur dolore cumque velit, alias provident, doloribus magni officiis optio error maiores. Voluptatibus repellendus itaque molestias.</p>
        </div>

        <div className='mx-20'>
            <h1 className='font-bold'>NEWS LETTER</h1>
            <p className='my-5'>Stay updated with our latest trends</p>
            <div className='flex'>
                <input type="text" placeholder='Email id' className='p-2 bg-white placeholder-gray-500'/>
                <button className='bg-yellow-400 p-3'><FaArrowRight/></button>

            </div>
        </div>

        <div>
                <h3>Follow Us</h3>
                <p className='my-5'>Let Us Be Social</p>
                <div className='flex mt-3'>
                    <FaFacebookF className='me-3 text-2xl'/>
                    <FaInstagram className='me-3 text-2xl'/>
                    <FaXTwitter className='me-3 text-2xl'/>
                    <FaLinkedin className='me-3 text-2xl'/>


                </div>
            </div>

    </div>

    <div className='bg-black p-3 text-center text-white'>
        <p>Copyright @ 2023 All Rights Reserved | This wbsite is made with &#9824;	</p>

    </div>
    </>
  )
}

export default Footer