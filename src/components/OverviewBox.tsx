import { textFancyTitle1 } from '@/lib/utils';

interface OverviewBoxProps {
  title: string;
  iconLg: string;
  iconSm: string;
  index: number;
}

export default function OverviewBox({
  title,
  iconLg,
  iconSm,
  index,
}: OverviewBoxProps) {
  return (
    <div className="relative w-full h-86 bg-bg border-r border-b border-brand-stroke last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(4n)]:border-r-0 lg:border-r">
      <p className={textFancyTitle1('absolute left-6 top-6 text-white')}>
        {title}
      </p>
      <div className="absolute bottom-2 left-2 w-40 h-40 flex items-center justify-center">
        {/* 모바일/태블릿: lg 아이콘 */}
        <img
          src={iconLg}
          alt={title}
          className="w-[120px] h-[120px] block lg:hidden"
        />
        {/* 데스크톱: sm 아이콘 */}
        <img
          width={160}
          height={160}
          src={iconLg}
          alt={title}
          className="hidden lg:block"
        />
      </div>
    </div>
  );
}
