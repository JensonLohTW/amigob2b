import { render, screen, fireEvent } from '@testing-library/react'
import { StoreSelector } from '../StoreSelector'
import { Store } from '../../types'

// 模擬門店數據
const mockStores: Store[] = [
  {
    id: '1',
    name: 'AMIGO 台北信義店',
    address: '台北市信義區信義路五段7號',
    district: '信義區',
    city: '台北市',
    coordinates: { lat: 25.0330, lng: 121.5654 },
    phone: '02-2345-6789',
    hours: '09:00-21:00',
    status: 'active' as const,
    rating: 4.5,
    features: ['停車場', '寵物友善'],
  },
  {
    id: '2',
    name: 'AMIGO 台北大安店',
    address: '台北市大安區復興南路一段390號',
    district: '大安區',
    city: '台北市',
    coordinates: { lat: 25.0425, lng: 121.5440 },
    phone: '02-2345-6790',
    hours: '09:00-21:00',
    status: 'active' as const,
    rating: 4.3,
    features: ['外送服務'],
  },
]

describe('StoreSelector', () => {
  const mockOnStoreSelect = jest.fn()

  beforeEach(() => {
    mockOnStoreSelect.mockClear()
  })

  it('應該正確渲染門店列表', () => {
    render(
      <StoreSelector
        stores={mockStores}
        onStoreSelect={mockOnStoreSelect}
      />
    )

    expect(screen.getByText('選擇門店')).toBeInTheDocument()
    expect(screen.getByText('AMIGO 台北信義店')).toBeInTheDocument()
    expect(screen.getByText('AMIGO 台北大安店')).toBeInTheDocument()
  })

  it('應該支持搜索功能', () => {
    render(
      <StoreSelector
        stores={mockStores}
        onStoreSelect={mockOnStoreSelect}
      />
    )

    const searchInput = screen.getByPlaceholderText('搜索門店名稱或地址...')
    fireEvent.change(searchInput, { target: { value: '信義' } })

    expect(screen.getByText('AMIGO 台北信義店')).toBeInTheDocument()
    expect(screen.queryByText('AMIGO 台北大安店')).not.toBeInTheDocument()
  })

  it('應該支持地區篩選', () => {
    render(
      <StoreSelector
        stores={mockStores}
        onStoreSelect={mockOnStoreSelect}
      />
    )

    const districtButton = screen.getByText('信義區')
    fireEvent.click(districtButton)

    expect(screen.getByText('AMIGO 台北信義店')).toBeInTheDocument()
    expect(screen.queryByText('AMIGO 台北大安店')).not.toBeInTheDocument()
  })

  it('應該在點擊門店時調用回調函數', () => {
    render(
      <StoreSelector
        stores={mockStores}
        onStoreSelect={mockOnStoreSelect}
      />
    )

    const storeCard = screen.getByText('AMIGO 台北信義店').closest('div')
    fireEvent.click(storeCard!)

    expect(mockOnStoreSelect).toHaveBeenCalledWith(mockStores[0])
  })

  it('應該顯示無結果提示', () => {
    render(
      <StoreSelector
        stores={mockStores}
        onStoreSelect={mockOnStoreSelect}
      />
    )

    const searchInput = screen.getByPlaceholderText('搜索門店名稱或地址...')
    fireEvent.change(searchInput, { target: { value: '不存在的門店' } })

    expect(screen.getByText('沒有找到符合條件的門店')).toBeInTheDocument()
  })
})
