import React, { useState } from 'react'
import {Radio, Row, Col, Tooltip, Progress, Avatar, Menu, Card, Space, DatePicker} from 'antd';
import { AppstoreOutlined, UnorderedListOutlined,} from '@ant-design/icons';
import ProjectListData from './ProjectListData';
import {useHistory} from 'react-router-dom';
import hexToRgba from 'hex-to-rgba';
import { 
	EyeOutlined,
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import utils from 'utils';
import { COLORS } from 'constants/ChartConstant';
import Flex from 'components/shared-components/Flex';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Slider from "./Slider";
import { CARD_ANIMATION } from './style';


const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';


const ItemHeader = ({name, category}) => (
	<div>
		<h4 className="mb-0">{name}</h4>
	</div>
)

const ItemInfo = ({attachmentCount, completedTask, totalTask, statusColor, dayleft}) => (
	<Flex>
		<ul>
			<li>Response code:</li>
			<li>Status:</li>
			<li>Keywords:</li>
			<li>SSL Certificate:</li>
		</ul>

	</Flex>
)

const ItemProgress = ({progression}) => (
	<Progress percent={progression} strokeColor={getProgressStatusColor(progression)} size="small"/>
)

const ItemMember = ({member}) => (
	<>
		{member.map((elm, i) => (
				i <= 2?
			<Tooltip title={elm.name} key={`avatar-${i}`}>
				<Avatar size="small" className={`ml-1 cursor-pointer ant-avatar-${elm.avatarColor}`} src={elm.img} >
					{elm.img? '' : <span className="font-weight-semibold font-size-sm">{utils.getNameInitial(elm.name)}</span>}
				</Avatar>
			</Tooltip>
			:
			null
		))}
		{member.length > 3 ?
			<Tooltip title={`${member.length - 3} More`}>
				<Avatar size={25} className="ml-1 cursor-pointer bg-white border font-size-sm">
					<span className="text-gray-light font-weight-semibold">+{member.length - 3}</span>
				</Avatar>
			</Tooltip>
			:
			null
		}
	</>
)

const ListItem = ({ data, removeId }) => (
	<CARD_ANIMATION color={hexToRgba(data.color)}>
			<Row align="middle">
				<Col xs={24} sm={24} md={8}>
					<ItemHeader name={data.name} category={data.category}/>
				</Col>
				<Col xs={24} sm={24} md={6}>
					<ItemInfo
						attachmentCount={data.attachmentCount}
						completedTask={data.completedTask}
						totalTask={data.totalTask}
						statusColor={data.statusColor}
						dayleft={data.dayleft}
					/>
				</Col>
				<Col xs={24} sm={24} md={5}>
					<ItemProgress progression={data.progression}/>
				</Col>
			</Row>
	</CARD_ANIMATION>
)

const GridItem = ({data, removeId}) => (
	<CARD_ANIMATION color={hexToRgba(data.color)}>
		<Flex alignItems="center" justifyContent="between">
			<ItemHeader name={data.name} category={data.category}/>
		</Flex>
		<div className="mt-1">
			<ItemInfo
				attachmentCount={data.attachmentCount}
				completedTask={data.completedTask}
				totalTask={data.totalTask}
				statusColor={data.statusColor}
				dayleft={data.dayleft}
			/>
		</div>
		<div className="mt-3">
			<ItemProgress progression={data.progression}/>
		</div>

	</CARD_ANIMATION>
)

const getProgressStatusColor = progress => {
	if(progress >= 80) {
		return COLORS[1]
	}
	if(progress < 60 && progress > 30) {
		return COLORS[3]
	}
	if(progress < 30) {
		return COLORS[2]
	}
	return COLORS[0]
}

const ProjectList = () => {
	const history = useHistory();
	const [list, setList] = useState(ProjectListData);
	const VIEW_LIST = 'LIST';
	const VIEW_GRID = 'GRID';
	const [view, setView] = useState(VIEW_GRID);


	const	deleteItem = id =>{
		const data = list.filter(elm => elm.id !== id)
		setList(data)
	}
	const onChangeProjectView = e => {
		setView(e.target.value)
	}

	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	return (
		<>
			<div className={`my-4 ${view === VIEW_LIST? 'container' : 'container-fluid'}`}>
					<Row gutter={16} className="mb-2">
						<Col span={16}>
                        <Slider/>
						</Col>
						<Col span={8}>
							<Flex justifyContent={"end"} >
								<Space>
									<Space direction="vertical">
										<DatePicker onChange={onChange} />
									</Space>
									<Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeProjectView(e)}>
										<Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>
										<Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>
									</Radio.Group>
								</Space>
							</Flex>
						</Col>
					</Row>

				{
					view === VIEW_LIST ?
					list.map(elm => (
						<span onClick={() => history.push(`/app/dashboards/default/view/${elm.id}/${elm.name}`)}>
							<ListItem data={elm} removeId={id => deleteItem(id)} key={elm.id}/>
						</span>
					))
					:
					<Row gutter={16}>
						{list.map(elm => (
							<Col xs={6} sm={6} lg={6} xl={6} xxl={6} key={elm.id}>
								<span onClick={() => history.push(`/app/dashboards/default/view/${elm.id}/${elm.name}`)}>
									<GridItem data={elm} removeId={id => deleteItem(id)}/>
								</span>
							</Col>
						))}
					</Row>
				}
			</div>
		</>
	)
}

export default ProjectList
