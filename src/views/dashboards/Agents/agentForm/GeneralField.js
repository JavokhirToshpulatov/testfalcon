import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';

const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24}>
			<Card title="Agent Information">
				<Form.Item name="name" label="Name" rules={[{required:true}]}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="ipAddress" label="Ip Address" rules={[{required:true}]}>
					<Input placeholder="Nmap options" />
				</Form.Item>
				<Form.Item name="description" label="Description" >
					<Input.TextArea rows={2} />
				</Form.Item>

			</Card>
			<Card title="Timing">
				<Form.Item name="scanInterval" label="Scan interval (in second)" rules={[{required:true}]}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="requestInterval" label="Request interval (in second)" rules={[{required:true}]}>
					<Input placeholder="Nmap options" />
				</Form.Item>
				<Form.Item name="httpRequestTimeout" label="HTTP request timeout (in second)" rules={[{required:true}]}>
					<Input placeholder={""} />
				</Form.Item>
			</Card>
		</Col>
	</Row>

)

export default GeneralField
