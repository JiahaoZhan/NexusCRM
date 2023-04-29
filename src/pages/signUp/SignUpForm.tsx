import { Form, Input, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux";
import { signUp } from "../../redux";

export const SignUpForm = () => {
    const loading = useAppSelector((state) => state.user.loading)
    const error = useAppSelector((state) => state.user.error)

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        dispatch(signUp({
            email: values.username,
            password: values.password
        }))
        .then(()=> {
            navigate('/signIn')
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <Form className="w-full"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: "Please enter your username" }]}
            >
                <Input placeholder="email" className='w-full p-3 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
            >
                <Input.Password placeholder="password" className='w-full p-3 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
            </Form.Item>

            <Form.Item
                name="confirm"
                hasFeedback
                rules={[
                    {
                        required: true, message: "Please confirm your password"
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("Two passwords do not match")
                        }
                    })
                ]}
            >
                <Input.Password placeholder="confirm password" className='w-full p-3 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light'/>
            </Form.Item>

            
            <Form.Item>
                <Button type="primary" htmlType="submit" className="hover:bg-cyan-700 w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150" >
                    Sign up
                </Button>
            </Form.Item>

            <div className="flex items-center justify-between">
                <span className=" text-cyan-700">Already a member? <Link to="/SignIn">Sign in</Link></span>
            </div>
        </Form>
    )
}
