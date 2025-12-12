import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
    return (
        <>
            <Header />
            <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
                <div>
                    <h1 className='text-6xl text-blue-700'>Congragulations!!!</h1>
                    <p className='mt-5 mb-10'>Thankyou for shopping at Bookstotre, hope you had a great time with us!</p>
                    <Link to={"/all-books"} className='text-blue-900 font-semibold hover:underline transition'>Explore More books...</Link>
                </div>
                <div>
                    <img className='w-3/4' src="https://funtura.in/wp-content/themes/funtura/assets/images/success.svg" alt="" />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default PaymentSuccess