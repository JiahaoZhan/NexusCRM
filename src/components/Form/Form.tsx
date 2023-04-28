import React from "react"
import { Form, Input, DatePicker, Drawer, Button, FormInstance } from "antd"


interface Values {
    id?: number,
    title: string,
    date: any,
    content: string
}

interface IProps {
    title: string,
    textBtn: string,
    visible: boolean,
    form: FormInstance,
    onSubmit: (event: any) => void,
    onClose: () => void
}

export const TaskForm: React.FC<IProps> = ({ title,
    textBtn,
    visible,
    onSubmit,
    onClose,
    form,
}) => {

    const onReset = () => {
        form.resetFields();
    }

    return <Drawer
        forceRender
        title={title}
        width={600}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        maskClosable={false}
        footer={
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button className={"text-white bg-blue-500"} onClick={onSubmit} type="primary">{textBtn}</Button>
                <Button onClick={onReset}>Reset</Button>
                <Button onClick={onClose} danger>Cancel</Button>
            </div>
        }
    >
        <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
        >
            <Form.Item
                label="Task Id"
                name="id"
                hidden={true}
            >
                <Input></Input>
            </Form.Item>
            <Form.Item
                label="Task Name"
                name="title"
                rules={[{ required: true, message: 'Please input task name' }]}
            >
                <Input placeholder="task name" />
            </Form.Item>
            <Form.Item
                label="Deadline"
                name="date"
                rules={[{ required: true, message: 'Please pick a deadline' }]}
            >
                <DatePicker inputReadOnly={true} placeholder="deadline" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                label="Task content"
                name="content"
                rules={[{ required: true, message: 'Please input task content' }]}
            >
                <Input.TextArea rows={7} placeholder="task content" className="textarea" />
            </Form.Item>
        </Form>
    </Drawer>
}