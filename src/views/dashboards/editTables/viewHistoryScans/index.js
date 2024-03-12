import React, {useEffect, useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message, Row, Col} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {
    SearchOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import {useHistory, useParams} from "react-router-dom";
import utils from 'utils'
import {PageHeaderAlt} from "../../../../components/layout-components/PageHeaderAlt";
import {useDispatch, useSelector} from "react-redux";
import {
    getDomainHistories,
    getOneScansHistories, getScansAgent,
    getScansHistoriesResult,
    getSingleDomain
} from "../../../../redux/actions";
import {formatDate} from "../../../../utils/formatDate";
import debounce from "lodash/debounce";

const { Option } = Select

const HistoryTable = () => {
    let {id} = useParams();
    const [pageSize,setPageSize] = useState(10)
    const dispatch= useDispatch();
    useEffect(() => {
        dispatch(getOneScansHistories({id},))
        dispatch(getScansHistoriesResult({params:{limit:pageSize,offset:0},id:id}))
    }, []);
    const history = useHistory();
    const {historyOne} = useSelector(state => state.data)
    const {historyResult} = useSelector(state => state.data)

    const showUserProfile = item => {
        history.push(`/app/dashboards/default/view/${item.scanId}/${item.scanHistoryId}/${item.target}`)
    };









    const tableColumns = [
        {
            title: '#',
            dataIndex: '#'
        },
        {
            title: 'Domain',
            dataIndex: 'target',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            render:formatDate
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
        const value = e.target.value
        dispatch(getScansHistoriesResult({
            params:{limit:pageSize,offset:0,search:value},id:id
        }))
    }

    function onChangeTable({current,pageSize}) {
        setPageSize(pageSize)
        dispatch(getScansHistoriesResult({
            params:{limit:pageSize,offset:(current-1)*pageSize},id:id
        }))
    }




    return (
        <>
            <PageHeaderAlt className="border-bottom mb-5" overlap>
                <div className="container">
                    <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                        <h2 className="mb-3">History</h2>
                    </Flex>
                </div>
            </PageHeaderAlt>
            <Row gutter={16}>
               <Col span={12}>
                   <h2>History Information</h2>
                   <h3>Scan: {historyOne?.scan?.name}</h3>
                   <h3>Scanned: {historyResult?.total}</h3>
                   <h3>Total: {historyOne?.total}</h3>
               </Col>
                <Col span={12}>
                    <Flex justifyContent={"end"}>
                        <h3>Started: {historyOne?.start}</h3>
                    </Flex>
                    <Flex justifyContent={"end"}>
                        <h3>End: {historyOne?.end}</h3>
                    </Flex>
                </Col>
            </Row>
            <hr/>
            <br/>
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
                        dataSource={historyResult?.data}
                        rowKey='id'
                        onChange={onChangeTable}
                        pagination={{
                            total: historyResult?.total, // total elements
                        }}
                    />
                </div>
            </Card>
        </>

    )
}

export default HistoryTable
