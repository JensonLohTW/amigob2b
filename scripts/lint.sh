#!/bin/bash

# 代码检查脚本
# 用于运行 ESLint 和 Prettier 检查

set -e

echo "🔍 运行代码质量检查..."

# 运行 ESLint
echo "📋 运行 ESLint..."
npm run lint

# 运行 Prettier 检查（如果配置了的话）
if [ -f ".prettierrc" ] || [ -f "prettier.config.js" ]; then
    echo "💅 检查代码格式..."
    npx prettier --check "src/**/*.{js,jsx,ts,tsx,json,css,md}"
fi

echo "✅ 代码检查完成！"
