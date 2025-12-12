import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Have a question, feedback, or just want to say hello? We’re always happy to hear from you.
            Reach out using the details below or send us a message directly!
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Address */}
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full text-2xl">
              <FaMapMarkerAlt />
            </div>
            <p className="text-gray-700 text-sm">
              123 Main Street, Apt 4B, <br /> Kochi, Kerala
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-4 rounded-full text-2xl">
              <FaPhoneAlt />
            </div>
            <p className="text-gray-700 text-sm">+91 98765 43210</p>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className="bg-red-100 text-red-600 p-4 rounded-full text-2xl">
              <FaEnvelope />
            </div>
            <p className="text-gray-700 text-sm">bookstore@gmail.com</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Send a Message
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
      <Footer/>
    </>
  );
}
