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
import {useDispatch, useSelector} from "react-redux";
import {
	getScans,
	getScansAgent,
	getScansDomains,
	getScansHistories,
	getScansKeywords, postNewUser,
	updateDataState
} from "../../../../redux/actions";

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
	const dispatch = useDispatch();
	const {singleScan} = useSelector(state => state.data)
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	const [showTable, setShowTable] = useState("agent")

	useEffect(() => {
		if (singleScan?.id){
			form.setFieldsValue(singleScan)
		}

	}, [singleScan]);

	useEffect(() => {
		dispatch(getScansAgent({
			params:{id:param.id,limit:10,offset:0}
		}))
		dispatch(getScansDomains({
			params:{id:param.id,limit:10,offset:0}
		}))
		dispatch(getScansKeywords({
			params:{id:param.id,limit:10,offset:0}
		}))
		dispatch(getScansHistories({
			params:{id:param.id,limit:10,offset:0}
		}))

		return ()=>{
			dispatch(updateDataState({singleScan:{}}))
		}

	}, []);


	const onFinish = (value) => {
		if (!!param.id){

		}else {

		}
	};

	function showsTable(value) {
     setShowTable(value)
	}

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
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
								<Button type="primary" onClick={() => form.submit()} htmlType="submit" loading={submitLoading} >
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
							/>
						</TabPane>
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
		</>
	)
}

export default ProductForm
