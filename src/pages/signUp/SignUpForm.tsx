import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
    const navigate = useNavigate()
    const onFinish = async(values : any) => {
        try {
            await axios.post("http://localhost:8088/auth/signUp", {
                email: values.username,
                password: values.password,
                confirmPassword: values.confirm
            }).then((result)=>{
                console.log(result)
            })
            navigate('/signIn')
        } catch (error) {
            console.log(error)
            alert('Fail to sign up. Please try again')
        }
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[{required: true, message: "Please enter your username"}]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: "Please enter your password"}]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
            label="Confirm Password"
            name="confirm"
            hasFeedback
            rules={[
                {
                    required: true, message: "Please confirm your password"
                },
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject("Two passwords do not match")
                    }
                })
            ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
