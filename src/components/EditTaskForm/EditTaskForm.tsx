import React from "react"
import { TaskForm } from "../Form"
import { Form } from "antd"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../redux"
import { editTask } from "../../redux"
import moment from "moment"

interface Props {
    // to be change later-=
    currentRowData: any,
    visible: boolean
    onEditFormClose: any
}

interface Values {
    id?: number,
    title: string,
    date: any,
    content: string
}


export const EditTaskForm: React.FC<Props> = ({ currentRowData, visible, onEditFormClose }) => {

    // Get jwt token for server side authentication
    const jwt = useAppSelector(state => state.user.token)
    const dispatch = useAppDispatch()

    const [form] = Form.useForm();

    // when the form is mounted, populate the form with the data of the selected row
    useEffect(() => {
        form.setFieldsValue({
            title: currentRowData.title,
            date: moment(currentRowData.date),
            content: currentRowData.content,
            id: currentRowData.id,
        })
    }, [currentRowData])

    const formProps = {
        title: "Edit Task",
        textBtn: "Edit",
        visible,
        currentRowData,
        form
    }

    const onSubmit = (values: Values) => {
        // change the local state
        form.validateFields()
            .then(values => {
                console.log("values:", values)
                const task = {
                    title: values.title,
                    gmt_expire: values.date.toString(),
                    content: values.content,
                    important: false,
                    status: currentRowData.status,
                    id: values.id
                }
                console.log("task to be edited", task)
                // change the value in the database and change the local state
                dispatch(editTask({task: task }))
                    .then((res: any) => {
                        // code successful
                        if (res.payload.code === 0) {
                            onEditFormClose();
                        }
                    })
            })


    }

    const onClose = () => {
        form.resetFields();
        onEditFormClose();
    }


    return <TaskForm onSubmit={onSubmit} onClose={onClose} {...formProps} />
}