'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import {
  HeartIcon,
  BuildingOfficeIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { Logo, Logomark } from '@/components/Logo'
import { Offices } from '@/components/Offices'
import { SocialMedia } from '@/components/SocialMedia'

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  panelId,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
  onUserTypeChange,
  activeUserType,
}: {
  panelId: string
  icon: React.ComponentType<{ className?: string }>
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement | null>
  invert?: boolean
  onUserTypeChange?: (type: 'consumer' | 'business') => void
  activeUserType?: 'consumer' | 'business'
}) {
  let { logoHovered, setLogoHovered } = useContext(RootLayoutContext)!
  const pathname = usePathname()
  const router = useRouter()

  // 獲取 basePath 前綴
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  // 判斷當前頁面類型
  const isConsumerPage =
    pathname?.startsWith('/consumer') ||
    pathname === '/products' ||
    pathname === '/store-locator' ||
    pathname === '/blog' ||
    pathname === '/pet-health-tools' ||
    pathname === '/comparison'
  const isBusinessPage =
    pathname?.startsWith('/franchise') ||
    pathname === '/calculator' ||
    pathname === '/vending-machine' ||
    pathname === '/experts' ||
    pathname === '/apply' ||
    pathname === '/work'

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Logomark
            className="h-8 sm:hidden"
            invert={invert}
            filled={logoHovered}
          />
          <Logo
            className="hidden h-8 sm:block"
            invert={invert}
            filled={logoHovered}
          />
        </Link>
        <div className="flex items-center gap-x-4">
          {/* 用戶類型快速切換 - 優雅不等寬設計 */}
          <div className="relative hidden h-8 items-center rounded-full bg-neutral-800 border border-neutral-700 p-0.5 sm:flex">
            <motion.div
              className="absolute top-0.5 bottom-0.5 rounded-full bg-white shadow-sm"
              layoutId="active-nav-item"
              initial={false}
              animate={{
                left: (() => {
                  if (expanded) {
                    // 菜單展開時，使用 activeUserType 狀態
                    return activeUserType === 'consumer' ? '2px' : activeUserType === 'business' ? '56px' : '2px'
                  } else {
                    // 菜單未展開時，使用頁面路徑判斷
                    return isConsumerPage ? '2px' : isBusinessPage ? '56px' : '2px'
                  }
                })(),
                width: (() => {
                  if (expanded) {
                    // 菜單展開時，使用 activeUserType 狀態
                    return activeUserType === 'consumer' ? '50px' : activeUserType === 'business' ? 'calc(100% - 58px)' : '50px'
                  } else {
                    // 菜單未展開時，使用頁面路徑判斷
                    return isConsumerPage ? '50px' : isBusinessPage ? 'calc(100% - 58px)' : '50px'
                  }
                })(),
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 32,
                duration: 0.25,
              }}
            />

            <button
              onClick={() => {
                if (expanded && onUserTypeChange) {
                  // 菜單展開時，切換導航內容
                  onUserTypeChange('consumer')
                } else {
                  // 菜單未展開時，跳轉頁面
                  router.push(`${basePath}/consumer`)
                }
              }}
              className={clsx(
                'relative z-10 h-7 w-14 rounded-full px-3 text-xs font-medium transition-all duration-200',
                'flex items-center justify-center shrink-0',
                (() => {
                  if (expanded) {
                    // 菜單展開時，使用 activeUserType 狀態
                    return activeUserType === 'consumer'
                      ? 'text-neutral-900'
                      : 'text-neutral-300 hover:text-white'
                  } else {
                    // 菜單未展開時，使用頁面路徑判斷
                    return isConsumerPage
                      ? 'text-neutral-900'
                      : 'text-neutral-300 hover:text-white'
                  }
                })(),
              )}
            >
              顧客
            </button>
            <button
              onClick={() => {
                if (expanded && onUserTypeChange) {
                  // 菜單展開時，切換導航內容
                  onUserTypeChange('business')
                } else {
                  // 菜單未展開時，跳轉頁面
                  router.push(`${basePath}/franchise`)
                }
              }}
              className={clsx(
                'relative z-10 h-7 flex-1 rounded-full px-4 text-xs font-medium transition-all duration-200',
                'flex items-center justify-center min-w-0 whitespace-nowrap',
                (() => {
                  if (expanded) {
                    // 菜單展開時，使用 activeUserType 狀態
                    return activeUserType === 'business'
                      ? 'text-neutral-900'
                      : 'text-neutral-300 hover:text-white'
                  } else {
                    // 菜單未展開時，使用頁面路徑判斷
                    return isBusinessPage
                      ? 'text-neutral-900'
                      : 'text-neutral-300 hover:text-white'
                  }
                })(),
              )}
            >
              商業夥伴
            </button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-controls={panelId}
            className={clsx(
              'group -m-2.5 rounded-full p-2.5 transition',
              invert ? 'hover:bg-white/10' : 'hover:bg-neutral-950/10',
            )}
            aria-label="Toggle navigation"
          >
            <Icon
              className={clsx(
                'h-6 w-6',
                invert
                  ? 'fill-white group-hover:fill-neutral-200'
                  : 'fill-neutral-950 group-hover:fill-neutral-700',
              )}
            />
          </button>
        </div>
      </div>
    </Container>
  )
}

