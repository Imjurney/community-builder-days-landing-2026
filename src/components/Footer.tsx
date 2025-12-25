import Container from '@/components/Container';
import { EVENT } from '@/constants/event';
import { NAV_ITEMS } from '@/constants/navigation';
import { textFancySubtitle1 } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="text-white max-w-[1440px] mx-auto h-[436px] relative overflow-hidden flex items-end">
      {/* SVG 배경 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/gradient.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Container className="pb-8 relative z-10 w-full">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4 ml-[33px]">
            <img
              src="/logo.svg"
              width={1025}
              height={206}
              alt=""
            />
            <p className="text-body1 text-muted-fg">
              © {new Date().getFullYear()} {EVENT.name}. All rights reserved.
            </p>
          </div>

          <ul className={textFancySubtitle1('flex flex-col gap-4 mr-[103px]')}>
            {NAV_ITEMS.map((item, index) => (
              <li
                className="cursor-pointer"
                key={item + index.toString()}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
