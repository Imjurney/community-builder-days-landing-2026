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
}: OverviewBoxProps) {
  return (
    <div className="relative w-full h-[180px] xl:h-[344px] bg-bg border-r border-b border-brand-stroke last:border-r-0 sm:nth-[2n]:border-r-0 lg:nth-[4n]:border-r-0 lg:border-r overflow-hidden">
      <p className="text-fancy-subtitle1 xl:text-fancy-title1 absolute left-[19.5px] xl:left-6 top-[19.5px] xl:top-6 text-white">
        {title}
      </p>
      <div className="absolute bottom-[9.5px] xl:bottom-2 left-[9.5px] xl:left-2 w-20 xl:w-40 h-20 xl:h-40 flex items-center justify-center">
        {/* 데스크톱: lg 아이콘 (160x160) */}
        <img
          width={160}
          height={160}
          src={iconLg}
          alt={title}
          className="hidden xl:block"
        />
        {/* 모바일: sm 아이콘 (80x80) */}
        <img
          width={80}
          height={80}
          src={iconSm}
          alt={title}
          className="xl:hidden block"
        />
      </div>
    </div>
  );
}
