import React from "react"
import { TaskForm } from "../Form"
import { Form } from "antd"
import { useState, useEffect } from "react"
import { addTask } from "../../redux"
import { useAppSelector, useAppDispatch } from "../../redux"
import moment from "moment"

export const AddTaskForm: React.FC = () => {
    
    // Get jwt token for server side authentication
    const jwt = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()

    const [visible, toggleVisible] = useState(true);
    const [currentRowData, setRowData] = useState({
        id: -1,
        title: '',
        date: '',
        content: ''
    })


    const [form] = Form.useForm();

    const formProps = {
        title: "Add Task",
        textBtn: "Add",
        visible,
        currentRowData,
        form
    }

    const onSubmit = () => {
        // retrieve the form data
        form.validateFields()
        .then(values=> {
            const task = {
                title: values.title,
                gmt_expire: moment(values.date).valueOf(),
                content: values.content
                }
                // request to api to add task to database
                dispatch(addTask({jwt: jwt, task: task}))
                .then(res => {
                    console.log("Adding task: ", res);
                    toggleVisible(false)
                    
                })
        })
    }

    const onClose = () => {
        form.resetFields();
        toggleVisible(false)
        setRowData({
            id: -1,
            title: '',
            date: '',
            content: ''
        })
    }


    return <TaskForm onSubmit={onSubmit} onClose={onClose} {...formProps}/>
}