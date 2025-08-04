# 项目架构指南

## 🏗️ 架构原则

### 核心原则
1. **单一职责原则** - 每个文件/组件只负责一个功能
2. **开闭原则** - 对扩展开放，对修改封闭
3. **依赖倒置** - 依赖抽象而非具体实现
4. **关注点分离** - UI、业务逻辑、数据层分离
5. **可测试性** - 代码易于单元测试

### 文件大小限制
- **TypeScript/JavaScript 文件**：≤ 200 行
- **React 组件**：≤ 150 行（推荐）
- **工具函数文件**：≤ 100 行（推荐）

### 文件夹结构限制
- **每个文件夹**：≤ 8 个文件
- **嵌套层级**：≤ 4 层（推荐）

## 📁 目录结构规范

```
src/
├── app/                    # Next.js App Router 页面
│   ├── (auth)/            # 认证相关页面组
│   ├── (dashboard)/       # 仪表板页面组
│   ├── (marketing)/       # 营销页面组
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件（≤8个）
│   ├── forms/            # 表单组件
│   ├── charts/           # 图表组件
│   ├── layout/           # 布局组件
│   ├── business/         # 业务组件
│   └── features/         # 功能模块组件
├── lib/                  # 工具库和配置
│   ├── utils/           # 工具函数
│   ├── hooks/           # 自定义 Hooks
│   ├── services/        # API 服务层
│   ├── stores/          # 状态管理
│   └── validations/     # 数据验证
├── types/               # TypeScript 类型定义
│   ├── api.ts          # API 相关类型
│   ├── business.ts     # 业务相关类型
│   └── ui.ts           # UI 相关类型
├── styles/             # 样式文件
└── constants/          # 常量定义
```

## 🧩 组件设计模式

### 1. 原子设计模式
- **Atoms**: 基础 UI 组件（Button, Input, Icon）
- **Molecules**: 组合组件（SearchBox, FormField）
- **Organisms**: 复杂组件（Header, ProductList）
- **Templates**: 页面模板
- **Pages**: 具体页面

### 2. 组件命名规范
```typescript
// ✅ 好的命名
export function UserProfileCard() {}
export function InvestmentCalculatorForm() {}
export function ProductCatalogGrid() {}

// ❌ 避免的命名
export function Component() {}
export function Utils() {}
export function Data() {}
```

### 3. 文件命名规范
- **组件文件**: PascalCase (UserProfile.tsx)
- **工具文件**: kebab-case (format-currency.ts)
- **类型文件**: kebab-case (investment-types.ts)
- **常量文件**: SCREAMING_SNAKE_CASE (API_ENDPOINTS.ts)

## 🔧 代码组织模式

### 1. 功能模块化
```
features/
├── investment-calculator/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── index.ts
├── product-catalog/
└── user-management/
```

### 2. 层次分离
```typescript
// 表现层 (Presentation Layer)
components/ui/Button.tsx

// 业务逻辑层 (Business Logic Layer)
lib/services/investment-service.ts

// 数据访问层 (Data Access Layer)
lib/api/investment-api.ts
```

### 3. 依赖注入模式
```typescript
// ✅ 依赖注入
interface CalculatorService {
  calculate(inputs: Inputs): Results
}

function Calculator({ service }: { service: CalculatorService }) {
  // 使用注入的服务
}

// ❌ 硬编码依赖
function Calculator() {
  const service = new ConcreteCalculatorService() // 硬依赖
}
```

## 📋 编码规范

### 1. 导入顺序
```typescript
// 1. React 相关
import React from 'react'
import { useState, useEffect } from 'react'

// 2. 第三方库
import { motion } from 'framer-motion'
import clsx from 'clsx'

// 3. 内部模块（按层级）
import { Button } from '@/components/ui/Button'
import { useInvestment } from '@/lib/hooks/useInvestment'
import { InvestmentService } from '@/lib/services/investment-service'
import type { CalculationInputs } from '@/types/investment'
```

### 2. 组件结构
```typescript
// 1. 类型定义
interface Props {
  // ...
}

// 2. 组件实现
export function ComponentName({ prop1, prop2 }: Props) {
  // 3. Hooks（按依赖顺序）
  const [state, setState] = useState()
  const { data } = useQuery()
  
  // 4. 事件处理函数
  const handleClick = () => {}
  
  // 5. 副作用
  useEffect(() => {}, [])
  
  // 6. 渲染逻辑
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 3. 错误处理
```typescript
// ✅ 统一错误处理
try {
  const result = await service.calculate(inputs)
  logger.info('计算成功', { result })
  return result
} catch (error) {
  logger.error('计算失败', { error, inputs })
  throw new CalculationError('投资计算失败', { cause: error })
}
```

## 🧪 测试策略

### 1. 测试文件组织
```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── lib/
│   ├── utils.ts
│   └── __tests__/
│       └── utils.test.ts
```

### 2. 测试覆盖率要求
- **组件测试**: 90%+
- **工具函数**: 95%+
- **业务逻辑**: 85%+

## 📊 性能优化

### 1. 代码分割
```typescript
// 路由级别分割
const LazyComponent = lazy(() => import('./HeavyComponent'))

// 组件级别分割
const HeavyFeature = dynamic(() => import('./HeavyFeature'), {
  loading: () => <Skeleton />
})
```

### 2. 状态管理
```typescript
// ✅ 局部状态优先
function Component() {
  const [localState, setLocalState] = useState()
}

// ✅ 全局状态按需使用
const globalState = useStore(state => state.specificPart)
```

## 🔍 代码审查检查清单

- [ ] 文件行数 ≤ 200 行
- [ ] 文件夹文件数 ≤ 8 个
- [ ] 单一职责原则
- [ ] 类型安全
- [ ] 错误处理
- [ ] 性能考虑
- [ ] 可测试性
- [ ] 文档完整性
