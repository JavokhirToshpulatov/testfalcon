import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import {Tabs, Form, Button, message, Row, Col, Space} from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import ProductListData from "assets/data/product-list.data.json"
import {EnvironmentOutlined, HistoryOutlined, InfoCircleOutlined, ToolOutlined} from "@ant-design/icons";
import AgentsTable from "../../editTables/AgentsTable";
import DomainTable from "../../editTables/DomainTable";
import KeywordTable from "../../editTables/KeywordTable";
import HistoryTable from "../../editTables/HistoryTable";
import ScansTable from "../../editTables/ScansTable";
import {useDispatch, useSelector} from "react-redux";
import {getAgentsScan, getDomainHistories, updateDataState} from "../../../../redux/actions";

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
    const {singleAgents} = useSelector(state => state.data)
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)




	useEffect(() => {
		if (singleAgents?.id){
			form.setFieldsValue(singleAgents)
		}
	}, [singleAgents]);

	useEffect(() => {
		dispatch(getAgentsScan({
			params:{id:param.id,limit:10,offset:0}
		}))
		return ()=>{
			dispatch(updateDataState({singleAgents:{}}))
		}
	}, []);


	const onFinish = () => {

	};

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
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Agent' : `Edit Agent`} </h2>
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
								<Button className="mb-3"  type={"primary"}> <InfoCircleOutlined /> Scans</Button>
							</Space>
						</Flex>
					</Col>
					<Col span={24}>
						<ScansTable id={param.id} show={'agent'}/>
					</Col>
				</Row>
				:""}
		</>
	)
}

export default ProductForm
