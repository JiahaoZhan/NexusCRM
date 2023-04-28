import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Button, Table, Space, Pagination, Select } from 'antd';
import { StarOutlined, StarTwoTone, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react"
import { formatDate } from '../../utils';
import { AddTaskForm, EditTaskForm } from '../../components'
import moment from "moment"
import type { ColumnsType } from 'antd/es/table'
import { useAppDispatch, useAppSelector, getAllTasks, deleteTask, updateStatus, filterFinished, filterImportant, filterTodo, filterAll, Task, updateTaskMark} from '../../redux';;

const { Header, Content, Sider } = Layout;

const navItems: MenuProps['items'] = [
{
  key: 1,
  label: <Link to="">Sign Out</Link>
}
]

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

export const Home: React.FC = () => {
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  const [addFormVisible, setAddFormVisible] = useState(false)
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({
    title: '',
    date: '',
    content: '',
    id: '',
    status: ''
  })

  const dispatch = useAppDispatch()
  const jwt = useAppSelector(state => state.user.token)
  const dataSrc = useAppSelector(state => {
    const tasks = state.task.tasks.filter((task)=>{
      switch (state.task.filter) {
        case "important":
          return task.important
        case "todo":
          return task.status === "To do"
        case "finished":
          return task.status === "Finished"
        default:
          return true
      }
    })
    return tasks
  })

  const columns: ColumnsType<Task> = [
    {
      title: 'Order',
      key: 'id',
      align: 'center',
      render: (text: any, record: any, index: number) => {
        let num = (pageNum - 1) * 10 + index + 1;
        return num;
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: any, record: any, index: number) => {
        const fav = dataSrc[index].important
        const style = {
          cursor: 'pointer',
          fontSize: '16px'
        }

        const icon = fav === false ? <StarOutlined style={style} /> : <StarTwoTone style={style} twoToneColor="#f50" />;

        return <div><span onClick={() => toggleFav(record, index)}>{icon}</span> {record.title}</div>;
      }
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Deadline',
      dataIndex: 'gmt_expire',
      key: 'gmt_expire',
      render: (text: any, record: any) => formatDate(record.gmt_expire)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (text: any, record: any) => {
        const txt = record.status
        return txt;
      }
    },
    {
      title: 'Actions',
      key: 'action',
      width: 300,
      align: 'center',
      render: (text: any, record: any, index: number) => (
        <Space size="middle">
          <Button style={{ marginRight: '10px', display: record.status !== 2 ? '' : 'none' }} onClick={() => editTask(record, index)}>Edit</Button>
          <Button type="primary" ghost style={{ marginRight: '10px', display: record.status !== 2 ? '' : 'none' }} onClick={() => completeTask(record, index)}>
            {record.status === "To do" ? 'Finish' : record.status === "Finished" ? 'To do' : null}
          </Button>
          <Button danger style={{ display: record.status !== 2 ? '' : 'none' }} onClick={() => removeTask(record.id)}>Delete</Button>
        </Space>
      )
    }
  ]


  useEffect(() => {
    if (jwt) {
      setLoading(true)
      dispatch(getAllTasks({ pageNo: pageNum, pageSize }))
        .then((result: any) => {
          if (result.payload.data) {
            setTotal(result.payload.data.rows.length)
          }
          else {
            setTotal(0)
          }
          setLoading(false)
        })
    }
  }, [])

  const { Option } = Select;

  const onAddFormClose = () => {
    setAddFormVisible(false)
  }

  const onEditFormClose = () => {
    setEditFormVisible(false)
  }

  const filterChange = (value: string) => {
    switch (value) {
      case "todo":
        dispatch(filterTodo())
        break;
      case "finished":
        dispatch(filterFinished())
        break;
      case "important":
        dispatch(filterImportant())
        break;
      default:
        dispatch(filterAll()) 
      break;
    }
  }

  // handler of edit buttons of all rows
  const editTask = (task: Task, index: number) => {
    setCurrentRowData({
      title: task.title,
      date: moment(task.gmt_expire).toString(),
      content: task.content,
      id: task.id,
      status: task.status
    })
    setEditFormVisible(true)
  }

  const removeTask = (id: string) => {
    dispatch(deleteTask({id}))
                    .then((res: any) => {
                        // code successful
                        if (res.payload.code === 0) {
                            onEditFormClose();
                        }
                    })
                    setTotal(total => total - 1)
  }

  const completeTask = (task: Task, index: number) => {
    const id = task.id
    const status = task.status
    dispatch(updateStatus({id, index, status}))
  }

  const toggleFav = (task: Task, index: number) => {   
    const id = task.id
    const important = task.important
    dispatch(updateTaskMark({id, index, important}))
  }
  
  const getPageData = (dataSrc: Task[] ) => {
    return dataSrc.slice((pageNum-1)*pageSize, pageNum*pageSize)  
  }

  const onPageChange = (pageNum: number, pageSize: number) => {
    setPageNum(pageNum)
    setPageSize(pageSize)
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={navItems} />
      </Header>
      <Layout>
        {/* <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider> */}
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div className="content clearfix">
              <div className="list" style={{marginBottom: 20}}>
                <h2>Task List</h2>
                <div className="list-right">
                  <Space size="middle">
                    <Select defaultValue="all" size="large" onChange={filterChange} style={{ width: 160 }} allowClear placeholder="Task status">
                      <Option value={"all"}>All</Option>
                      <Option value={"todo"}>To do</Option>
                      <Option value={"finished"}>Finished</Option>
                      <Option value={"important"}>Important</Option>
                    </Select>
                    <Button type="primary" size="large" onClick={() => { setAddFormVisible(true) }}><PlusOutlined />Add Task</Button>
                  </Space>
                </div>
              </div>

              <Table
                bordered
                rowKey={record => record.id}
                dataSource={getPageData(dataSrc)}
                columns={columns}
                loading={loading}
                pagination={false}
                style={{marginBottom: 20}}
              />
              <Pagination
                className="pagination"
                total={total}
                style={{ display: loading && total === 0 ? 'none' : '' }}
                showTotal={total => ` ${total} rows`}
                onChange={onPageChange}
                current={pageNum}
                showSizeChanger={false}
                defaultPageSize={pageSize}
                hideOnSinglePage={false}
              />
            </div>
            <AddTaskForm visible={addFormVisible} onAddFormClose={onAddFormClose} />
            <EditTaskForm visible={editFormVisible} onEditFormClose={onEditFormClose} currentRowData={currentRowData} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
