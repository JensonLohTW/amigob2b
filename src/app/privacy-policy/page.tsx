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

            </div>
          </FadeIn>
        </div>
      </Container>
    </RootLayout>
  )
}
