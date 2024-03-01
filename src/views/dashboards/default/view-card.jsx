import {Row, Col, List} from 'antd';
import {useParams} from 'react-router-dom';


const ViewCard = () => {
    const {domainID, domainName} = useParams();

    return (
        <>
            <h2 className='text-center'> Domain - {domainName}  </h2>
            <br />
            <Row gutter={30}>
                <Col span={12}>
                    <List style={{backgroundColor: '#f6f6f6', padding: '20px 30px'}}>
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
                    <List style={{backgroundColor: '#f6f6f6', padding: '20px 30px'}}>
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
        </>
    )
}


export default ViewCard;