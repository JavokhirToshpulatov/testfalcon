import React, {useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message} from 'antd';
import {
    SearchOutlined,
     UnorderedListOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDomainHistories, getScansDomains} from "../../../redux/actions";


const DomainHistoryTable = () => {
    const {histories} = useSelector(state => state.data)
    const history = useHistory();
    const dispatch = useDispatch();
    let {id} = useParams();



    const showUserProfile = item => {
        history.push(`/app/dashboards/default/view/${item.id}/${item.name}`)
    };
    const tableColumns = [
        {
            title: '#',
            dataIndex: '#'
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
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


    const onSearch = e => {
        const value = e.currentTarget.value
        dispatch(getDomainHistories({
            params:{id:id,limit:10,offset:0,search:value}
        }))
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

export default DomainHistoryTable
