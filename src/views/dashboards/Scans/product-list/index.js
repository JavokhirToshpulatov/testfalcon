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
import {deleteAgents, deleteScans, getAllAgents, getScans} from "../../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const { Option } = Select




const ProductList = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const {allScans} = useSelector(state=>state.data)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		dispatch(getScans({
			params:{limit:10,offset:0}
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
		},
		{
			title: 'Type',
			dataIndex: 'type',
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
		const value = e.currentTarget.value
		dispatch(getScans({
			params:{limit:10,offset:0,search:value}
		}))
	}


	const handleOnChangeTable = ({current, pageSize}) => {
		console.log(current)
		console.log(pageSize)
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
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
					onChange={handleOnChangeTable}
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

export default ProductList
