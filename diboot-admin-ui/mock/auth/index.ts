import type { MockMethod } from 'vite-plugin-mock'
import type { ApiRequest } from '../_util'
import { JsonResult } from '../_util'
import { Random } from 'mockjs'
import * as Element from '@element-plus/icons-vue'

const baseUrl = '/api/auth'

export default [
  // {
  //   url: `${baseUrl}/captcha`,
  //   timeout: Random.natural(50, 100),
  //   method: 'get',
  //   // response: () => Random.dataImage('130x48', 'Diboot')
  //   rawResponse: (req, res) => {
  //     res.setHeader('Content-Type', 'image/gif')
  //     res.setHeader('Pragma', 'No-cache')
  //     res.setHeader('Cache-Control', 'no-cache')
  //     res.write(Random.dataImage('130x48', 'Diboot'))
  //   }
  // },
  {
    url: `${baseUrl}/login`,
    timeout: Random.natural(50, 300),
    method: 'post',
    response: ({ body }: ApiRequest) => {
      if (body.username === 'admin' && body.password === '123456') {
        return JsonResult.OK(Random.string('lower', 32, 32))
      }
      return JsonResult.FAIL_OPERATION('用户名或密码错误')
    }
  },
  {
    url: `${baseUrl}/user-info`,
    timeout: Random.natural(50, 300),
    method: 'get',
    response: ({ headers }: ApiRequest) => {
      const token = headers.authorization
      if (token && token.length >= 32) {
        const name = Random.cname()
        return JsonResult.OK({
          info: {
            realname: name,
            email: Random.email(),
            avatar: Random.image('50x50', Random.color(), Random.color(), name[0])
          },
          roles: [Random.pick(['admin', 'develop', 'test'])]
        })
      }
      return JsonResult.FAIL_INVALID_TOKEN()
    }
  },
  {
    url: `${baseUrl}/logout`,
    timeout: Random.natural(50, 300),
    method: 'post',
    response: () => {
      return JsonResult.OK()
    }
  },
  {
    url: `${baseUrl}/ping`,
    timeout: Random.natural(50, 300),
    method: 'get',
    rawResponse: (req, res) => {
      const token = req.headers.authorization
      if (token && token.length >= 32) res.setHeader('Authorization', Random.string('lower', 32, 32))
      res.end()
    }
  },
  {
    url: `${baseUrl}/route`,
    timeout: Random.natural(50, 300),
    method: 'get',
    response: () => {
      return JsonResult.OK(authMenu)
    }
  }
] as MockMethod[]

// 随机按钮权限
const permission = '@pick(["detail", "create", "update", "delete", "import", "export"])'
// 随机图标
const icon = `Element:@pick(${Object.keys(Element)})`
// 避免@转义
const prefix = '@pick(["@"])/views/'

