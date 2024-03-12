import React, {useEffect, useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message, Popconfirm} from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import {
	DeleteOutlined,
	SearchOutlined,
	PlusCircleOutlined,
	EditOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import {useDispatch, useSelector} from "react-redux";
import {deleteDomains, deleteKeywords, getAllAgents, getDomains, getKeywords} from "../../../../redux/actions";



const ProductList = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const {keywords} = useSelector(state=>state.data)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const showUserProfile = item => {
	  history.push(`/app/dashboards/keywords/edit-keyword/`+item?.id)
	};

	useEffect(() => {
		dispatch(getKeywords({
			params:{limit:10,offset:1}
		}))
	}, []);



	const addProduct = () => {
		history.push(`/app/dashboards/keywords/add-keyword`)
	}



	const confirm = (e) => {
        dispatch(deleteKeywords({id:e}))
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
		const value = e.currentTarget.value
		dispatch(getKeywords({
			params:{Limit:10,Offset:0,Search:value}
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
				<div>
					<Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block> Create</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={keywords?.data}
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

export default ProductList
