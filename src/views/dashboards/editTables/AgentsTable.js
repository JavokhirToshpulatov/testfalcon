import React, {useEffect, useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message, Popconfirm} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {
    DeleteOutlined,
    SearchOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import {useSelector} from "react-redux";
import {getScansAgent} from "../../../redux/actions";

const AgentsTable = () => {
    let history = useHistory();
    const {scanAgents} = useSelector(state => state.data)


    const showUserProfile = item => {
        history.push(`/app/dashboards/agents/edit-agent/`+item.id)
    };


    const confirm = (e) => {
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        message.error('Click on No');
    };




    const tableColumns = [
        {
            title: '#',
            dataIndex: '#'
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'IP Address',
            dataIndex: 'ipAddress',
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
            dataIndex: 'lastModified',
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right d-flex justify-content-end">
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Are you sure to delete this keyword?"
                            onConfirm={()=>confirm(elm?.id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button size="small" className="mr-2" type="danger"><DeleteOutlined/></Button>
                        </Popconfirm>
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
                    dataSource={scanAgents?.data}
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

export default AgentsTable