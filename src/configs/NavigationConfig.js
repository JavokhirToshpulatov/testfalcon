import {
  DashboardOutlined,
  DotChartOutlined,
 RadarChartOutlined, BarsOutlined, UsergroupAddOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'dashboards-default',
      path: `${APP_PREFIX_PATH}/dashboards/default`,
      title: 'Default',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-analytic',
      path: `${APP_PREFIX_PATH}/dashboards/analytic`,
      title: 'Analytic',
      icon: DotChartOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-scans',
      path: `${APP_PREFIX_PATH}/dashboards/scans`,
      title: 'Scans',
      icon: RadarChartOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-agents',
      path: `${APP_PREFIX_PATH}/dashboards/agents`,
      title: 'Agents',
      icon: RadarChartOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-domains',
      path: `${APP_PREFIX_PATH}/dashboards/domains`,
      title: 'Domains',
      icon: RadarChartOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-keywords',
      path: `${APP_PREFIX_PATH}/dashboards/keywords`,
      title: 'Keywords',
      icon: BarsOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-users',
      path: `${APP_PREFIX_PATH}/dashboards/users`,
      title: 'Users',
      icon: UsergroupAddOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
