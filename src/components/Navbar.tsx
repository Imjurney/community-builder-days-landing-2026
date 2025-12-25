import { useState } from 'react';
import { NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/lib/utils';
import menuIcon from '@/assets/icons/menu.svg';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/25 backdrop-blur-[10px] h-[58px] xl:h-[88px]">
      <div className="flex w-full max-w-[430px] xl:max-w-[1440px] h-full px-4 xl:pl-8 xl:pr-[376px] py-[17px] xl:py-6 items-center justify-between xl:gap-[145px] mx-auto">
        {/* 로고 */}
        <div className="flex items-center">
          <img
            src="/logo.svg"
            alt="Community Builder Days 2025"
            className="h-8 xl:h-10 w-auto"
          />
        </div>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden xl:flex items-center gap-[72px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-fancy-subtitle1 text-white transition-colors hover:text-primary whitespace-nowrap">
              {item.label}
            </a>
          ))}
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn('xl:hidden w-6 h-6 transition-transform duration-300')}
          aria-label="메뉴 열기">
          <img
            src={menuIcon}
            alt="메뉴"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <nav
        className={cn(
          'xl:hidden absolute top-[58px] left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black/95 backdrop-blur-[10px] transition-all duration-300 overflow-hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}>
        <div className="flex flex-col gap-6 p-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-fancy-subtitle1 text-white transition-colors hover:text-primary">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
