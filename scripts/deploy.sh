#!/bin/bash

# 部署脚本
# 用于构建和部署应用

set -e

echo "🚀 开始部署流程..."

# 运行构建
echo "🏗️  构建应用..."
./scripts/build.sh

# 导出静态文件（如果需要）
if [ "$1" = "static" ]; then
    echo "📦 导出静态文件..."
    npm run export
fi

echo "✅ 部署准备完成！"
