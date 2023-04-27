import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Drawer, Button, Table, Space, Pagination, message, Select, Form, Input, DatePicker } from 'antd';
import { StarOutlined, StarTwoTone, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react"
import { queryTaskListAPI, formatDate } from '../../utils';
import { Task } from '../../redux';
import { AddTaskForm, EditTaskForm } from '../../components'
import moment from "moment"
import type { ColumnsType } from 'antd/es/table'
import { useAppDispatch, useAppSelector, getAllTasks } from '../../redux';;

const { Header, Content, Sider } = Layout;

const navItems: MenuProps['items'] = [{
  key: 1,
  label: "Home"
},
{
  key: 2,
  label: <Link to="">Add Task</Link>
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
  const [status, setStatus] = useState(null)
  const [addFormVisible, setAddFormVisible] = useState(false)
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [currentRowData, setCurrentRowData] = useState({
    title: '',
    date: '',
    content: '',
    id: ''
  })

  const dispatch = useAppDispatch()
  const jwt = useAppSelector(state => state.user.token)
  const dataSrc = useAppSelector(state => state.task.tasks)

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
        // const fav = dataSrc[index].is_major;
        const fav = 0
        const style = {
          cursor: 'pointer',
          fontSize: '16px'
        }

        const icon = fav === 0 ? <StarOutlined style={style} /> : <StarTwoTone style={style} twoToneColor="#f50" />;

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
        const txt = record.status === 0 ? 'To do' : record.status === 1 ? 'Finished' : 'Deleted';
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
          <Button type="primary" ghost style={{ marginRight: '10px', display: record.status !== 2 ? '' : 'none' }} onClick={() => completeTask(record)}>
            {record.status === 0 ? 'Finished' : record.status === 1 ? 'To do' : null}
          </Button>
          <Button danger style={{ display: record.status !== 2 ? '' : 'none' }} onClick={() => removeTask(record.id)}>Delete</Button>
        </Space>
      )
    }
  ]


  useEffect(() => {
    if (jwt) {
      setLoading(true)
      dispatch(getAllTasks({ jwt: jwt, pageNo: pageNum, pageSize }))
        .then(() => {
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

  const statusChange = (value: string) => {
    console.log('Task status===', typeof value === 'string')
    setStatus(typeof value === 'string' ? null : value);
    setPageNum(1)
  }

  // handler of edit buttons of all rows
  const editTask = (task: Task, index: number) => {
    setCurrentRowData({
      title: task.title,
      date: moment(task.gmt_expire).toString(),
      content: task.content,
      id: task.id
    })
    setEditFormVisible(true)
  }

  const removeTask = (id: number) => {

  }

  const completeTask = (task: Task) => {

  }

  const toggleFav = (task: Task, index: number) => {

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
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div className="content clearfix">
              <div className="list">
                <h2>Task List</h2>
                <div className="list-right">
                  <Space size="middle">
                    <Select size="large" onChange={statusChange} style={{ width: 160 }} allowClear placeholder="Task status">
                      <Option value>All</Option>
                      <Option value={"todo"}>To do</Option>
                      <Option value={"done"}>Done</Option>
                      <Option value={"deleted"}>Delete</Option>
                    </Select>
                    <Button type="primary" size="large" onClick={() => { setAddFormVisible(true) }}><PlusOutlined />Add Task</Button>
                  </Space>
                </div>
              </div>

              <Table
                bordered
                rowKey={record => record.id}
                dataSource={dataSrc}
                columns={columns}
                loading={loading}
                pagination={false}
              />
              <Pagination
                className="pagination"
                total={total}
                style={{ display: loading && total === 0 ? 'none' : '' }}
                showTotal={total => ` ${total} rows`}
                onChange={() => { }}
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
