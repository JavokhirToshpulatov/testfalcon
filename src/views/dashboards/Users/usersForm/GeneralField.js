import React from 'react'
import {Input, Row, Col, Card, Form} from 'antd';



const GeneralField = () => (
    <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
            <Card title="Agent Information">
                <Form.Item name="firstName" label="FirstName" rules={[{required: true}]}>
                    <Input placeholder="FirstName"/>
                </Form.Item>
                <Form.Item name="lastName" label="LastName" rules={[{required: true}]}>
                    <Input placeholder={"LastName"}/>
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{required: true, type: 'email'}]}>
                    <Input placeholder={"Email"}/>
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{required: true}]}>
                   <Input placeholder={"Role"}/>
                </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please enter password!'
                            }]}
                        >
                            <Input.Password/>
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
                                    ({getFieldValue}) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Password not matched!');
                                        },
                                    }),
                                ]
                            }
                        >
                            <Input.Password/>
                        </Form.Item>
            </Card>

        </Col>

    </Row>

)

export default GeneralField
