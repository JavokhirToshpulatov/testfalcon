import React from 'react'
import { Input, Row, Col, Card, Form } from 'antd';




const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24}>
			<Card title="Agent Information">
				<Form.Item name="name" label="Name" rules={[{required:true}]}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="description" label="Description">
					<Input.TextArea rows={2} />
				</Form.Item>
			</Card>
		</Col>
	</Row>

)

export default GeneralField