// 導航數據結構
const navigationData = {
  consumer: {
    title: '顧客',
    description: '為您的毛孩找到最適合的營養方案',
    items: [
      {
        href: '/consumer',
        title: '消費者首頁',
        description: '專為寵物主人設計的產品與服務',
      },
      {
        href: '/products',
        title: '產品系列',
        description: '營養均衡的寵物鮮食產品',
      },
      {
        href: '/store-locator',
        title: '門店查找',
        description: '找到離您最近的AMIGO販賣機',
      },
      {
        href: '/blog',
        title: '營養知識',
        description: '專業的寵物營養與健康資訊',
      },
      {
        href: '/pet-health-tools',
        title: '健康工具',
        description: '營養計算器與健康評估工具',
      },
      {
        href: '/comparison',
        title: '鮮食對比',
        description: '了解鮮食與傳統飼料的差異',
      },
    ],
  },
  business: {
    title: '商業夥伴',
    description: '開啟您的寵物鮮食事業之路',
    items: [
      {
        href: '/franchise',
        title: '加盟流程',
        description: '詳細的加盟申請與審核流程',
      },
      {
        href: '/calculator',
        title: '投資試算',
        description: '計算投資回報與獲利預估',
      },
      {
        href: '/vending-machine',
        title: '智能販賣機',
        description: 'AI智能管理系統介紹',
      },
      {
        href: '/experts',
        title: '專家團隊',
        description: '專業的研發與支援團隊',
      },
      { href: '/apply', title: '合作申請', description: '立即申請加盟合作' },
      {
        href: '/work',
        title: '成功案例',
        description: '加盟商成功經營案例分享',
      },
    ],
  },
}

