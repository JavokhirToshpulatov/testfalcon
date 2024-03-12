import React, {useEffect, useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message, Popconfirm} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined, EditOutlined} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import {useDispatch, useSelector} from "react-redux";
import {deleteAgents, deleteOneUser, getAllUsers, getScans} from "../../../../redux/actions";
import debounce from "lodash/debounce";

const ProductList = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const {users} = useSelector(state=>state.data)
	const [pageSize,setPageSize] = useState(10)


	useEffect(() => {
		dispatch(getAllUsers({
			params:{limit:10,offset:0}
		}))
	}, []);
  const showUserProfile = userInfo => {
	  history.push(`/app/dashboards/users/edit-user`)
	};



	const addProduct = () => {
		history.push(`/app/dashboards/users/add-user`)
	}


	const confirm = (e) => {
		dispatch(deleteOneUser({id:e}))
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
			title: 'First name',
			dataIndex: 'firstName',
		},
		{
			title: 'Last name',
			dataIndex: 'lastName',
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
		dispatch(getAllUsers({
			params:{limit:10,offset:0,search:value}
		}))
	}

	function onChangeTable({current,pageSize}) {
		setPageSize(pageSize)
		dispatch(getAllUsers({
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
					dataSource={users?.data}
					onChange={onChangeTable}
					rowKey='id' 
					pagination={{
						total: users?.total,
					}}
				/>
			</div>
		</Card>
	)
}

export default ProductList
