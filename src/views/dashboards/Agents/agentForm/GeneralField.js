import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';

const rules = {
	name: [
		{
			required: true,
			message: 'Please enter name',
		}
	],
	ipAddress: [
		{
			required: true,
			message: 'Please enter Ip Address',
		}
	],
	description: [
		{
			required: true,
			message: 'Please enter product description',
		}
	],
	scanInterval: [
		{
			required: true,
			message: 'Please enter scanInterval',
		}
	],
	requestInterval: [
		{
			required: true,
			message: 'Please enter requestInterval',
		}
	],
	httpRequestTimeout: [
		{
			required: true,
			message: 'Please enter httpRequestTimeout',
		}
	],
	rabbitMQHostName: [
		{
			required: true,
			message: 'Please enter rabbitMQHostName',
		}
	],
	rabbitMQPort: [
		{
			required: true,
			message: 'Please enter rabbitMQPort',
		}
	],
	rabbitMQUsername: [
		{
			required: true,
			message: 'Please enter username',
		}
	],
	rabbitMQPassword: [
		{
			required: true,
			message: 'Please enter password',
		}
	]
}
const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24}>
			<Card title="Agent Information">
				<Form.Item name="name" label="Name" rules={[{required:true}]}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="ipAddress" label="Ip Address" rules={rules.ipAddress}>
					<Input placeholder="Nmap options" />
				</Form.Item>
				<Form.Item name="description" label="Description" rules={rules.description}>
					<Input.TextArea rows={2} />
				</Form.Item>

			</Card>
			<Card title="Timing">
				<Form.Item name="scanInterval" label="Scan interval (in second)" rules={rules.scanInterval}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="requestInterval" label="Request interval (in second)" rules={rules.requestInterval}>
					<Input placeholder="Nmap options" />
				</Form.Item>
				<Form.Item name="httpRequestTimeout" label="HTTP request timeout (in second)" rules={rules.httpRequestTimeout}>
					<Input placeholder={""} />
				</Form.Item>
			</Card>
			{/*<Card title="RabbitMQ">*/}
			{/*	<Form.Item name="rabbitMQHostName" label="Host" rules={rules.rabbitMQHostName}>*/}
			{/*		<Input placeholder="Host" />*/}
			{/*	</Form.Item>*/}
			{/*	<Form.Item name="rabbitMQPort" label="Port" rules={rules.rabbitMQPort}>*/}
			{/*		<Input placeholder="" />*/}
			{/*	</Form.Item>*/}
			{/*	<Form.Item name="rabbitMQUserName" label="Username" rules={rules.rabbitMQUsername}>*/}
			{/*		<Input placeholder={"Username"} />*/}
			{/*	</Form.Item>*/}
			{/*	<Form.Item*/}
			{/*		label="Password"*/}
			{/*		name="password"*/}
			{/*		rules={[{*/}
			{/*			required: true,*/}
			{/*			message: 'Please enter password!'*/}
			{/*		}]}*/}
			{/*	>*/}
			{/*		<Input.Password />*/}
			{/*	</Form.Item>*/}
			{/*</Card>*/}
		</Col>
	</Row>

)

export default GeneralField
