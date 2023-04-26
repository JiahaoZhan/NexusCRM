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
    currentRowData: Values,
    form: FormInstance,
    onSubmit: (event: any) => void,
    onClose: () => void
}

export const TaskForm: React.FC<IProps> = ({title,
    textBtn,
    visible,
    onSubmit,
    onClose,
    form
}) => {

    const onReset = () => {
        form.resetFields();
    }

    return <Drawer
    forceRender
    title={ title }
    width={ 600 }
    onClose={ onClose }
    visible={ visible }
    bodyStyle={{ paddingBottom: 80 }}
    maskClosable={ false }
    footer={
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Button onClick={ onSubmit } type="primary">{ textBtn }</Button>
            <Button onClick={ onReset }>Reset</Button>
            <Button onClick={ onClose } danger>Cancel</Button>
        </div>
    }
>
    <Form
        form={ form }
        layout="vertical"
        name="form_in_modal"
    >
        <Form.Item
            label="任务名称"
            name="title"
            rules={[{ required: true, message: '请输入任务名称' }]}
        >
            <Input placeholder="请输入任务名称" />
        </Form.Item>
        <Form.Item 
            label="截止日期"
            name="date"
            rules={[{ required: true, message: '请选择截止日期' }]}
        >
            <DatePicker inputReadOnly={ true } placeholder="请选择截止日期" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item 
            label="任务内容"
            name="content"
            rules={[{ required: true, message: '请输入任务内容' }]}
        >
            <Input.TextArea rows={ 7 } placeholder="请输入任务内容" className="textarea" />
        </Form.Item>
    </Form>
</Drawer>
}