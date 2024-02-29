import React, { useState } from "react";
import {Row, Col, Button, Space, Radio} from 'antd';
import StatisticWidget from 'components/shared-components/StatisticWidget';
import ChartWidget from 'components/shared-components/ChartWidget';
import {
  VisitorChartData, 
  AnnualStatisticData, 
} from './DefaultDashboardData';
import {
  RedoOutlined, AppstoreOutlined, UnorderedListOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ProjectList from "./ProjectList";
import Flex from "../../../components/shared-components/Flex";
import AsyncModal from "./AsyncModal";
import AsyncDropDown from "./DropDown";












export const DefaultDashboard = () => {
  const VIEW_LIST = 'LIST';
  const VIEW_GRID = 'GRID';
  const [visitorChartData] = useState(VisitorChartData);
  const [annualStatisticData] = useState(AnnualStatisticData);
  const { direction } = useSelector(state => state.theme)
  const [view, setView] = useState(VIEW_GRID);
  const onChangeProjectView = e => {
    setView(e.target.value)
  }

  return (
    <>

      <br/>
      <Row gutter={16}>
        <Col span={24}>
          <Row gutter={16}  >
            {
              annualStatisticData.map((elm, i) => (
                <Col span={4} key={i}>
                  <StatisticWidget
                    title={elm.title}
                    value={elm.value}
                    status={elm.status}
                    subtitle={elm.subtitle}
                  />
                </Col>
              ))

            }
            <Col span={8}>
              <Col span={24}>
                <Flex justifyContent={"end"}>
                  <Space>
                    <AsyncModal/>
                    <AsyncDropDown/>
                    <Button type={"primary"}> <RedoOutlined /> Refresh</Button>
                  </Space>
                </Flex>
              </Col>
              <Col span={24} className={"pt-2"}>
                <Flex justifyContent={"end"} >
                  <Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeProjectView(e)}>
                    <Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>
                    <Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>
                  </Radio.Group>
                </Flex>
              </Col>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col span={24} >
                <ChartWidget
                  title="Unique Visitors"
                  series={visitorChartData.series}
                  xAxis={visitorChartData.categories}
                  height={'200px'}
                  direction={direction}
                />
            </Col>
          </Row>
        </Col>
      </Row>
     <ProjectList view={view}/>
    </>
  )
}


export default DefaultDashboard;
