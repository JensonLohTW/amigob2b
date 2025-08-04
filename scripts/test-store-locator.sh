#!/bin/bash

# 測試門店定位功能的腳本

echo "🧪 開始測試門店定位功能..."

# 檢查必要的文件是否存在
echo "📁 檢查文件結構..."

files=(
  "src/features/store-locator/components/GoogleMapComponent.tsx"
  "src/features/store-locator/components/StoreLocatorContent.tsx"
  "src/features/store-locator/data/kaohsiung-stores.ts"
  "src/features/store-locator/data/kaohsiung-location.ts"
  "src/features/store-locator/data/stores.ts"
  "src/app/store-locator/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file 存在"
  else
    echo "❌ $file 不存在"
  fi
done

# 檢查依賴是否安裝
echo ""
echo "📦 檢查依賴..."

if npm list @googlemaps/js-api-loader > /dev/null 2>&1; then
  echo "✅ @googlemaps/js-api-loader 已安裝"
else
  echo "❌ @googlemaps/js-api-loader 未安裝"
fi

# 檢查環境變量配置
echo ""
echo "🔧 檢查環境配置..."

if [ -f ".env.local.example" ]; then
  echo "✅ .env.local.example 存在"
else
  echo "❌ .env.local.example 不存在"
fi

if [ -f ".env.local" ]; then
  echo "✅ .env.local 存在"
  if grep -q "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" .env.local; then
    echo "✅ Google Maps API 密鑰已配置"
  else
    echo "⚠️  Google Maps API 密鑰未配置"
  fi
else
  echo "⚠️  .env.local 不存在，請複製 .env.local.example 並配置 API 密鑰"
fi

# 嘗試編譯檢查
echo ""
echo "🔨 檢查編譯..."

if npm run build > /dev/null 2>&1; then
  echo "✅ 編譯成功"
else
  echo "❌ 編譯失敗，請檢查代碼"
fi

echo ""
echo "🎉 測試完成！"
echo ""
echo "📋 使用說明："
echo "1. 複製 .env.local.example 為 .env.local"
echo "2. 在 .env.local 中配置您的 Google Maps API 密鑰"
echo "3. 運行 npm run dev 啟動開發服務器"
echo "4. 訪問 http://localhost:3000/store-locator 查看門店定位頁面"
