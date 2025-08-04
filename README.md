# AMIGO 宠物鲜食自动贩卖机

> 革命性的宠物鲜食自动贩卖机，结合 AI 智能管理与人食等级制程

## 🚀 项目简介

AMIGO 是一个专业的宠物鲜食自动贩卖机项目，为宠物主人和加盟商提供优质的服务体验。项目采用 Next.js 15.4 + React 19 +
Tailwind CSS v4 技术栈构建。

## 📋 功能特性

- **双重身份选择**：支持宠物主人和加盟商两种用户类型
- **AI 智能管理**：24小时无人值守营业，智能库存管理
- **专业产品供应**：兽医博士和农学博士团队研发
- **投资回报计算**：提供详细的投资回报分析工具
- **门店定位**：智能门店查找和导航功能

## 🛠️ 技术栈

- **前端框架**：Next.js 15.4
- **UI 库**：React 19
- **样式框架**：Tailwind CSS v4
- **动画库**：Framer Motion
- **3D 渲染**：Three.js + React Three Fiber
- **类型检查**：TypeScript
- **代码规范**：ESLint + Prettier

## 📁 项目结构

```
├── src/                    # 源代码目录
│   ├── app/               # Next.js App Router 页面
│   ├── components/        # React 组件
│   ├── lib/              # 工具库和配置
│   ├── styles/           # 样式文件
│   └── types/            # TypeScript 类型定义
├── scripts/              # 运行和调试脚本
├── docs/                 # 正式文档
├── discuss/              # 讨论和评审文档
├── logs/                 # 日志输出目录
└── public/               # 静态资源
```

## 🚀 快速开始

### 环境要求

- Node.js 18.0+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
# 使用脚本启动（推荐）
./scripts/dev.sh

# 或直接使用 npm（不推荐）
npm run dev
```

### 构建生产版本

```bash
# 使用脚本构建（推荐）
./scripts/build.sh

# 或直接使用 npm（不推荐）
npm run build
```

### 启动生产服务器

```bash
# 使用脚本启动（推荐）
./scripts/start.sh

# 或直接使用 npm（不推荐）
npm run start
```

## 📝 开发规范

### 代码架构硬性指标

- **TypeScript/JavaScript 文件**：每个文件不超过 200 行
- **文件夹结构**：每层文件夹不超过 8 个文件
- **强类型要求**：优先使用 TypeScript，避免使用 `any` 类型

### 运行和调试

- **必须使用** `scripts/` 目录下的 .sh 脚本进行启停
- **禁止直接使用** npm、yarn 等包管理器命令
- 所有日志输出到 `logs/` 目录

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](docs/LICENSE) 文件了解详情

## 📞 联系我们

- 项目主页：[AMIGO 宠物鲜食](https://amigo-pet.com)
- 邮箱：contact@amigo-pet.com
- 电话：+886-XXX-XXXX
