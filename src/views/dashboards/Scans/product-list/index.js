import React, {useEffect, useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message, Popconfirm} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {
	DeleteOutlined,
	SearchOutlined,
	PlusCircleOutlined,
	PauseCircleOutlined,
	EditOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'
import {deleteAgents, deleteScans, getAllAgents, getKeywords, getScans} from "../../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {formatDate} from "../../../../utils/formatDate";
import debounce from "lodash/debounce";
import {getScanState, getScanType} from "../../../../utils/calculateStatus";

const { Option } = Select




const ProductList = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const {allScans} = useSelector(state=>state.data)
	const [pageSize,setPageSize] = useState(10)

	useEffect(() => {
		dispatch(getScans({
			params:{limit:pageSize,offset:0}
		}))
	}, []);


	const addProduct = () => {
		history.push(`/app/dashboards/scans/add-product`)
	}

	const showUserProfile = item => {
		history.push(`/app/dashboards/scans/edit-scan/`+item.id)
	};

	const confirm = (e) => {
		dispatch(deleteScans({id:e}))
		message.success('Click on Yes');
	};
	const cancel = (e) => {
		message.error('Click on No');
	};


	const deleteUser = userId => {
		this.setState({
			users: this.state.users.filter(item => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}
	

	

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
			title: 'State',
			dataIndex: 'state',
			render:getScanState
		},
		{
			title: 'Type',
			dataIndex: 'type',
			render:getScanType
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
					<Tooltip title="Stop">
						<Button className="mr-2" danger icon={<PauseCircleOutlined />} onClick={()=> {deleteUser(elm.id)}} size="small"/>
					</Tooltip>
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EditOutlined/>} onClick={() => {showUserProfile(elm)}} size="small"/>
					</Tooltip>
					<Tooltip title="Delete">
						<Popconfirm
							title="Are you sure to delete this keyword?"
							onConfirm={()=>confirm(elm?.id)}
							onCancel={cancel}
							okText="Yes"
							cancelText="No"
						>
							<Button size="small" type="danger"><DeleteOutlined/></Button>
						</Popconfirm>
					</Tooltip>
				</div>
			)
		}
	];
	


	const onSearch = e => {
		const value = e.target.value
		dispatch(getScans({
			params:{limit:pageSize,offset:0,search:value}
		}))
	}


	function onChangeTable({current,pageSize}) {
		setPageSize(pageSize)
		dispatch(getScans({
			params:{ limit:pageSize, offset:(current-1)*pageSize}
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
				<div>
					<Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block> Create</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={allScans?.data}
					rowKey='id'
					onChange={onChangeTable}
					pagination={{
						total: allScans?.total,
					}}
				/>
			</div>
		</Card>
	)
}

export default ProductList
