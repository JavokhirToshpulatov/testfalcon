import { Button, Dropdown, Menu, Space } from 'antd';
import React from 'react';
const menu = (
    <Menu>
        <Menu.Item key={"1"}>item 1</Menu.Item>
        <Menu.Item key={"2"}>item 2</Menu.Item>
    </Menu>
);
const AsyncDropDown = () => (
            <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
                <Button type={"primary"}>bottom</Button>
            </Dropdown>
);
export default AsyncDropDown;