function UserTypeSelector({
  activeType,
  onTypeChange,
}: {
  activeType: 'consumer' | 'business'
  onTypeChange: (type: 'consumer' | 'business') => void
}) {
  return (
    <div className="border-b border-neutral-700 bg-neutral-900 py-6">
      <Container>
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold text-white">
            選擇您的身份
          </h3>
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-neutral-700 bg-neutral-800 p-1">
              {Object.entries(navigationData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => onTypeChange(key as 'consumer' | 'business')}
                  className={clsx(
                    'flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200',
                    activeType === key
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-300 hover:bg-neutral-700 hover:text-white',
                  )}
                >
                  {key === 'consumer' ? (
                    <HeartIcon className="h-4 w-4" />
                  ) : (
                    <BuildingOfficeIcon className="h-4 w-4" />
                  )}
                  {data.title}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-neutral-400">
            選擇身份以查看相關的服務和功能
          </p>
        </div>
      </Container>
    </div>
  )
}

function NavigationSection({
  type,
  isActive,
}: {
  type: 'consumer' | 'business'
  isActive: boolean
}) {
  const data = navigationData[type]

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        height: isActive ? 'auto' : 0,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <Container>
        <nav className="font-display text-white">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {data.items.map((item, index) => (
              <motion.div
                key={item.href}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 10,
                }}
                transition={{
                  duration: 0.2,
                  delay: isActive ? index * 0.05 : 0,
                  ease: 'easeOut',
                }}
              >
                <Link
                  href={item.href}
                  className="group block rounded-2xl p-6 transition-all duration-200 hover:bg-white/10"
                >
                  <div className="text-xl font-medium tracking-tight text-white group-hover:text-blue-200 sm:text-2xl">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300">
                    {item.description}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>
      </Container>
    </motion.div>
  )
}

function Navigation({
  activeUserType,
}: {
  activeUserType: 'consumer' | 'business'
}) {
  return (
    <div className="mt-px">
      <div className="pt-8">
        <NavigationSection
          type="consumer"
          isActive={activeUserType === 'consumer'}
        />
        <NavigationSection
          type="business"
          isActive={activeUserType === 'business'}
        />
      </div>
    </div>
  )
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  let panelId = useId()
  let [expanded, setExpanded] = useState(false)
  let [isTransitioning, setIsTransitioning] = useState(false)
  let [activeUserType, setActiveUserType] = useState<'consumer' | 'business'>(
    'consumer',
  )
  let openRef = useRef<React.ElementRef<'button'>>(null)
  let closeRef = useRef<React.ElementRef<'button'>>(null)
  let navRef = useRef<React.ElementRef<'div'>>(null)
  let shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement
      ) {
        const link = event.target.closest('a')
        if (link) {
          // 檢查是否為內部連結且指向當前頁面
          const linkUrl = new URL(link.href, window.location.origin)
          const currentUrl = new URL(window.location.href)

          if (linkUrl.pathname === currentUrl.pathname) {
            setIsTransitioning(false)
            setExpanded(false)
          }
        }
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <MotionConfig
      transition={
        shouldReduceMotion || !isTransitioning ? { duration: 0 } : undefined
      }
    >
      <header>
        <div
          className="absolute top-2 right-0 left-0 z-40 pt-14"
          aria-hidden={expanded ? 'true' : undefined}
          // @ts-ignore (https://github.com/facebook/react/issues/17157)
          inert={expanded ? true : undefined}
        >
          <Header
            panelId={panelId}
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setIsTransitioning(true)
              setExpanded((expanded) => !expanded)
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true }),
              )
            }}
            onUserTypeChange={setActiveUserType}
            activeUserType={activeUserType}
          />
        </div>

        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? 'auto' : '0.5rem' }}
          className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
          aria-hidden={expanded ? undefined : 'true'}
          // @ts-ignore (https://github.com/facebook/react/issues/17157)
          inert={expanded ? undefined : true}
        >
          <motion.div layout className="bg-neutral-950">
            <div ref={navRef} className="bg-neutral-950 pt-14 pb-16">
              <Header
                invert
                panelId={panelId}
                icon={XIcon}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setIsTransitioning(true)
                  setExpanded((expanded) => !expanded)
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true }),
                  )
                }}
                onUserTypeChange={setActiveUserType}
                activeUserType={activeUserType}
              />
            </div>
            <Navigation activeUserType={activeUserType} />
            <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
              <Container>
                <div className="grid grid-cols-1 gap-y-10 pt-10 pb-16 sm:grid-cols-2 sm:pt-16">
                  <div>
                    <h2 className="font-display text-base font-semibold text-white">
                      聯絡據點
                    </h2>
                    <Offices
                      invert
                      className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                    />
                  </div>
                  <div className="sm:border-l sm:border-transparent sm:pl-16">
                    <h2 className="font-display text-base font-semibold text-white">
                      關注我們
                    </h2>
                    <SocialMedia className="mt-6" invert />
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <motion.div
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-50 stroke-neutral-950/5"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer />
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname}>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
