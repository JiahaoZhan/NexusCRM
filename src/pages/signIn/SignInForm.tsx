import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { signIn } from "../../redux/slices/user";

export const SignInForm: React.FC = () => {
    const loading = useAppSelector((state) => state.user.loading)
    const jwt = useAppSelector((state) => state.user.token)
    const error = useAppSelector((state) => state.user.error)

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    useEffect(()=>{
        if (jwt !== null) {
            navigate("/")
        }
    }, [jwt])

    const onFinish = async(values: any) => {
        dispatch(signIn({
            email: values.username,
            password: values.password 
        }))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed", errorInfo)
    }

    return (
        <Form
        name="basic"
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username"}]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password"}]}
            >
                <Input.Password/>
            </Form.Item>
            
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" /*loading={loading}*/>Submit</Button>
            </Form.Item>
        </Form>
    )

}