import React, {useEffect, useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message} from 'antd';
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
import {getAllAgents, getScans} from "../../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

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
						<Button type="danger" icon={<DeleteOutlined />} onClick={()=> {deleteUser(elm.id)}} size="small"/>
					</Tooltip>
				</div>
			)
		}
	];
	


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
