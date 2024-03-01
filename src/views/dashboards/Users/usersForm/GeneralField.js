import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Option } = Select;

const rules = {
	name: [
		{
			required: true,
			message: 'Please enter product name',
		}
	],
	description: [
		{
			required: true,
			message: 'Please enter product description',
		}
	],
	price: [
		{
			required: true,
			message: 'Please enter product price',
		}
	],
	comparePrice: [		
	],
	taxRate: [		
		{
			required: true,
			message: 'Please enter tax rate',
		}
	],
	cost: [		
		{
			required: true,
			message: 'Please enter item cost',
		}
	]
}

const imageUploadProps = {
  name: 'file',
	multiple: true,
	listType: "picture-card",
	showUploadList: false,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
}

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']
const tags = ['Cotton', 'Nike', 'Sales', 'Sports', 'Outdoor', 'Toys', 'Hobbies' ]

const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24}>
			<Card title="Agent Information">
				<Form.Item name="firstName" label="FirstName" rules={rules.name}>
					<Input placeholder="FirstName" />
				</Form.Item>
				<Form.Item name="lastName" label="LastName" rules={rules.description}>
					<Input placeholder={"LastName"}/>
				</Form.Item>
				<Form.Item name="email" label="Email" rules={rules.description}>
					<Input placeholder={"Email"}/>
				</Form.Item>
				<Form.Item name="role" label="Role" >
					<Select mode="tags" style={{ width: '100%' }} placeholder="Role">
						{tags.map(elm => <Option key={elm}>{elm}</Option>)}
					</Select>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[{
						required: true,
						message: 'Please enter password!'
					}]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="Confirm Password"
					name="confirmPassword"
					rules={
						[
							{
								required: true,
								message: 'Please confirm your password!'
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve();
									}
									return Promise.reject('Password not matched!');
								},
							}),
						]
					}
				>
					<Input.Password />
				</Form.Item>

			</Card>
			{/*<Card title="Pricing">*/}
			{/*	<Row gutter={16}>*/}
			{/*		<Col xs={24} sm={24} md={12}>*/}
			{/*			<Form.Item name="price" label="Price" rules={rules.price}>*/}
			{/*			<InputNumber*/}
			{/*				className="w-100"*/}
			{/*				formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*/}
			{/*				parser={value => value.replace(/\$\s?|(,*)/g, '')}*/}
			{/*			/>*/}
			{/*			</Form.Item>*/}
			{/*		</Col>*/}
			{/*		<Col xs={24} sm={24} md={12}>*/}
			{/*			<Form.Item name="comparePrice" label="Compare price" rules={rules.comparePrice}>*/}
			{/*				<InputNumber*/}
			{/*					className="w-100"*/}
			{/*					value={0}*/}
			{/*					formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*/}
			{/*					parser={value => value.replace(/\$\s?|(,*)/g, '')}*/}
			{/*				/>*/}
			{/*			</Form.Item>*/}
			{/*		</Col>*/}
			{/*		<Col xs={24} sm={24} md={12}>*/}
			{/*			<Form.Item name="cost" label="Cost per item" rules={rules.cost}>*/}
			{/*				<InputNumber*/}
			{/*					className="w-100"*/}
			{/*					formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*/}
			{/*					parser={value => value.replace(/\$\s?|(,*)/g, '')}*/}
			{/*				/>*/}
			{/*			</Form.Item>*/}
			{/*		</Col>*/}
			{/*		<Col xs={24} sm={24} md={12}>*/}
			{/*			<Form.Item name="taxRate" label="Tax rate" rules={rules.taxRate}>*/}
			{/*				<InputNumber*/}
			{/*					className="w-100"*/}
			{/*					min={0}*/}
			{/*					max={100}*/}
			{/*					formatter={value => `${value}%`}*/}
			{/*					parser={value => value.replace('%', '')}*/}
			{/*				/>*/}
			{/*			</Form.Item>*/}
			{/*		</Col>*/}
			{/*	</Row>*/}
			{/*</Card>*/}
		</Col>
		{/*<Col xs={24} sm={24} md={7}>*/}
		{/*	<Card title="Upload file">*/}
		{/*		<Dragger {...imageUploadProps} beforeUpload={beforeUpload} onChange={e=> props.handleUploadChange(e)}>*/}
		{/*			{*/}
		{/*				props.uploadedImg ?*/}
		{/*					<img src={props.uploadedImg} alt="avatar" className="img-fluid" />*/}
		{/*					:*/}
		{/*					<div>*/}
		{/*						{*/}
		{/*							props.uploadLoading ?*/}
		{/*								<div>*/}
		{/*									<LoadingOutlined className="font-size-xxl text-primary"/>*/}
		{/*									<div className="mt-3">Uploading</div>*/}
		{/*								</div>*/}
		{/*								:*/}
		{/*								<div>*/}
		{/*									<CustomIcon className="display-3" svg={ImageSvg}/>*/}
		{/*									<p>Click or drag file to upload</p>*/}
		{/*								</div>*/}
		{/*						}*/}
		{/*					</div>*/}
		{/*			}*/}
		{/*		</Dragger>*/}
		{/*	</Card>*/}
		{/*	/!*<Card title="Organization">*!/*/}
		{/*	/!*		<Form.Item name="category" label="Category" >*!/*/}
		{/*	/!*			<Select className="w-100" placeholder="Category">*!/*/}
		{/*	/!*				{*!/*/}
		{/*	/!*					categories.map(elm => (*!/*/}
		{/*	/!*						<Option key={elm} value={elm}>{elm}</Option>*!/*/}
		{/*	/!*					))*!/*/}
		{/*	/!*				}*!/*/}
		{/*	/!*			</Select>*!/*/}
		{/*	/!*		</Form.Item>*!/*/}
		{/*	/!*		<Form.Item name="tags" label="Tags" >*!/*/}
		{/*	/!*		<Select mode="tags" style={{ width: '100%' }} placeholder="Tags">*!/*/}
		{/*	/!*			{tags.map(elm => <Option key={elm}>{elm}</Option>)}*!/*/}
		{/*	/!*		</Select>*!/*/}
		{/*	/!*		</Form.Item>*!/*/}
		{/*	/!*	</Card>*!/*/}
		{/*</Col>*/}
	</Row>

)

export default GeneralField
