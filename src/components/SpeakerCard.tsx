import { cn } from '@/lib/utils';
import graphicImage from '@/assets/graphic.svg';
import { Speaker } from '@/types/event';

interface SpeakerCardProps extends Speaker {
  className?: string;
  isActive?: boolean;
  onCardClick?: (id: string) => void;
}

export default function SpeakerCard({
  id,
  name,
  org,
  bio,
  profileImage,
  className,
  isActive = false,
  onCardClick,
}: SpeakerCardProps) {
  const handleClick = () => {
    // 모바일에서만 클릭으로 토글
    if (window.innerWidth < 1240 && onCardClick) {
      onCardClick(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative w-[260px] h-[260px] xl:w-[332px] xl:h-[322px] overflow-hidden group',
        className
      )}>
      {/* 프로필 이미지 */}
      <div className="absolute z-1 top-0 left-0 w-[260px] h-[260px] xl:w-[332px] xl:h-[332px] bg-linear-to-br from-slate-700 to-slate-900">
        <img
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
          src={profileImage}
          alt={`${name} 프로필`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 그래픽 배경 - 모바일: 클릭 시, 데스크톱: 호버 시 올라옴 */}
      <div
        className={cn(
          'absolute z-10 bottom-0 left-0 w-[260px] h-[260px] xl:w-[332px] xl:h-[332px] transform transition-transform duration-300 ease-out',
          'xl:translate-y-full xl:group-hover:translate-y-0',
          isActive ? 'translate-y-0' : 'translate-y-full'
        )}>
        <img
          src={graphicImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-3 xl:p-6 text-white pointer-events-none">
          {/* 상단: 이름과 직책 */}
          <div className="xl:mb-6 mb-3">
            <h3 className="text-title1 text-white">{name}</h3>
            <p className="text-fancy-body1 text-white">{org}</p>
          </div>

          {/* 하단: 소개 */}
          <div>
            <p className="speaker-bio text-black h-[140px]">{bio}</p>
          </div>
        </div>
      </div>

      {/* 스피커 정보 (이미지 위 오버레이) - 그래픽 오버레이가 없을 때만 표시 */}
      <div
        className={cn(
          'absolute z-1 bottom-0 left-0 right-0 w-[260px] xl:w-full bg-linear-to-t from-black/80 via-black/40 to-transparent pt-8 pb-3 xl:pb-6 px-3 xl:px-6 text-white transition-opacity duration-300',
          'xl:group-hover:opacity-0',
          isActive ? 'opacity-0' : 'opacity-100'
        )}>
        <h3 className="text-title1 text-white">{name}</h3>
        <p className="text-fancy-body1 text-white">{org}</p>
      </div>
    </div>
  );
}
