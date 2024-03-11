import React, {useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {
    EyeOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusCircleOutlined,
    PauseCircleOutlined,
    EditOutlined, UnorderedListOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import {useSelector} from "react-redux";


const HistoryTable = () => {
    let history = useHistory();
    const {histories} = useSelector(state => state.data)
    const [list, setList] = useState(ProductListData)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const showUserProfile = item => {
        history.push(`/app/dashboards/scans/history/`+item.id)
    };



    const addProduct = () => {
        history.push(`/app/dashboards/keywords/add-keyword`)
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
            title: 'Start',
            dataIndex: 'start',
        },
        {
            title: 'End',
            dataIndex: 'end',
        },
        {
            title: 'Total',
            dataIndex: 'total',
        },
        {
            title: 'State',
            dataIndex: 'state',
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right d-flex justify-content-end">
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
                    dataSource={histories?.data}
                    rowKey='id'
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

export default HistoryTable
