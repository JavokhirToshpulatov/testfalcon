import React, {useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {
    DeleteOutlined,
    SearchOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'

const { Option } = Select

const getStockStatus = stockCount => {
    if(stockCount >= 10) {
        return <><Badge status="success" /><span>In Stock</span></>
    }
    if(stockCount < 10 && stockCount > 0) {
        return <><Badge status="warning" /><span>Limited Stock</span></>
    }
    if(stockCount === 0) {
        return <><Badge status="error" /><span>Out of Stock</span></>
    }
    return null
}




const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']

const AgentsTable = () => {
    let history = useHistory();
    const [list, setList] = useState(ProductListData)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const showUserProfile = userInfo => {
        history.push(`/app/dashboards/agents/edit-agent/45`)

    };




    const addProduct = () => {
        history.push(`/app/dashboards/agents/add-agent`)
    }

    const deleteUser = userId => {
        this.setState({
            users: this.state.users.filter(item => item.id !== userId),
        })
        message.success({ content: `Deleted user ${userId}`, duration: 2 });
    }



    const viewDetails = row => {
        history.push(`/app/apps/ecommerce/edit-product/${row.id}`)
    }

    const deleteRow = row => {
        const objKey = 'id'
        let data = list
        if(selectedRows.length > 1) {
            selectedRows.forEach(elm => {
                data = utils.deleteArrayRow(data, objKey, elm.id)
                setList(data)
                setSelectedRows([])
            })
        } else {
            data = utils.deleteArrayRow(data, objKey, row.id)
            setList(data)
        }
    }

    const tableColumns = [
        {
            title: '#',
            dataIndex: '#'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex">
                </div>
            ),
        },
        {
            title: 'IP Address',
            dataIndex: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Created',
            dataIndex: 'created',
        },
        {
            title: 'Last modified',
            dataIndex: 'last modified',
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right d-flex justify-content-end">
                    <Tooltip title="Delete">
                        <Button className="mr-2" type="danger" icon={<DeleteOutlined />} onClick={()=> {deleteUser(elm.id)}} size="small"/>
                    </Tooltip>
                    <Tooltip title="View">
                        <Button type="primary" className="mr-2" icon={<UnorderedListOutlined />} onClick={() => {showUserProfile(elm)}} size="small"/>
                    </Tooltip>
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (key, rows) => {
            setSelectedRows(rows)
            setSelectedRowKeys(key)
        }
    };

    const onSearch = e => {
        const value = e.currentTarget.value
        const searchArray = e.currentTarget.value? list : ProductListData
        const data = utils.wildCardSearch(searchArray, value)
        setList(data)
        setSelectedRowKeys([])
    }

    const handleShowCategory = value => {
        if(value !== 'All') {
            const key = 'category'
            const data = utils.filterArray(ProductListData, key, value)
            setList(data)
        } else {
            setList(ProductListData)
        }
    }

    return (
        <Card>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                <Flex className="mb-1" mobileFlex={false}>
                    <div className="mr-md-3 mb-3">
                        <Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
                    </div>
                </Flex>
            </Flex>
            <div className="table-responsive">
                <Table
                    columns={tableColumns}
                    dataSource={list}
                    rowKey='id'
                    rowSelection={{
                        selectedRowKeys: selectedRowKeys,
                        type: 'checkbox',
                        preserveSelectedRowKeys: false,
                        ...rowSelection,
                    }}
                    pagination={{
                        total: 60, // total elements
                        pageSize: 10, // element size
                        // current: backend dan kelgan page || hozirgi page
                    }}
                />
            </div>
        </Card>
    )
}

export default AgentsTable