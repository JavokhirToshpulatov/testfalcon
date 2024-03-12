import {Row, Col, List, Space, DatePicker} from 'antd';
import {useParams} from 'react-router-dom';
import Slider from "./Slider";
import Flex from "../../../components/shared-components/Flex";
import React, {useEffect, useState} from "react";
import ReactDiffViewer from "react-diff-viewer";
import {getAllAgents, getScanHtmlCurrent, getScanHtmlPrevious, getScanWebHistories} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";


const ViewCard = () => {
    const {scanId,domainID, domainName} = useParams();
    const dispatch = useDispatch();
    const {scanWebHistories} = useSelector(state=>state.data)
    const {scanHtmlCurrent} = useSelector(state=>state.data)
    const {scanHtmlPrevious} = useSelector(state=>state.data)



    useEffect(() => {
        dispatch(getScanWebHistories({
            params:{ScanId:scanId,ScanHistoryId:domainID,Target:domainName}
        }))
        dispatch(getScanHtmlCurrent({
            canId:1,historyId:31728,target:'lui.uz'
        }))
        dispatch(getScanHtmlPrevious({
            canId:1,historyId:31728,target:'lui.uz'
        }))

    }, []);


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
                            <b className='text-primary'> Url: {scanWebHistories?.url} </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Response Code: {scanWebHistories?.httpStatus}</b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Web site status: {scanWebHistories?.webSiteStatus}</b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Found keyword: </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> IP Address: {scanWebHistories?.ipAddress}  </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Timestamp: {scanWebHistories?.timestamp}</b>
                        </List.Item>
                    </List>
                </Col>
                <Col span={12}>
                    <List style={{ padding: '20px 30px'}}>
                        <List.Item>
                            <b className='text-primary'> Status: {scanWebHistories?.sslCertificateStatus}</b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Valid after: {scanWebHistories?.sslNotValidAfter} </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Valid before: {scanWebHistories?.sslNotValidBefore}</b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Issuer: {scanWebHistories?.sslIssuer} </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Subject: {scanWebHistories?.sslSubject} </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Authority key identifier: {scanWebHistories?.sslAuthorityKeyIdentifier}</b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Subject key identifier: {scanWebHistories?.sslSubjectKeyIdentifier} </b>
                        </List.Item>
                        <List.Item>
                            <b className='text-primary'> Serial number: {scanWebHistories?.sslSerialNumber} </b>
                        </List.Item>
                    </List>
                </Col>
            </Row>
            <br/>
             <div style={{maxHeight: "70vh", overflowY: "scroll"}}>
                 {scanHtmlPrevious !=="" && scanHtmlCurrent !=="" ?
                     <ReactDiffViewer  oldValue={"salom"} newValue={"salomlar"} splitView={true}/>
                     : ""
                 }

            </div>

        </>
    )
}


export default ViewCard;