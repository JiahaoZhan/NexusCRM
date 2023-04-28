import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { signIn } from "../../redux/slices/user";
import { useState } from "react"
import facebook from "../../assets/images/facebook.png"
import google  from "../../assets/images/google.png"
import  signInImg  from "../../assets/images/signInImg.jpg"

export const SignInForm: React.FC = () => {
    const loading = useAppSelector((state) => state.user.loading)
    const error = useAppSelector((state) => state.user.error)
    const [pwdInputVisible, setPwdInputVisible]= useState("hidden")
    const [emailInputVisible, setEmailInputVisible] = useState("block")
    const [nextBtnVisible, setNextBtnVisible] = useState("block")
    const [submitBtnVisible, setSubmitBtnVisible] = useState('hidden')
    const [backBtnVisible, setBackBtnVisible] = useState('hidden')

    const onClickNext = () => {
        setEmailInputVisible("hidden")
        setNextBtnVisible('hidden')
        setPwdInputVisible("block")
        setSubmitBtnVisible('block')
        setBackBtnVisible('block')
    }

    const onClickBack= () => {
        setEmailInputVisible("block")
        setNextBtnVisible('block')
        setPwdInputVisible("hidden")
        setSubmitBtnVisible('hidden')
        setBackBtnVisible('hidden')
    }
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        dispatch(signIn({
            email: values.username,
            password: values.password
        }))
        .then(() => {
            navigate('/')
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed", errorInfo)
    }

    return (
        <div className="p-6 md:p-20">
        {/* <!-- Top Content --> */}
        <h2 className="font-mono mb-5 text-4xl font-bold">Log In</h2>
        <p className="max-w-sm mb-5 font-sans font-light text-gray-600">
        Streamline your business and strengthen client relationships
        </p>
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your username" }]}
                className={`${emailInputVisible}`}
            >
                <Input placeholder="Email" className='w-full p-3 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your password" }]}
                className={`${pwdInputVisible}`}
            >
                <Input.Password placeholder="Password" className='w-full p-3 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
            </Form.Item>

            
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="font-sans font-light text-gray-600">Remember me</Checkbox>
            </Form.Item>

            <span className="font-thin text-cyan-700">Forgot password</span>

        {/* <input
          type="text"
          className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
          placeholder="Enter your email address"
        /> */}

        {/* <!-- Middle Content --> */}
        <div
          className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 mt-6"
        >

          <button
            onClick={onClickNext}
            className={`${nextBtnVisible} w-full md:w-auto flex justify-center items-center p-3 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150`}
          >
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="13" y1="18" x2="19" y2="12" />
              <line x1="13" y1="6" x2="19" y2="12" />
            </svg>
          </button>

        <div>
        <Form.Item className={`${backBtnVisible} inline-block mr-3`}>
          <Button 
            onClick={onClickBack}
            block={true}
            className={'w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150'}
          >
            <span className="hover:text-white">Back</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="13" y1="18" x2="19" y2="12" />
              <line x1="13" y1="6" x2="19" y2="12" />
            </svg>
          </Button>
          </Form.Item>
          <Form.Item className={`${submitBtnVisible} inline-block ml-3`}>
                <Button block={true} className="w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"htmlType="submit" /*loading={loading}*/>
                <span className="hover: text-white">Sign In</span>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="13" y1="18" x2="19" y2="12" />
                <line x1="13" y1="6" x2="19" y2="12" />
                </svg>
                </Button>
          </Form.Item>
        </div>

          </div>
          </Form>
     

        {/* <!-- Border --> */}
        <div className="mt-12 border-b border-b-gray-300"></div>
{/*   
        <!-- Bottom Content --> */}
        <p className="py-6 text-sm font-thin text-center text-gray-400">
          or log in with
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
    )

}