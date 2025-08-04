#!/bin/bash

# 开发环境启动脚本
# 用于启动 Next.js 开发服务器

set -e

echo "🚀 启动开发服务器..."

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 检测到缺少依赖，正在安装..."
    npm install
fi

# 启动开发服务器
npm run dev
