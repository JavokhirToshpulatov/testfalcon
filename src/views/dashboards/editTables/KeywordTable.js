import React, {useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message, Popconfirm} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {
    EyeOutlined,
    DeleteOutlined,
    SearchOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import {useHistory, useParams} from "react-router-dom";
import utils from 'utils'
import {useDispatch, useSelector} from "react-redux";
import {deleteScans, getScansHistories, getScansKeywords} from "../../../redux/actions";
import {formatDate} from "../../../utils/formatDate";
import debounce from "lodash/debounce";

const KeywordTable = () => {
    let history = useHistory();
    const {scanKeywords} = useSelector(state => state.data)
    let {id} = useParams();
    const dispatch = useDispatch();
    const [pageSize,setPageSize] = useState(10)



    const showUserProfile = item => {
        history.push(`/app/dashboards/keywords/edit-keyword/`+item?.id)
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
                            <Button size="small" type="danger" className="mr-2"><DeleteOutlined/></Button>
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
        dispatch(getScansKeywords({
            params:{id:id,limit:pageSize,offset:0,search:value}
        }))
    }

    function onChangeTable({current,pageSize}) {
        setPageSize(pageSize)
        dispatch(getScansKeywords({
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
                    dataSource={scanKeywords?.data}
                    onChange={onChangeTable}
                    rowKey='id'
                    pagination={{
                        total: scanKeywords?.total, // total elements
                    }}
                />
            </div>
        </Card>
    )
}

export default KeywordTable
