import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import {FilterOutlined} from "@ant-design/icons";
const AsyncModal = () => {
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
               < FilterOutlined /> Filter
            </Button>
            <Modal
                title="Title"
                visible={open}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};
export default AsyncModal;