import React from "react"
import { SignInForm } from "./SignInForm"
import signInImg  from "../../assets/images/signInImg.jpg"

export const SignInPage: React.FC = (props) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-rose-50">
        {/* <!-- Card Container --> */}
        <div
          className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0"
        >
          {/* <!-- Left Side --> */}
          <SignInForm/>
  
          {/* <!-- Right Side --> */}
          <img src={signInImg} alt="" className="w-[430px] hidden md:block" />
  
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
}