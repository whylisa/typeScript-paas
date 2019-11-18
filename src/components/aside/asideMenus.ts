export const menus: any[] = [
  {
    label: '首页',
    ico: 'el-icon-location',
    children: [],
  },
  {
    label: '企业管理',
    ico: 'el-icon-location',
    children: [
      {
        label: '企业管理',
        url: '/businessMgt',
        ico: 'el-icon-setting',
      },
      {
        label: '交易管理',
        url: '/transactionMgt',
        ico: 'el-icon-picture-outline',
      },
    ],
  },
  {
    label: '通道商城',
    ico: 'el-icon-location',
    children: [
      {
        label: '通道列表',
        url: '/channelList',
        ico: 'el-icon-setting',
      },
      {
        label: '审核管理',
        url: '/channelCheck',
        ico: 'el-icon-picture-outline',
      },
    ],
  },
  {
    label: '通道管理',
    ico: 'el-icon-location',
    children: [
      {
        label: '通道管理',
        url: '/channelMgt',
        ico: 'el-icon-setting',
      },
      {
        label: '字典管理',
        url: '/auditSMS',
        ico: 'el-icon-picture-outline',
      },
    ],
  },
];
