import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import {useDispatch} from "react-redux";
import {postNewUser} from "../../../../redux/actions";

const { TabPane } = Tabs;


const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	const { mode = ADD, param } = props
   const dispatch = useDispatch()
	const [form] = Form.useForm();
	const [submitLoading, setSubmitLoading] = useState(false)



	const onFinish = (value) => {
		if (!!param.id){

		}else {
			dispatch(postNewUser({data:value}))
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
		</>
	)
}

export default ProductForm
