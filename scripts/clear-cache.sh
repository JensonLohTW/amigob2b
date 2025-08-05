#!/bin/bash

# 清除Next.js緩存腳本
# 用於解決緩存問題，特別是favicon、圖片等靜態資源更新後不生效的問題

echo "🧹 開始清除Next.js緩存..."

# 停止開發服務器（如果正在運行）
echo "⏹️  停止開發服務器..."
pkill -f "next dev" 2>/dev/null || true

# 清除Next.js編譯緩存
echo "🗑️  清除 .next 目錄..."
rm -rf .next

# 清除Node.js模塊緩存
echo "🗑️  清除 node_modules/.cache 目錄..."
rm -rf node_modules/.cache

# 清除npm/yarn緩存（可選）
echo "🗑️  清除包管理器緩存..."
if command -v npm &> /dev/null; then
    npm cache clean --force 2>/dev/null || true
fi

if command -v yarn &> /dev/null; then
    yarn cache clean 2>/dev/null || true
fi

if command -v pnpm &> /dev/null; then
    pnpm store prune 2>/dev/null || true
fi

# 清除瀏覽器緩存提示
echo "💡 請手動清除瀏覽器緩存："
echo "   - Chrome/Edge: Ctrl+Shift+R 或 Cmd+Shift+R"
echo "   - Firefox: Ctrl+F5 或 Cmd+Shift+R"
echo "   - Safari: Cmd+Option+R"

echo "✅ 緩存清除完成！"
echo "🚀 重新啟動開發服務器..."

# 重新啟動開發服務器
./scripts/dev.sh
