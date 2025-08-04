import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'

const navigation = [
  {
    title: '寵物主人',
    links: [
      { title: '消費者首頁', href: '/consumer' },
      { title: '產品系列', href: '/products' },
      { title: '門店查找', href: '/store-locator' },
      { title: '營養知識', href: '/blog' },
      { title: '健康工具', href: '/pet-health-tools' },
    ],
  },
  {
    title: '加盟商',
    links: [
      { title: '加盟流程', href: '/franchise' },
      { title: '投資試算', href: '/calculator' },
      { title: '智能販賣機', href: '/vending-machine' },
      { title: '合作申請', href: '/apply' },
      { title: '成功案例', href: '/work' },
    ],
  },
  {
    title: '關於 AMIGO',
    links: [
      { title: '專家團隊', href: '/experts' },
      { title: '品質認證', href: '/experts#certifications' },
      { title: '營養科學', href: '/experts#nutrition' },
      { title: '聯絡我們', href: '/contact' },
      { title: '客服中心', href: '/support' },
    ],
  },
  {
    title: '法律條款',
    links: [
      { title: '隱私政策', href: '/privacy-policy' },
      { title: '服務條款', href: '/terms-of-service' },
      { title: '退換貨政策', href: '/return-policy' },
      { title: '常見問題', href: '/faq' },
    ],
  },
]

function Navigation() {
  return (
    <nav>
      <ul
        role="list"
        className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        訂閱最新資訊
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        訂閱我們的電子報，獲取最新的產品資訊、加盟優惠和寵物營養知識。
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="請輸入您的 Email"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            © AMIGO 寵物鮮食科技有限公司 {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
