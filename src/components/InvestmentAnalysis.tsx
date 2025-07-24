import { FadeIn } from '@/components/FadeIn'
import { StatList, StatListItem } from '@/components/StatList'
import { Container } from '@/components/Container'

interface CostBreakdown {
  category: string
  items: { name: string; amount: string; description: string }[]
}

const initialCosts: CostBreakdown[] = [
  {
    category: '機台設備',
    items: [
      { name: '智能販賣機', amount: '40-60萬', description: '依機型規格而定' },
      { name: '安裝調試', amount: '包含', description: '專業團隊到場安裝' },
      { name: '軟體授權', amount: '包含', description: '終身免費更新' }
    ]
  },
  {
    category: '加盟費用',
    items: [
      { name: '加盟金', amount: '5萬', description: '一次性費用' },
      { name: '保證金', amount: '10萬', description: '合約期滿退還' },
      { name: '教育訓練', amount: '包含', description: '3-5天完整培訓' }
    ]
  },
  {
    category: '營運準備',
    items: [
      { name: '首批商品', amount: '5萬', description: '約2週銷售量' },
      { name: '場地準備', amount: '自理', description: '租金、裝修等' },
      { name: '營運資金', amount: '建議5萬', description: '前期週轉金' }
    ]
  }
]

const monthlyOperating = [
  { name: '商品成本', amount: '70%', description: '銷售額的70%' },
  { name: '場地租金', amount: '1-3萬', description: '依地點而定' },
  { name: '水電費用', amount: '2-5千', description: '機台耗電約2.5kW' },
  { name: '網路費用', amount: '1千', description: '4G/WiFi連線' },
  { name: '保險費用', amount: '5百', description: '設備保險' }
]

const revenueProjection = [
  { period: '第1個月', sales: '20件/日', revenue: '10.8萬', profit: '1.5萬', note: '開業磨合期' },
  { period: '第2-3個月', sales: '35件/日', revenue: '18.9萬', profit: '3.2萬', note: '客群建立期' },
  { period: '第4-6個月', sales: '50件/日', revenue: '27萬', profit: '5.8萬', note: '穩定成長期' },
  { period: '第7個月後', sales: '60件/日', revenue: '32.4萬', profit: '7.5萬', note: '成熟營運期' }
]

export function InvestmentAnalysis() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      {/* 投資回報概覽 */}
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-neutral-950">投資分析與回報預估</h2>
          <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            透明化的成本結構和收益分析，讓您清楚了解投資效益
          </p>
        </div>

        <StatList className="mb-16">
          <StatListItem value="55-75萬" label="總投資金額" />
          <StatListItem value="30%" label="分潤比例" />
          <StatListItem value="8-12個月" label="預估回本時間" />
          <StatListItem value="25-35%" label="年投資報酬率" />
        </StatList>
      </FadeIn>

      {/* 初期投資成本分析 */}
      <FadeIn>
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-neutral-950 mb-8 text-center">初期投資成本明細</h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {initialCosts.map((category, index) => (
              <div key={index} className="rounded-2xl bg-neutral-50 p-6">
                <h4 className="font-semibold text-neutral-950 mb-4 text-center">{category.category}</h4>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-neutral-950">{item.name}</div>
                        <div className="text-sm text-neutral-600">{item.description}</div>
                      </div>
                      <div className="font-semibold text-blue-600 ml-4">{item.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* 月營運成本 */}
      <FadeIn>
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-neutral-950 mb-8 text-center">月營運成本結構</h3>
          <div className="rounded-2xl bg-neutral-50 p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {monthlyOperating.map((item, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg">
                  <div className="font-semibold text-neutral-950">{item.name}</div>
                  <div className="text-lg font-bold text-neutral-950 my-2">{item.amount}</div>
                  <div className="text-sm text-neutral-600">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 營收成長預估 */}
      <FadeIn>
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-neutral-950 mb-8 text-center">營收成長預估</h3>
          <div className="overflow-x-auto">
            <table className="w-full rounded-2xl overflow-hidden bg-white shadow-sm">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-950">時期</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-950">日銷量</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-950">月營收</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-950">月淨利</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-950">備註</th>
                </tr>
              </thead>
              <tbody>
                {revenueProjection.map((row, index) => (
                  <tr key={index} className="border-t border-neutral-100">
                    <td className="px-6 py-4 font-medium text-neutral-950">{row.period}</td>
                    <td className="px-6 py-4 text-neutral-600">{row.sales}</td>
                    <td className="px-6 py-4 font-semibold text-neutral-950">{row.revenue}</td>
                    <td className="px-6 py-4 font-semibold text-neutral-950">{row.profit}</td>
                    <td className="px-6 py-4 text-neutral-600">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* 投資優勢 */}
      <FadeIn>
        <div className="rounded-3xl bg-neutral-50 p-8">
          <h3 className="text-xl font-semibold text-neutral-950 mb-6 text-center">投資優勢分析</h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-950">低風險投資</h4>
                  <p className="text-sm text-neutral-600">寵物市場持續成長，剛性需求穩定</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-950">被動收入</h4>
                  <p className="text-sm text-neutral-600">24小時自動營業，無需人力值守</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-950">完整支援</h4>
                  <p className="text-sm text-neutral-600">從選址到營運的全方位協助</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-950">快速回本</h4>
                  <p className="text-sm text-neutral-600">8-12個月回本，遠優於傳統投資</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-950">技術領先</h4>
                  <p className="text-sm text-neutral-600">AI智能管理，持續技術升級</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-950">市場潛力</h4>
                  <p className="text-sm text-neutral-600">高雄400台機台潛力，先搶先贏</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
