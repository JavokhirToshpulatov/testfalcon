import React, {useEffect, useState} from 'react'
import {Card, Table, Select, Input, Button, Badge, Menu, Tooltip, message, Popconfirm} from 'antd';
import {
	EyeOutlined,
	DeleteOutlined,
	SearchOutlined,
	PlusCircleOutlined,
	EditOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteDomains, deleteKeywords, getAllAgents, getDomains, getKeywords} from "../../../../redux/actions";
import {formatDate} from "../../../../utils/formatDate";
import debounce from "lodash/debounce";
import {getTargetType} from "../../../../utils/calculateStatus";






const ProductList = () => {
	let history = useHistory();
	const dispatch = useDispatch();
	const {domains} = useSelector(state=>state.data)

	useEffect(() => {
		dispatch(getDomains({
			params:{limit:10,offset:0}
		}))
	}, []);

  const showUserProfile = item => {
	  history.push(`/app/dashboards/domains/edit-domains/`+item?.id)
	};


	const confirm = (e) => {
		dispatch(deleteDomains({id:e}))
		message.success('Click on Yes');
	};
	const cancel = (e) => {
		message.error('Click on No');
	};


	const addProduct = () => {
		history.push(`/app/dashboards/domains/add-domains`)
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
			title: 'Type',
			dataIndex: 'type',
			render:getTargetType
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
		dispatch(getDomains({
			params:{limit:10,offset:1,search:value}
		}))

	}

	function onChangeTable({current,pageSize}) {
		dispatch(getDomains({
			params:{ limit:pageSize, offset:current*pageSize}
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
					dataSource={domains?.data}
					rowKey='id'
					onChange={onChangeTable}
						pagination={{
						total: domains?.total,
					}}

				/>
			</div>
		</Card>
	)
}

export default ProductList
