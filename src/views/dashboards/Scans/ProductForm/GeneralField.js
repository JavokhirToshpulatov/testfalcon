import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';

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
}



const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={17}>
			<Card title="Basic Info">
				<Form.Item name="name" label="Name" rules={rules.name}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="type" label="Type" rules={rules.name}>
					<Input placeholder="Type" />
				</Form.Item>
				<Form.Item name="description" label="Description" rules={rules.description}>
					<Input.TextArea rows={2} />
				</Form.Item>

			</Card>
		</Col>
		<Col xs={24} sm={24} md={7}>
		</Col>
	</Row>
)

export default GeneralField
