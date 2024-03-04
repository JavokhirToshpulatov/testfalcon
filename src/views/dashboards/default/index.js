import React, { useState } from "react";
import {Row, Col, Button, Space, Radio} from 'antd';
import StatisticWidget from 'components/shared-components/StatisticWidget';
import ChartWidget from 'components/shared-components/ChartWidget';
import {
  VisitorChartData,
  AnnualStatisticData, ActiveMembersData,
} from './DefaultDashboardData';
import {
  RedoOutlined, AppstoreOutlined, UnorderedListOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ProjectList from "./ProjectList";
import Flex from "../../../components/shared-components/Flex";
import AsyncModal from "./AsyncModal";
import AsyncDropDown from "./DropDown";
import ApexChart from "react-apexcharts";
import {apexLineChartDefaultOption, COLOR_2} from "../../../constants/ChartConstant";


const MembersChart = props => (
    <ApexChart {...props}/>
)
const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      }
    },
    colors: [COLOR_2],
  }
}










export const DefaultDashboard = () => {
  const VIEW_LIST = 'LIST';
  const VIEW_GRID = 'GRID';
  const [visitorChartData] = useState(VisitorChartData);
  const [annualStatisticData] = useState(AnnualStatisticData);
  const [activeMembersData] = useState(ActiveMembersData);

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
            <Col span={16} >
              <StatisticWidget
                  title={
                    <MembersChart
                        options={memberChartOption}
                        series={activeMembersData}
                        height={30}
                    />
                  }
              />
            </Col>
            <Col span={8}>
              <Flex justifyContent={"end"}>
                <Space>
                  <AsyncModal/>
                  <AsyncDropDown/>
                  <Button type={"primary"}> <RedoOutlined /> Refresh</Button>
                  {/*<Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeProjectView(e)}>*/}
                  {/*  <Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>*/}
                  {/*  <Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>*/}
                  {/*</Radio.Group>*/}
                </Space>
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
     <ProjectList view={view}/>
    </>
  )
}


export default DefaultDashboard;
