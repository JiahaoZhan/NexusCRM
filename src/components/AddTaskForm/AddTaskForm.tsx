import React from "react"
import { TaskForm } from "../Form"
import { Form } from "antd"
import { addTask } from "../../redux"
import { useAppSelector, useAppDispatch } from "../../redux"
import { v4 as uuidv4 } from 'uuid';


interface Props {
    visible: boolean
    onAddFormClose: any
}

export const AddTaskForm: React.FC<Props> = ({ visible, onAddFormClose }) => {

    // Get jwt token for server side authentication
    const jwt = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()
    const [form] = Form.useForm();

    const formProps = {
        title: "Add Task",
        textBtn: "Add",
        visible,
        form,
    }

    const onSubmit = () => {
        // retrieve the form data
        form.validateFields()
            .then(values => {
                const task = {
                    title: values.title,
                    gmt_expire: values.date.toString(),
                    content: values.content,
                    important: false,
                    status: "todo",
                    id: uuidv4(),
                }
                // request to api to add task to database
                dispatch(addTask({ task: task }))
                    .then(res => {
                        console.log("Adding task: ", res);
                    })
            })
        onAddFormClose()
    }

    const onClose = () => {
        form.resetFields();
        onAddFormClose();
    }

    return <TaskForm onSubmit={onSubmit} onClose={onClose} {...formProps} />
}