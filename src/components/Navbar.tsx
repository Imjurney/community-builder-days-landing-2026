import { NAV_ITEMS } from '@/constants/navigation';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/25 backdrop-blur-[10px] h-[88px]">
      <div className="flex w-full max-w-[1440px] h-[88px] pl-8 pr-[376px] py-6 items-center gap-[145px] mx-auto">
        <div className="flex items-center">
          <img
            src="/logo.svg"
            alt="Community Builder Days 2025"
            className="h-10 w-50"
          />
        </div>

        {/* 메뉴 영역 */}
        <nav className="flex items-center gap-[72px]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-fancy-subtitle1 text-white transition-colors hover:text-primary whitespace-nowrap">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
