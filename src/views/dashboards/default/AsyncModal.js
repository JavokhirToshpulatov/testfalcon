import {Button, Modal, Space, Typography, Divider} from 'antd';
import React, {useState} from 'react';
import {FilterOutlined} from "@ant-design/icons";



const AsyncModal = () => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState([]);
    
    const toggleOpen = () => setOpen(p => !p);


    return (
        <>
            <Button type="primary" onClick={toggleOpen}>
               < FilterOutlined /> Filter
            </Button>
            <Modal
                title="Filter"
                visible={open}
                onCancel={toggleOpen}
            >
                <Typography.Paragraph strong>Web site Status</Typography.Paragraph>
                <Space>
                    <Button>Content changed</Button>
                    <Button>Keyword found</Button>
                </Space>

                <Divider/>
                
                <Typography.Paragraph strong>HTTP status</Typography.Paragraph>
                <Space>
                    <Button>1xx</Button>
                    <Button>2xx</Button>
                    <Button>3xx</Button>
                    <Button>4xx</Button>
                    <Button>5xx</Button>
                    <Button> {"> 100"} </Button>
                </Space>

                <Divider/>

                <Typography.Paragraph strong>SSL sertificate status</Typography.Paragraph>
                <Space wrap>
                    <Button>Not available</Button>
                    <Button>Name mismatch</Button>
                    <Button>Chain error</Button>
                    <Button>Expired</Button>
                    <Button>Not valid</Button>
                </Space>

            </Modal>
        </>
    );
};
export default AsyncModal;