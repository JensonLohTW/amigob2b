/**
 * 隐私政策内容数据
 */

import { PolicySection, ContactInfo } from '../types'

export const LAST_UPDATED = '2025年1月25日'

export const policySections: PolicySection[] = [
  {
    id: 'scope',
    title: '第一章 适用范围',
    content: [
      {
        type: 'paragraph',
        content: '本隐私政策适用于您使用本公司提供的所有服务，包括但不限于：',
      },
      {
        type: 'list',
        content: [
          'AMIGO 官方网站（amigob2b.vercel.app）',
          '加盟申请和咨询服务',
          '客户服务和技术支持',
          '营销活动和推广服务',
          '其他相关业务服务',
        ],
      },
      {
        type: 'paragraph',
        content:
          '当您使用我们的服务时，即表示您同意本隐私政策的条款。如果您不同意本政策的任何部分，请勿使用我们的服务。',
      },
    ],
  },
  {
    id: 'collection',
    title: '第二章 个人资料的收集',
    content: [
      {
        type: 'subsection',
        content: {
          title: '2.1 收集的资料类型',
          content: [
            {
              type: 'paragraph',
              content: '我们可能收集以下类型的个人资料：',
            },
            {
              type: 'list',
              content: [
                '基本身份资料：姓名、身份证号码、出生日期',
                '联系资料：电话号码、电子邮件地址、通讯地址',
                '财务资料：银行账户资料、信用卡资料（仅用于加盟费用处理）',
                '商业资料：公司名称、统一编号、营业地址',
                '技术资料：IP地址、浏览器类型、设备资料',
                '使用行为：网站浏览记录、服务使用情况',
              ],
            },
          ],
        },
      },
      {
        type: 'subsection',
        content: {
          title: '2.2 收集方式',
          content: [
            {
              type: 'list',
              content: [
                '您主动提供：填写表单、注册账户、申请服务时',
                '自动收集：使用网站时的技术资料和行为数据',
                '第三方来源：合作伙伴、公开资料库',
                '线下收集：实体门店、展会、商务会议',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'usage',
    title: '第三章 个人资料的使用',
    content: [
      {
        type: 'paragraph',
        content: '我们基于以下合法基础使用您的个人资料：',
      },
      {
        type: 'list',
        content: [
          '履行合约：处理加盟申请、提供服务、客户支持',
          '合法利益：改善服务质量、业务发展、安全维护',
          '法律义务：遵循相关法规要求、配合政府调查',
          '您的同意：营销推广、个性化服务',
        ],
      },
      {
        type: 'highlight',
        content: {
          type: 'info',
          title: '重要提醒',
          content:
            '我们承诺仅在必要范围内使用您的个人资料，不会用于本政策未明确说明的其他目的。',
        },
      },
    ],
  },
  {
    id: 'sharing',
    title: '第四章 个人资料的分享与披露',
    content: [
      {
        type: 'subsection',
        content: {
          title: '4.1 可能分享的情况',
          content: [
            {
              type: 'list',
              content: [
                '服务提供商：协助我们提供服务的第三方公司',
                '法律要求：依法律规定或政府机关要求',
                '业务转让：公司合并、收购或资产转让时',
                '紧急情况：保护用户或公众安全的紧急情况',
              ],
            },
          ],
        },
      },
      {
        type: 'subsection',
        content: {
          title: '4.2 第三方服务',
          content: [
            {
              type: 'paragraph',
              content: '我们使用以下第三方服务，这些服务可能会收集您的资料：',
            },
            {
              type: 'table',
              content: {
                headers: ['服务类型', '服务提供商', '收集资料', '隐私政策'],
                rows: [
                  [
                    '网站分析',
                    'Google Analytics',
                    '使用行为数据',
                    'policies.google.com',
                  ],
                  [
                    '客户服务',
                    'Zendesk',
                    '联系资料、对话记录',
                    'zendesk.com/privacy',
                  ],
                  ['支付处理', '绿界科技', '交易资料', 'ecpay.com.tw/privacy'],
                ],
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: 'cookies',
    title: '第五章 Cookie 使用说明',
    content: [
      {
        type: 'subsection',
        content: {
          title: '5.1 什么是 Cookie',
          content: [
            {
              type: 'paragraph',
              content:
                'Cookie 是网站储存在您设备上的小型文本文件，用于改善您的浏览体验和网站功能。',
            },
          ],
        },
      },
      {
        type: 'subsection',
        content: {
          title: '5.2 我们使用的 Cookie 类型',
          content: [
            {
              type: 'table',
              content: {
                headers: ['Cookie 类型', '用途', '保存期限', '是否必要'],
                rows: [
                  ['必要 Cookie', '网站基本功能运作', '会话期间', '是'],
                  ['功能 Cookie', '记住用户偏好设置', '1年', '否'],
                  ['分析 Cookie', '了解网站使用情况', '2年', '否'],
                  ['营销 Cookie', '提供个性化广告', '1年', '否'],
                ],
              },
            },
          ],
        },
      },
      {
        type: 'subsection',
        content: {
          title: '5.3 管理 Cookie',
          content: [
            {
              type: 'paragraph',
              content:
                '您可以通过浏览器设置管理或删除 Cookie。请注意，禁用某些 Cookie 可能影响网站功能。',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'rights',
    title: '第六章 您的权利',
    content: [
      {
        type: 'paragraph',
        content: '根据个人资料保护法，您享有以下权利：',
      },
      {
        type: 'list',
        content: [
          '查询权：查询我们是否持有您的个人资料',
          '阅览权：要求阅览您的个人资料内容',
          '更正权：要求更正或补充不正确的资料',
          '删除权：要求删除您的个人资料',
          '停止处理权：要求停止处理或利用您的资料',
          '资料可携权：要求以结构化格式提供您的资料',
        ],
      },
      {
        type: 'highlight',
        content: {
          type: 'warning',
          title: '权利行使限制',
          content:
            '在某些情况下（如法律要求、合约履行需要），我们可能无法完全满足您的要求。我们会在收到请求后30天内回复。',
        },
      },
    ],
  },
  {
    id: 'security',
    title: '第七章 资料安全',
    content: [
      {
        type: 'subsection',
        content: {
          title: '7.1 安全措施',
          content: [
            {
              type: 'paragraph',
              content: '我们采用多层次的安全措施保护您的个人资料：',
            },
            {
              type: 'list',
              content: [
                '技术措施：SSL加密传输、防火墙保护、入侵检测系统',
                '管理措施：员工培训、权限控制、定期安全审查',
                '物理措施：机房门禁管制、监控系统、备份机制',
              ],
            },
          ],
        },
      },
      {
        type: 'subsection',
        content: {
          title: '7.2 资料保存期限',
          content: [
            {
              type: 'paragraph',
              content: '我们仅在必要期间内保存您的个人资料：',
            },
            {
              type: 'list',
              content: [
                '加盟合约期间及合约终止后5年',
                '客户服务记录保存3年',
                '营销同意记录保存至撤回同意后1年',
                '法律要求的其他保存期限',
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'updates',
    title: '第八章 政策更新',
    content: [
      {
        type: 'paragraph',
        content:
          '我们可能会不定期更新本隐私政策，以反映我们服务的变化或法律要求的调整。',
      },
      {
        type: 'list',
        content: [
          '重大变更：我们会通过电子邮件或网站公告提前30天通知',
          '轻微变更：我们会在网站上发布更新版本',
          '持续使用：更新后继续使用我们的服务即表示您接受新政策',
        ],
      },
      {
        type: 'highlight',
        content: {
          type: 'info',
          title: '建议',
          content:
            '我们建议您定期查看本隐私政策，以了解我们如何保护您的个人资料。',
        },
      },
    ],
  },
  {
    id: 'contact',
    title: '第九章 联系我们',
    content: [
      {
        type: 'paragraph',
        content:
          '如果您对本隐私政策有任何疑问，或希望行使您的权利，请通过以下方式联系我们：',
      },
    ],
  },
]

export const contactInfo: ContactInfo = {
  department: 'AMIGO 宠物鲜食科技有限公司 个资保护专责单位',
  address: '台北市信义区信义路五段7号35楼',
  phone: '+886-2-2345-6789',
  email: 'privacy@amigob2b.com',
  hours: '周一至周五 09:00-18:00（国定假日除外）',
}

// 导出章节数量用于导航
export const TOTAL_SECTIONS = policySections.length
