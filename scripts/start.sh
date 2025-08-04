#!/bin/bash

# 生产环境启动脚本
# 用于启动已构建的 Next.js 应用

set -e

echo "🚀 启动生产服务器..."

# 检查是否已构建
if [ ! -d ".next" ]; then
    echo "❌ 未找到构建文件，请先运行 ./scripts/build.sh"
    exit 1
fi

# 启动生产服务器
npm run start
