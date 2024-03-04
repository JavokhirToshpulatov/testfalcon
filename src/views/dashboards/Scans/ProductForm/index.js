import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import {Tabs, Form, Button, message, Row, Col, Space, Radio} from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import {
	EnvironmentOutlined, HistoryOutlined,
	InfoCircleOutlined,
	ToolOutlined,
} from "@ant-design/icons";
import AgentsTable from "../../editTables/AgentsTable";
import DomainTable from "../../editTables/DomainTable";
import KeywordTable from "../../editTables/KeywordTable";
import HistoryTable from "../../editTables/HistoryTable";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	const [showTable, setShowTable] = useState("agent")

   

	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl =>{
				setImage(imageUrl)
				setUploadLoading(true)
			});
		}
	};

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if(mode === ADD) {
					message.success(`Created ${values.name} to product list`);
				}
				if(mode === EDIT) {
					message.success(`Product saved`);
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	function showsTable(value) {
     setShowTable(value)
	}

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Scans' : `Edit Scans	`} </h2>
							<div className="mb-3">
								<Button className="mr-2">Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField 
								uploadedImg={uploadedImg} 
								uploadLoading={uploadLoading} 
								handleUploadChange={handleUploadChange}
							/>
						</TabPane>
						{/*<TabPane tab="Variation" key="2">*/}
						{/*	<VariationField />*/}
						{/*</TabPane>*/}
						{/*<TabPane tab="Shipping" key="3">*/}
						{/*	<ShippingField />*/}
						{/*</TabPane>*/}
					</Tabs>
				</div>
			</Form>
			<br/>
			{mode==='EDIT'?<Row gutter={16}  >
					<Col span={24}>
						<Flex justifyContent={"center"}>
							<Space>
								<Button className="mb-3"  onClick={()=>showsTable("agent")} type={"primary"}> <InfoCircleOutlined /> Agents</Button>
								<Button className="mb-3"  onClick={()=>showsTable("domain")}  type={"primary"}> <EnvironmentOutlined /> Domains</Button>
								<Button className="mb-3"  onClick={()=>showsTable("keyword")} type={"primary"}> <ToolOutlined /> Keywords</Button>
								<Button className="mb-3"  onClick={()=>showsTable("history")} type={"primary"}> <HistoryOutlined /> History</Button>
							</Space>
						</Flex>
					</Col>
				<Col span={24}>
					{showTable==='agent'?<AgentsTable/>:showTable==='domain'?<DomainTable/>:showTable==='keyword'?<KeywordTable/>:showTable==='history'?<HistoryTable/>:""}
				</Col>
				</Row>
				:""}
		{/*	Agar mode edit bulsa tablelarni chiqarish kerak*/}
		</>
	)
}

export default ProductForm
