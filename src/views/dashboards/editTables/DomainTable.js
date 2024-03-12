import React, {useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message, Popconfirm} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {
    EyeOutlined,
    DeleteOutlined,
    SearchOutlined,
    EditOutlined, UnorderedListOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import {useHistory, useParams} from "react-router-dom";
import utils from 'utils'
import {useDispatch, useSelector} from "react-redux";
import {getDomainHistories, getScansDomains} from "../../../redux/actions";
import {formatDate} from "../../../utils/formatDate";
import debounce from "lodash/debounce";


const DomainTable = () => {
    let history = useHistory();
    const {scanDomains} = useSelector(state => state.data)
    let {id} = useParams();
    const [pageSize,setPageSize] = useState(10)
    const dispatch = useDispatch();



    const showUserProfile = item => {
        history.push(`/app/dashboards/domains/edit-domains/`+item.id)
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
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Created',
            dataIndex: 'created',
            render:formatDate
        },
        {
            title: 'Last modified',
            dataIndex: 'lastModified',
            render:formatDate
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
                            <Button className="mr-2" size="small" type="danger"><DeleteOutlined/></Button>
                        </Popconfirm>
                    </Tooltip>
                    <Tooltip title="View">
                        <Button type="primary" className="mr-2" icon={<UnorderedListOutlined />} onClick={() => {showUserProfile(elm)}} size="small"/>
                    </Tooltip>
                </div>
            )
        }
    ];


    const onSearch = e => {
        const value = e.target.value
        dispatch(getScansDomains({
            params:{id:id,limit:pageSize,offset:0,search:value}
        }))
    }

    function onChangeTable({current,pageSize}) {
        setPageSize(pageSize)
        dispatch(getScansDomains({
            params:{id:id,limit:pageSize,offset:(current-1)*pageSize}
        }))
    }




    return (
        <Card>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                <Flex className="mb-1" mobileFlex={false}>
                    <div className="mr-md-3 mb-3">
                        <Input placeholder="Search" prefix={<SearchOutlined />} onChange={debounce(onSearch,500)}/>
                    </div>
                </Flex>
            </Flex>
            <div className="table-responsive">
                <Table
                    columns={tableColumns}
                    dataSource={scanDomains?.data}
                    onChange={onChangeTable}
                    rowKey='id'
                    pagination={{
                        total: scanDomains?.total,
                    }}

                />
            </div>
        </Card>
    )
}

export default DomainTable
