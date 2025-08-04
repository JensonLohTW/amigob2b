/**
 * 健康案例研究数据服务
 * 管理案例数据和相关计算
 */

import { CaseStudy } from '../types'
import { createLogger } from '@/lib/logger'

const logger = createLogger('CaseDataService')

/**
 * 案例研究数据
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'golden-retriever-max',
    petName: 'Max',
    breed: '黄金猎犬',
    age: 5,
    weight: 28,
    condition: '皮肤过敏、消化不良',
    beforeImage: '/images/cases/max-before.jpg',
    afterImage: '/images/cases/max-after.jpg',
    story:
      'Max 原本患有严重的皮肤过敏和消化问题，经常腹泻，毛发暗淡无光。转换到 AMIGO 鲜食后，症状逐渐改善。',
    ownerTestimonial:
      '看到 Max 的改变真的很惊人！现在他的毛发光亮，精神也好很多，最重要的是不再有皮肤问题了。',
    metrics: [
      {
        name: '皮肤健康评分',
        unit: '分',
        week0: 3,
        week4: 6,
        week12: 9,
        improvement: 200,
        type: 'improvement',
      },
      {
        name: '消化健康评分',
        unit: '分',
        week0: 4,
        week4: 7,
        week12: 9,
        improvement: 125,
        type: 'improvement',
      },
      {
        name: '活力指数',
        unit: '分',
        week0: 5,
        week4: 7,
        week12: 9,
        improvement: 80,
        type: 'improvement',
      },
      {
        name: '毛发光泽度',
        unit: '分',
        week0: 4,
        week4: 7,
        week12: 9,
        improvement: 125,
        type: 'improvement',
      },
    ],
  },
  {
    id: 'persian-cat-luna',
    petName: 'Luna',
    breed: '波斯猫',
    age: 3,
    weight: 4.5,
    condition: '肥胖、关节问题',
    beforeImage: '/images/cases/luna-before.jpg',
    afterImage: '/images/cases/luna-after.jpg',
    story:
      'Luna 因为肥胖导致关节负担过重，行动不便。通过 AMIGO 鲜食的营养控制，成功减重并改善关节健康。',
    ownerTestimonial:
      'Luna 现在变得更活泼了！体重减轻后，她又开始喜欢跳跃和玩耍，关节问题也明显改善。',
    metrics: [
      {
        name: '体重控制',
        unit: 'kg',
        week0: 6.2,
        week4: 5.5,
        week12: 4.8,
        improvement: 23,
        type: 'improvement',
      },
      {
        name: '关节灵活度',
        unit: '分',
        week0: 4,
        week4: 6,
        week12: 8,
        improvement: 100,
        type: 'improvement',
      },
      {
        name: '活动量',
        unit: '小时/天',
        week0: 2,
        week4: 4,
        week12: 6,
        improvement: 200,
        type: 'improvement',
      },
      {
        name: '食欲评分',
        unit: '分',
        week0: 6,
        week4: 8,
        week12: 9,
        improvement: 50,
        type: 'improvement',
      },
    ],
  },
  {
    id: 'border-collie-buddy',
    petName: 'Buddy',
    breed: '边境牧羊犬',
    age: 7,
    weight: 22,
    condition: '老年退化、免疫力下降',
    beforeImage: '/images/cases/buddy-before.jpg',
    afterImage: '/images/cases/buddy-after.jpg',
    story:
      'Buddy 进入老年期后，免疫力下降，经常生病。AMIGO 鲜食的营养支持帮助他重新焕发活力。',
    ownerTestimonial:
      '没想到 7 岁的 Buddy 还能有这样的改变！现在他很少生病，精神状态就像年轻时一样。',
    metrics: [
      {
        name: '免疫力指数',
        unit: '分',
        week0: 5,
        week4: 7,
        week12: 9,
        improvement: 80,
        type: 'improvement',
      },
      {
        name: '认知能力',
        unit: '分',
        week0: 6,
        week4: 7,
        week12: 8,
        improvement: 33,
        type: 'improvement',
      },
      {
        name: '体力耐力',
        unit: '分',
        week0: 4,
        week4: 6,
        week12: 8,
        improvement: 100,
        type: 'improvement',
      },
      {
        name: '睡眠质量',
        unit: '分',
        week0: 5,
        week4: 7,
        week12: 9,
        improvement: 80,
        type: 'improvement',
      },
    ],
  },
]

/**
 * 获取所有案例研究
 */
export function getAllCaseStudies(): CaseStudy[] {
  logger.debug('获取所有案例研究')
  return caseStudies
}

/**
 * 根据 ID 获取特定案例
 */
export function getCaseStudyById(id: string): CaseStudy | undefined {
  logger.debug('根据 ID 获取案例', { id })
  return caseStudies.find((study) => study.id === id)
}

/**
 * 获取案例总数
 */
export function getCaseStudyCount(): number {
  return caseStudies.length
}

/**
 * 计算平均改善率
 */
export function calculateAverageImprovement(): number {
  const allImprovements = caseStudies.flatMap((study) =>
    study.metrics.map((metric) => metric.improvement),
  )

  const average =
    allImprovements.reduce((sum, improvement) => sum + improvement, 0) /
    allImprovements.length

  logger.info('计算平均改善率', {
    average,
    totalMetrics: allImprovements.length,
  })
  return Math.round(average)
}

/**
 * 获取最佳改善案例
 */
export function getBestImprovementCase(): CaseStudy {
  const bestCase = caseStudies.reduce((best, current) => {
    const currentAvg =
      current.metrics.reduce((sum, metric) => sum + metric.improvement, 0) /
      current.metrics.length
    const bestAvg =
      best.metrics.reduce((sum, metric) => sum + metric.improvement, 0) /
      best.metrics.length

    return currentAvg > bestAvg ? current : best
  })

  logger.info('获取最佳改善案例', {
    caseId: bestCase.id,
    petName: bestCase.petName,
  })
  return bestCase
}

/**
 * 按品种筛选案例
 */
export function getCasesByBreed(breed: string): CaseStudy[] {
  const cases = caseStudies.filter((study) => study.breed === breed)
  logger.debug('按品种筛选案例', { breed, count: cases.length })
  return cases
}

/**
 * 按年龄范围筛选案例
 */
export function getCasesByAgeRange(
  minAge: number,
  maxAge: number,
): CaseStudy[] {
  const cases = caseStudies.filter(
    (study) => study.age >= minAge && study.age <= maxAge,
  )
  logger.debug('按年龄范围筛选案例', { minAge, maxAge, count: cases.length })
  return cases
}
