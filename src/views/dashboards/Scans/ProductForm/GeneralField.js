import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';





const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={17}>
			<Card title="Basic Info">
				<Form.Item name="name" label="Name" rules={[{required:true}]}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="type" label="Type" rules={[{required:true}]}>
					<Input placeholder="Type" />
				</Form.Item>
				<Form.Item name="description" label="Description" rules={[{required:true}]}>
					<Input.TextArea rows={2} />
				</Form.Item>
			</Card>
		</Col>
		<Col xs={24} sm={24} md={7}>
		</Col>
	</Row>
)

export default GeneralField
