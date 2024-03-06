import {Row, Col, List, Space, DatePicker} from 'antd';
import {useParams} from 'react-router-dom';
import Slider from "./Slider";
import Flex from "../../../components/shared-components/Flex";
import React from "react";
import ReactDiffViewer from "react-diff-viewer";


const ViewCard = () => {
    const oldCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
</body>
</html>
`;

    const a ="hello"

    const newCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatiblehacked" content="IE=edge">
    <meta name="viewportsalom" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<a>salom</a>
<h3>hello</h3>
<a>salom</a>
<h3>hello123</h3>
</body>
</html>
`;

    const {domainID, domainName} = useParams();
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>


            <h2 className='text-center'> Domain - {domainName}  </h2>
            <br />
            <Row gutter={16} className="mb-2">
                <Col span={20}>
                    <Slider/>
                </Col>
                <Col span={4}>
                    <Flex justifyContent={"end"} >
                        <Space>
                            <Space direction="vertical">
                                <DatePicker onChange={onChange} />
                            </Space>
                        </Space>
                    </Flex>
                </Col>
            </Row>
            <br/>
            <Row gutter={30}>
                <Col span={12}>
                    <List style={{padding: '20px 30px'}}>
                        <List.Item>
                            <b className='text-primary'> Url: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Response Code: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Web site status:</b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Found keyword: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> IP Address: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Timestamp </b>:
                        </List.Item>
                    </List>
                </Col>
                <Col span={12}>
                    <List style={{ padding: '20px 30px'}}>
                        <List.Item>
                            <b className='text-primary'> Status: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Valid after: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Valid before:</b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Issuer: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Subject: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Authority key identifier: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Subject key identifier: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Serial number: </b>
                        </List.Item>
                    </List>
                </Col>
            </Row>
            <br/>
            <div style={{maxHeight:"70vh",overflowY:"scroll"}}>
                 <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true}/>
            </div>
        </>
    )
}


export default ViewCard;