// 授权菜单
const authMenu = [
  {
    path: '/example',
    name: 'Example',
    meta: { title: '组件示例', icon: 'Element:Guide' },
    children: [
      {
        path: 'rich-text',
        name: 'RichText',
        meta: {
          title: '富文本编辑器',
          icon: 'Element:Edit',
          componentPath: prefix + 'example/RichText.vue',
          sort: 1
        }
      },
      {
        path: 'markdown',
        name: 'Markdown',
        meta: {
          title: 'Markdown编辑器',
          icon: 'Element:Edit',
          componentPath: prefix + 'example/Markdown.vue',
          sort: 2
        }
      }
    ]
  },
  {
    path: 'external',
    name: 'External ',
    meta: { title: '外部链接', icon: 'Element:Connection' },
    children: [
      {
        path: 'diboot-website-iframe',
        name: 'Diboot-Iframe',
        meta: {
          title: 'iframe嵌套',
          icon: 'Element:Promotion',
          url: 'https://www.diboot.com',
          iframe: true
        }
      },
      {
        path: 'diboot-website-href',
        name: 'Diboot-href',
        meta: { title: '外链打开', icon: 'Element:Promotion', url: 'https://www.diboot.com' }
      }
    ]
  },
  {
    path: 'org-structure',
    name: 'OrgUser ',
    redirect: '/org-structure/org',
    meta: { title: '组织架构', icon: 'Element:User' },
    children: [
      {
        path: 'org',
        name: 'Org',
        meta: {
          title: '组织部门',
          componentPath: prefix + 'org-structure/org/index.vue',
          sort: '@natural',
          keepAlive: false,
          icon: 'Element:Folder',
          permissions: ['detail', 'create', 'update', 'delete', 'sort']
        }
      },
      {
        path: 'position',
        name: 'Position',
        meta: {
          title: '岗位管理',
          componentPath: prefix + 'org-structure/position/List.vue',
          sort: '@natural',
          keepAlive: false,
          hollow: false,
          icon: 'Element:Guide',
          permissions: ['detail', 'create', 'update', 'delete']
        }
      },
      {
        path: 'user',
        name: 'User',
        meta: {
          title: '人员管理',
          componentPath: prefix + 'org-structure/user/index.vue',
          sort: '@natural',
          keepAlive: false,
          icon: 'Element:User',
          permissions: ['detail', 'create', 'update', 'delete', 'import', 'export', 'position', 'addPosition']
        }
      }
    ]
  },
  {
    path: 'system',
    name: 'System',
    meta: { title: '系统管理', icon: 'Element:SetUp' },
    children: [
      {
        path: 'dictionary',
        name: 'Dictionary',
        meta: {
          title: '数据字典管理',
          icon: 'Element:Collection',
          componentPath: prefix + 'system/dictionary/List.vue',
          sort: 1,
          keepAlive: false,
          permissions: ['detail', 'create', 'update', 'delete']
        }
      },
      {
        path: 'resource-permission',
        name: 'ResourcePermission',
        meta: {
          title: '资源权限管理',
          icon: 'Element:Menu',
          componentPath: prefix + 'system/resource-permission/List.vue',
          sort: 2,
          keepAlive: false,
          permissions: ['create', 'update', 'delete']
        }
      },
      {
        path: 'role',
        name: 'RoleList',
        meta: {
          title: '用户角色管理',
          icon: 'Element:User',
          componentPath: prefix + 'system/role/List.vue',
          sort: 3,
          permissions: ['detail', 'create', 'update', 'delete']
        }
      },
      {
        path: 'schedule-job',
        name: 'ScheduleJob',
        meta: {
          title: '定时任务管理',
          icon: 'Element:AlarmClock',
          componentPath: prefix + 'system/schedule-job/List.vue',
          keepAlive: false,
          sort: 4,
          permissions: ['create', 'update', 'delete', 'executeOnce', 'logList', 'logDelete']
        }
      },
      {
        path: 'message-template',
        name: 'messageTemplate',
        meta: {
          title: '消息模板管理',
          icon: 'Element:MessageBox',
          componentPath: prefix + 'system/message-template/List.vue',
          keepAlive: false,
          sort: 5,
          permissions: ['detail', 'create', 'update', 'delete']
        }
      },
      {
        path: 'message',
        name: 'message',
        meta: {
          title: '消息记录管理',
          icon: 'Element:Message',
          componentPath: prefix + 'system/message/List.vue',
          keepAlive: false,
          sort: 6,
          permissions: ['detail', 'delete']
        }
      },
      {
        path: 'file-record',
        name: 'FileRecord',
        meta: {
          title: '文件记录管理',
          icon: 'Element:FolderOpened',
          componentPath: prefix + 'system/file-record/List.vue',
          keepAlive: false,
          sort: 8,
          permissions: ['detail', 'update']
        }
      },
      {
        path: 'config',
        name: 'SystemConfig',
        meta: {
          title: '系统配置管理',
          icon: 'Element:Setting',
          componentPath: prefix + 'system/config/index.vue',
          keepAlive: false,
          sort: 8,
          permissions: ['update']
        }
      },
      {
        path: 'operation-log',
        name: 'OperationLog',
        meta: {
          title: '操作日志管理',
          icon: 'Element:Pointer',
          componentPath: prefix + 'system/operation-log/List.vue',
          sort: 9,
          permissions: ['detail']
        }
      },
      {
        path: 'login-trace',
        name: 'LoginTrace',
        meta: {
          title: '登录日志管理',
          icon: 'Element:Document',
          componentPath: prefix + 'system/login-trace/List.vue',
          sort: 10
        }
      },
      {
        path: 'i18n-config',
        name: 'I18nConfig',
        meta: {
          title: '国际化管理',
          icon: 'Element:Setting',
          componentPath: prefix + 'system/i18n-config/List.vue',
          keepAlive: false,
          sort: 11,
          permissions: ['update']
        }
      }
    ]
  }
]
