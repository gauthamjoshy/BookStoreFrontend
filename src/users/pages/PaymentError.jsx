import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'

function PaymentError() {
    return (
        <>

            <Header />
            <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
                <div>
                    <h1 className='text-6xl text-blue-700'>Sorry, your payment failed!!!</h1>
                    <p className='mt-5 mb-10'>We apologize for the inconvenience caused and appreciate your visit to BookStore</p>
                    <Link to={"/all-books"} className='text-blue-900 font-semibold hover:underline transition'>Explore More books...</Link>
                </div>
                <div>
                    <img className='w-3/4' src="https://media.licdn.com/dms/image/v2/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=KbpvWM0SaQqnLiMtyKfvGLj9Ta1YugKhz9Y-LN1uS2A" alt="" />
                </div>
            </div>

            <Footer />


        </ >
    )
}

export default PaymentError