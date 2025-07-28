import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {
  title: '隐私政策 - AMIGO 宠物鲜食自动贩卖机',
  description: '了解 AMIGO 如何收集、使用和保护您的个人资料。我们承诺遵循台湾个资法规定，保障您的隐私权益。',
}

export default function PrivacyPolicy() {
  return (
    <RootLayout>
      <PageIntro eyebrow="隐私政策" title="保护您的个人资料是我们的承诺">
        <p>
          AMIGO 宠物鲜食科技有限公司（以下简称「本公司」）深知个人资料保护的重要性，
          我们承诺遵循《个人资料保护法》等相关法规，妥善保护您的个人资料。
          本隐私政策说明我们如何收集、使用、储存和保护您的个人资料。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="prose prose-neutral max-w-none">
              
              {/* 最后更新日期 */}
              <div className="mb-12 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <p className="text-sm text-blue-800 mb-2 font-semibold">最后更新日期</p>
                <p className="text-blue-700 mb-0">2025年1月25日</p>
              </div>

              {/* 第一章：适用范围 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第一章 适用范围
                </h2>
                
                <div className="space-y-4">
                  <p>
                    本隐私政策适用于您使用本公司提供的所有服务，包括但不限于：
                  </p>
                  
                  <ul className="space-y-2">
                    <li>• AMIGO 官方网站（amigob2b.vercel.app）</li>
                    <li>• 加盟申请和咨询服务</li>
                    <li>• 客户服务和技术支援</li>
                    <li>• 电子报订阅服务</li>
                    <li>• 其他相关的线上和线下服务</li>
                  </ul>
                  
                  <p>
                    当您使用我们的服务时，即表示您已阅读、了解并同意本隐私政策的所有条款。
                    如果您不同意本政策的任何部分，请勿使用我们的服务。
                  </p>
                </div>
              </section>

              {/* 第二章：个人资料的收集 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第二章 个人资料的收集
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">2.1 收集的资料类型</h3>
                    <p>我们可能收集以下类型的个人资料：</p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">基本身份资料</h4>
                        <p className="text-sm text-neutral-600">姓名、电话号码、电子邮件地址、联络地址</p>
                      </div>
                      
                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">商业资料</h4>
                        <p className="text-sm text-neutral-600">公司名称、统一编号、营业地址、投资预算、经营经验</p>
                      </div>
                      
                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">技术资料</h4>
                        <p className="text-sm text-neutral-600">IP 地址、浏览器类型、设备信息、使用记录</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">2.2 收集方式</h3>
                    <ul className="space-y-2">
                      <li>• <strong>直接收集</strong>：通过加盟申请表单、联络表单、电话咨询等方式</li>
                      <li>• <strong>自动收集</strong>：通过 Cookie、网站分析工具等技术手段</li>
                      <li>• <strong>第三方提供</strong>：通过合法的第三方管道获得（如商业伙伴推荐）</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 第三章：个人资料的使用 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第三章 个人资料的使用
                </h2>
                
                <div className="space-y-4">
                  <p>我们基于以下合法目的使用您的个人资料：</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-6 border border-neutral-200 rounded-xl">
                      <h4 className="font-semibold text-neutral-950 mb-3">🤝 加盟服务</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• 处理加盟申请</li>
                        <li>• 提供咨询服务</li>
                        <li>• 评估加盟资格</li>
                        <li>• 签署合作协议</li>
                      </ul>
                    </div>
                    
                    <div className="p-6 border border-neutral-200 rounded-xl">
                      <h4 className="font-semibold text-neutral-950 mb-3">📞 客户服务</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• 回应咨询和问题</li>
                        <li>• 提供技术支援</li>
                        <li>• 处理客诉事宜</li>
                        <li>• 满意度调查</li>
                      </ul>
                    </div>
                    
                    <div className="p-6 border border-neutral-200 rounded-xl">
                      <h4 className="font-semibold text-neutral-950 mb-3">📧 营销推广</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• 发送产品资讯</li>
                        <li>• 推广活动通知</li>
                        <li>• 电子报订阅</li>
                        <li>• 市场调研</li>
                      </ul>
                    </div>
                    
                    <div className="p-6 border border-neutral-200 rounded-xl">
                      <h4 className="font-semibold text-neutral-950 mb-3">⚖️ 法律合规</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• 遵循法律义务</li>
                        <li>• 防范诈欺行为</li>
                        <li>• 保护合法权益</li>
                        <li>• 配合司法调查</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 第四章：个人资料的分享与披露 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第四章 个人资料的分享与披露
                </h2>
                
                <div className="space-y-6">
                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h4 className="font-semibold text-yellow-800 mb-2">🔒 基本原则</h4>
                    <p className="text-yellow-700">
                      我们不会出售、出租或以其他方式向第三方披露您的个人资料，
                      除非获得您的明确同意或法律要求。
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">4.1 可能分享的情况</h3>
                    <ul className="space-y-3">
                      <li>
                        <strong>服务提供商</strong>：与协助我们提供服务的第三方分享必要资料
                        （如物流公司、技术服务商、支付处理商）
                      </li>
                      <li>
                        <strong>商业伙伴</strong>：在获得您同意的情况下，与合作伙伴分享相关资料
                      </li>
                      <li>
                        <strong>法律要求</strong>：依法律规定或政府机关要求提供资料
                      </li>
                      <li>
                        <strong>紧急情况</strong>：为保护您或他人的生命、身体、财产安全
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">4.2 第三方服务</h3>
                    <p>我们使用以下第三方服务，这些服务可能会收集您的资料：</p>
                    <ul className="mt-3 space-y-2">
                      <li>• <strong>Google Analytics</strong>：网站流量分析</li>
                      <li>• <strong>电子邮件服务</strong>：发送通知和营销邮件</li>
                      <li>• <strong>客服系统</strong>：处理客户咨询</li>
                      <li>• <strong>支付系统</strong>：处理付款事宜</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 第五章：Cookie 使用说明 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第五章 Cookie 使用说明
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">5.1 什么是 Cookie</h3>
                    <p>
                      Cookie 是网站储存在您设备上的小型文字档案，用于记住您的偏好设定、
                      改善网站功能和分析网站使用情况。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">5.2 我们使用的 Cookie 类型</h3>

                    <div className="space-y-4">
                      <div className="p-4 border border-neutral-200 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">必要 Cookie</h4>
                        <p className="text-sm text-neutral-600 mb-2">
                          确保网站正常运作所必需的 Cookie，无法停用。
                        </p>
                        <p className="text-xs text-neutral-500">
                          例如：登入状态、购物车内容、安全验证
                        </p>
                      </div>

                      <div className="p-4 border border-neutral-200 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">功能性 Cookie</h4>
                        <p className="text-sm text-neutral-600 mb-2">
                          记住您的偏好设定，提供个人化体验。
                        </p>
                        <p className="text-xs text-neutral-500">
                          例如：语言选择、字体大小、地区设定
                        </p>
                      </div>

                      <div className="p-4 border border-neutral-200 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">分析 Cookie</h4>
                        <p className="text-sm text-neutral-600 mb-2">
                          帮助我们了解网站使用情况，改善服务品质。
                        </p>
                        <p className="text-xs text-neutral-500">
                          例如：Google Analytics、热点图分析
                        </p>
                      </div>

                      <div className="p-4 border border-neutral-200 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">营销 Cookie</h4>
                        <p className="text-sm text-neutral-600 mb-2">
                          用于追踪您的浏览行为，提供相关广告。
                        </p>
                        <p className="text-xs text-neutral-500">
                          例如：Facebook Pixel、Google Ads
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">5.3 管理 Cookie</h3>
                    <p>您可以通过以下方式管理 Cookie：</p>
                    <ul className="mt-3 space-y-2">
                      <li>• 在浏览器设定中停用或删除 Cookie</li>
                      <li>• 使用我们网站上的 Cookie 偏好设定</li>
                      <li>• 选择退出第三方追踪服务</li>
                    </ul>
                    <p className="mt-3 text-sm text-neutral-600">
                      请注意，停用某些 Cookie 可能会影响网站功能的正常使用。
                    </p>
                  </div>
                </div>
              </section>

              {/* 第六章：您的权利 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第六章 您的权利
                </h2>

                <div className="space-y-6">
                  <p>
                    根据《个人资料保护法》，您对自己的个人资料享有以下权利：
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-3">📋 查询权</h4>
                      <p className="text-sm text-green-700">
                        您有权查询我们是否持有您的个人资料，以及资料的处理情况。
                      </p>
                    </div>

                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-3">📄 阅览权</h4>
                      <p className="text-sm text-blue-700">
                        您有权要求阅览或取得您的个人资料副本。
                      </p>
                    </div>

                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <h4 className="font-semibold text-yellow-800 mb-3">✏️ 更正权</h4>
                      <p className="text-sm text-yellow-700">
                        您有权要求更正或补充不正确或不完整的个人资料。
                      </p>
                    </div>

                    <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                      <h4 className="font-semibold text-red-800 mb-3">🗑️ 删除权</h4>
                      <p className="text-sm text-red-700">
                        在特定情况下，您有权要求删除您的个人资料。
                      </p>
                    </div>

                    <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
                      <h4 className="font-semibold text-purple-800 mb-3">🚫 停止处理权</h4>
                      <p className="text-sm text-purple-700">
                        您有权要求停止处理或利用您的个人资料。
                      </p>
                    </div>

                    <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
                      <h4 className="font-semibold text-indigo-800 mb-3">📤 资料可携权</h4>
                      <p className="text-sm text-indigo-700">
                        您有权要求以结构化、常用的格式取得您的个人资料。
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl">
                    <h4 className="font-semibold text-neutral-950 mb-3">如何行使您的权利</h4>
                    <p className="text-sm text-neutral-600 mb-3">
                      如需行使上述权利，请通过以下方式联系我们：
                    </p>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• 电子邮件：privacy@amigo.com.tw</li>
                      <li>• 客服电话：0800-123-456</li>
                      <li>• 线上表单：<a href="/contact" className="text-blue-600 hover:underline">联络我们</a></li>
                    </ul>
                    <p className="text-xs text-neutral-500 mt-3">
                      我们将在收到您的请求后 30 天内回应。
                    </p>
                  </div>
                </div>
              </section>

              {/* 第七章：资料安全 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第七章 资料安全
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">7.1 安全措施</h3>
                    <p className="mb-4">
                      我们采用多层次的安全措施来保护您的个人资料：
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-neutral-200 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">🔐 技术安全</h4>
                        <ul className="text-sm text-neutral-600 space-y-1">
                          <li>• SSL/TLS 加密传输</li>
                          <li>• 资料库加密储存</li>
                          <li>• 防火墙保护</li>
                          <li>• 入侵检测系统</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-neutral-200 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">👥 管理安全</h4>
                        <ul className="text-sm text-neutral-600 space-y-1">
                          <li>• 员工资安教育训练</li>
                          <li>• 存取权限控制</li>
                          <li>• 定期安全稽核</li>
                          <li>• 保密协议签署</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-neutral-200 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">🏢 实体安全</h4>
                        <ul className="text-sm text-neutral-600 space-y-1">
                          <li>• 机房门禁管制</li>
                          <li>• 监控系统</li>
                          <li>• 备份与灾难复原</li>
                          <li>• 设备安全管理</li>
                        </ul>
                      </div>

                      <div className="p-4 border border-neutral-200 rounded-lg">
                        <h4 className="font-semibold text-neutral-950 mb-2">📋 程序安全</h4>
                        <ul className="text-sm text-neutral-600 space-y-1">
                          <li>• 资料处理程序</li>
                          <li>• 事故应变计画</li>
                          <li>• 定期风险评估</li>
                          <li>• 合规性检查</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950 mb-4">7.2 资料保存期限</h3>
                    <p className="mb-4">
                      我们仅在必要期间内保存您的个人资料：
                    </p>
                    <ul className="space-y-2">
                      <li>• <strong>加盟申请资料</strong>：申请处理完成后保存 3 年</li>
                      <li>• <strong>客户服务记录</strong>：服务结束后保存 2 年</li>
                      <li>• <strong>营销资料</strong>：取消订阅后立即删除</li>
                      <li>• <strong>网站使用记录</strong>：保存 1 年</li>
                      <li>• <strong>法律要求资料</strong>：依法律规定保存</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                    <h4 className="font-semibold text-red-800 mb-3">🚨 资料外泄通报</h4>
                    <p className="text-sm text-red-700">
                      如发生个人资料外泄事件，我们将依法在 72 小时内通报主管机关，
                      并在确认影响范围后立即通知受影响的当事人，
                      同时采取必要的补救措施。
                    </p>
                  </div>
                </div>
              </section>

              {/* 第八章：政策更新 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第八章 政策更新
                </h2>

                <div className="space-y-4">
                  <p>
                    我们可能会不定期更新本隐私政策，以反映我们服务的变化、
                    法律要求的更新或最佳实务的改进。
                  </p>

                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                    <h4 className="font-semibold text-blue-800 mb-3">📢 更新通知</h4>
                    <div className="text-sm text-blue-700 space-y-2">
                      <p><strong>重大变更</strong>：我们将通过电子邮件、网站公告或其他适当方式通知您</p>
                      <p><strong>一般变更</strong>：更新后的政策将在网站上公布，并标注最后更新日期</p>
                      <p><strong>生效时间</strong>：更新后的政策将在公布后 30 天生效</p>
                    </div>
                  </div>

                  <p>
                    建议您定期查看本隐私政策，以了解我们如何保护您的个人资料。
                    继续使用我们的服务即表示您接受更新后的隐私政策。
                  </p>
                </div>
              </section>

              {/* 第九章：联系我们 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-950 mb-6 pb-3 border-b border-neutral-200">
                  第九章 联系我们
                </h2>

                <div className="space-y-6">
                  <p>
                    如果您对本隐私政策有任何疑问、意见或需要协助，
                    请随时通过以下方式联系我们：
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl">
                      <h4 className="font-semibold text-neutral-950 mb-4">📞 联络资讯</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-neutral-700">公司名称：</span>
                          <span className="text-neutral-600">AMIGO 宠物鲜食科技有限公司</span>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">客服电话：</span>
                          <span className="text-neutral-600">0800-123-456</span>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">电子邮件：</span>
                          <span className="text-neutral-600">privacy@amigo.com.tw</span>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">营业地址：</span>
                          <span className="text-neutral-600">台北市信义区信义路五段 7 号</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl">
                      <h4 className="font-semibold text-neutral-950 mb-4">⏰ 服务时间</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-neutral-700">客服时间：</span>
                          <span className="text-neutral-600">周一至周日 8:00-22:00</span>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">电话回应：</span>
                          <span className="text-neutral-600">24 小时内</span>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">邮件回应：</span>
                          <span className="text-neutral-600">3 个工作天内</span>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">权利行使：</span>
                          <span className="text-neutral-600">30 天内处理完成</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-3">💬 快速联络</h4>
                    <p className="text-sm text-green-700 mb-4">
                      您也可以通过以下方式快速联络我们：
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        📝 线上表单
                      </a>
                      <a
                        href="tel:0800-123-456"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-green-700 text-sm font-medium rounded-lg border border-green-300 hover:bg-green-50 transition-colors"
                      >
                        📞 立即致电
                      </a>
                      <a
                        href="mailto:privacy@amigo.com.tw"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-green-700 text-sm font-medium rounded-lg border border-green-300 hover:bg-green-50 transition-colors"
                      >
                        ✉️ 发送邮件
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* 页脚声明 */}
              <div className="mt-16 pt-8 border-t border-neutral-200">
                <div className="text-center text-sm text-neutral-500">
                  <p className="mb-2">
                    本隐私政策最后更新日期：2025年1月25日
                  </p>
                  <p>
                    © 2025 AMIGO 宠物鲜食科技有限公司 版权所有
                  </p>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </Container>
    </RootLayout>
  )
}
