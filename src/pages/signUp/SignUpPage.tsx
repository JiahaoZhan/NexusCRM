import React from "react"
import { SignUpForm } from "./SignUpForm"
import facebook from "../../assets/images/facebook.png"
import google  from "../../assets/images/google.png"
import signUpImg from "../../assets/images/signUpImg.png"


export const SignUpPage: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
    {/* <!-- Card Container --> */}
    <div
      className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0 "
    >
      {/* <!-- Left Side --> */}
      <div className="p-6 md:p-20">
        {/* <!-- Top Content --> */}
        <h2 className="font-mono mb-5 text-4xl font-bold">Sign Up</h2>
        <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
        Nexus CRM - the ultimate solution for managing your clients with ease and efficiency.
        </p>
        
        {/* <!-- Middle Content --> */}
        <div    
          className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0"
        >
            <SignUpForm/>
        </div>

        {/* <!-- Border --> */}
        <div className="mt-12 border-b border-b-gray-300"></div>

        {/* <!-- Bottom Content --> */}
        <p className="py-6 text-sm font-thin text-center text-gray-400">
          or sign up with
        </p>

        {/* <!-- Bottom Buttons Container --> */}
        <div
          className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0"
        >
          <button
            className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
          >
            <img src={facebook} alt="" className="w-9" />
            <span className="font-thin">Facebook</span>
          </button>
          <button
            className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
          >
            <img src={google} alt="" className="w-9" />
            <span className="font-thin">Google</span>
          </button>
        </div>
      </div>

      {/* <!-- Right Side --> */}
      <img src={signUpImg} alt="" className="w-[430px] hidden md:block object-cover" />

      {/* <!-- Close Button --> */}
      <div
        className="group absolute -top-5 right-4 flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-black group-hover:text-gray-600"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </div>
  </div>
)