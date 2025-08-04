#!/bin/bash

# 生产环境构建脚本
# 用于构建 Next.js 应用

set -e

echo "🏗️  开始构建生产版本..."

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 检测到缺少依赖，正在安装..."
    npm install
fi

# 运行 lint 检查
echo "🔍 运行代码检查..."
npm run lint

# 构建应用
echo "📦 构建应用..."
npm run build

echo "✅ 构建完成！"
