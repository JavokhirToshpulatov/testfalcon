import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import {Tabs, Form, Button, message, Row, Col, Space} from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import ProductListData from "assets/data/product-list.data.json"
import {InfoCircleOutlined} from "@ant-design/icons";
import ScansTable from "../../editTables/ScansTable";
import {useDispatch, useSelector} from "react-redux";
import {getDomainScans, getKeywordsScan, updateDataState} from "../../../../redux/actions";

const { TabPane } = Tabs;

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param } = props
	const {singleKeyword} = useSelector(state => state.data)
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [submitLoading, setSubmitLoading] = useState(false)

	useEffect(() => {
		if (singleKeyword?.id){
			form.setFieldsValue(singleKeyword)
		}


	}, [singleKeyword]);

	useEffect(() => {
		dispatch(getKeywordsScan({
			params:{id:param.id,limit:10,offset:0}
		}))
		return ()=>{
			dispatch(updateDataState({singleKeyword:{}}))
		}
	}, []);


	const onFinish = (value) => {
		if (!!param.id){

		}else {

		}
	};

	function discard() {
		history.go(-1)
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
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Keyword' : `Edit Keyword`} </h2>
							<div className="mb-3">
								<Button onClick={()=>discard()} className="mr-2">Discard</Button>
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
			{mode==='EDIT'?<Row gutter={16}  >
					<Col span={24}>
						<Flex justifyContent={"center"}>
							<Space>
								<Button className="mb-3" type={"primary"}> <InfoCircleOutlined /> Scans</Button>
							</Space>
						</Flex>
					</Col>
					<Col span={24}>
						<ScansTable id={param.id} show={'keyword'}/>
					</Col>
				</Row>
				:""}
		</>
	)
}

export default ProductForm
