import Container from '@/components/Container';
import { EVENT } from '@/constants/event';
import { NAV_ITEMS } from '@/constants/navigation';

export default function Footer() {
  return (
    <footer className="text-white xl:max-w-[1440px] max-w-[430px] mx-auto h-[360px] p-5 xl:p-0 xl:h-[436px] relative overflow-hidden flex items-end">
      {/* SVG 배경 - 데스크톱 */}
      <div
        className="absolute inset-0 z-0 hidden xl:block"
        style={{
          backgroundImage: 'url(/gradient.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* PNG 배경 - 모바일 */}
      <div
        className="absolute inset-0 z-0 xl:hidden"
        style={{
          backgroundImage: 'url(/gradient_sm.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Container className="xl:pb-8 relative z-10 w-full">
        <div className="flex flex-col xl:gap-6 xl:mt-0">
          {/* 로고와 네비게이션 */}
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 xl:gap-0">
            <div className="flex flex-col gap-3 xl:gap-4 xl:ml-[33px]">
              <img
                src="/logo.svg"
                width={1025}
                height={206}
                alt=""
                className="w-[320px] h-[64px] xl:w-auto xl:h-auto"
              />
            </div>

            <ul className="text-fancy-body1 xl:text-fancy-subtitle1 flex flex-col gap-3 xl:gap-4 xl:mr-[103px]">
              {NAV_ITEMS.map((item, index) => (
                <li
                  className="cursor-pointer"
                  key={item + index.toString()}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright */}
          <p className="text-xs text-center xl:text-start text-gray-500 text-muted-fg xl:absolute xl:bottom-8 xl:left-[33px] mt-2 xl:mt-0">
            © {new Date().getFullYear()} {EVENT.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
