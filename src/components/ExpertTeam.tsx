import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/Container'

interface Expert {
  id: string
  name: string
  title: string
  degree: string
  specialization: string[]
  experience: string
  achievements: string[]
  description: string
}

const experts: Expert[] = [
  {
    id: 'dr-chen',
    name: '陳志明 博士',
    title: '首席獸醫顧問',
    degree: '國立台灣大學獸醫學博士',
    specialization: ['小動物內科', '營養學', '預防醫學'],
    experience: '15年臨床經驗',
    achievements: [
      '台灣獸醫師公會理事',
      '發表營養學論文20餘篇',
      '獲得農委會優秀獸醫師獎',
      '寵物營養學會創始會員',
    ],
    description:
      '專精於小動物營養需求研究，致力於開發符合不同生命階段的寵物食品配方。',
  },
  {
    id: 'dr-wang',
    name: '王美玲 博士',
    title: '食品科學顧問',
    degree: '國立中興大學食品科學博士',
    specialization: ['食品安全', '營養分析', '品質控制'],
    experience: '12年食品研發經驗',
    achievements: [
      'ISO 22000 主導稽核員',
      'HACCP 系統建置專家',
      '食品技師公會常務理事',
      '獲得食品創新獎3次',
    ],
    description:
      '專業於食品安全管理和營養成分分析，確保每一款產品都符合最高安全標準。',
  },
  {
    id: 'dr-liu',
    name: '劉建宏 博士',
    title: '動物營養學顧問',
    degree: '美國康乃爾大學動物營養學博士',
    specialization: ['動物營養', '飼料配方', '消化生理'],
    experience: '18年國際經驗',
    achievements: [
      '美國動物營養學會會員',
      '國際期刊審查委員',
      '農業部技術顧問',
      '營養配方專利3項',
    ],
    description:
      '具備國際視野的動物營養專家，專精於各種動物的營養需求和飼料配方設計。',
  },
  {
    id: 'dr-zhang',
    name: '張雅芳 博士',
    title: '品質管理顧問',
    degree: '國立台灣大學農業化學博士',
    specialization: ['品質管理', '檢驗分析', '製程優化'],
    experience: '10年品管經驗',
    achievements: [
      'ISO 9001 主導稽核員',
      '食品檢驗分析專家',
      '品質管理學會理事',
      '製程改善專案獎',
    ],
    description:
      '負責建立完整的品質管理體系，從原料檢驗到成品出貨的每個環節都嚴格把關。',
  },
]

const certifications = [
  {
    name: 'ISO 22000 食品安全管理系統',
    description: '國際食品安全管理標準認證',
  },
  {
    name: 'HACCP 危害分析重要管制點',
    description: '食品安全預防性管理系統',
  },
  {
    name: '人食等級製程認證',
    description: '與人類食品相同的安全標準',
  },
  {
    name: 'GMP 良好作業規範',
    description: '藥品優良製造作業準則',
  },
]

export function ExpertTeam() {
  return (
    <>
      {/* 專家團隊介紹 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {experts.map((expert) => (
            <FadeIn key={expert.id}>
              <div className="rounded-3xl bg-neutral-50 p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <span className="text-2xl font-bold text-neutral-600">
                      {expert.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-950">
                      {expert.name}
                    </h3>
                    <p className="font-medium text-neutral-700">
                      {expert.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">
                      {expert.degree}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {expert.experience}
                    </p>
                  </div>
                </div>

                <p className="mt-4 leading-relaxed text-neutral-600">
                  {expert.description}
                </p>

                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-neutral-950">
                    專業領域
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {expert.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-neutral-950">
                    主要成就
                  </h4>
                  <ul className="space-y-1">
                    {expert.achievements
                      .slice(0, 2)
                      .map((achievement, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-neutral-600"
                        >
                          <svg
                            className="mr-2 h-3 w-3 flex-shrink-0 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {achievement}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>

      {/* 認證與標準 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-neutral-950">
              認證與品質標準
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              我們通過多項國際認證，確保產品品質和安全性達到最高標準
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="rounded-2xl bg-neutral-50 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    className="h-6 w-6 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-950">
                  {cert.name}
                </h3>
                <p className="text-sm text-neutral-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>

      {/* 五大營養素說明 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="rounded-3xl bg-neutral-50 p-8 lg:p-12">
            <h2 className="mb-8 text-center text-2xl font-semibold text-neutral-950">
              五大營養素科學配比
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    className="h-8 w-8 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-950">蛋白質</h3>
                <p className="text-sm text-neutral-600">
                  高品質動物蛋白，支持肌肉發育和免疫系統
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    className="h-8 w-8 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-950">脂肪</h3>
                <p className="text-sm text-neutral-600">
                  必需脂肪酸，維持皮膚健康和毛髮光澤
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    className="h-8 w-8 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-950">
                  碳水化合物
                </h3>
                <p className="text-sm text-neutral-600">
                  提供持續能量，支持日常活動需求
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    className="h-8 w-8 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-950">維生素</h3>
                <p className="text-sm text-neutral-600">
                  多種維生素，促進新陳代謝和免疫功能
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    className="h-8 w-8 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-950">礦物質</h3>
                <p className="text-sm text-neutral-600">
                  鈣、磷、鐵等，維持骨骼和牙齒健康
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
