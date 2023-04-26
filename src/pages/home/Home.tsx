import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Drawer, Button, Table, Space, Pagination, message, Select, Form, Input, DatePicker } from 'antd';
import { StarOutlined, StarTwoTone, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from "react"

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
  const [dataSrc, setDataSrc] = useState([])

  const { Option } = Select;


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
                    <Select size="large" onChange={() => { }} style={{ width: 160 }} allowClear placeholder="请筛选任务状态">
                      <Option value>All</Option>
                      <Option value={0}>To do</Option>
                      <Option value={1}>Done</Option>
                      <Option value={2}>Delete</Option>
                    </Select>
                    <Button type="primary" size="large" onClick={() => { }}><PlusOutlined /> 添加任务</Button>
                  </Space>
                </div>
              </div>

              <Table
                bordered
                // rowKey={record => record.id}
                dataSource={dataSrc}
                // columns={columns}
                loading={loading}
                pagination={false}
              />
              <Pagination
                className="pagination"
                total={total}
                style={{ display: loading && total === 0 ? 'none' : '' }}
                showTotal={total => `共 ${total} 条数据`}
                onChange={() => { }}
                current={pageNum}
                showSizeChanger={false}
                defaultPageSize={pageSize}
                hideOnSinglePage={false}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
