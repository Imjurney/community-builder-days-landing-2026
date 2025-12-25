import { cn } from '@/lib/utils';
import graphicImage from '@/assets/graphic.svg';
interface SpeakerCardProps {
  name: string;
  title: string;
  topic: string;
  org: string;
  profileImage: string;
  className?: string;
}

// 그래픽 배경 이미지

export default function SpeakerCard({
  name,
  title,
  topic,
  profileImage,
  className,
  org,
}: SpeakerCardProps) {
  return (
    <div
      className={cn(
        'relative w-[332px] h-[322px] overflow-hidden group cursor-pointer',
        className
      )}>
      {/* 프로필 이미지 */}
      <div className="absolute z-1 top-0 left-0 w-[332px] h-[332px] bg-linear-to-br from-slate-700 to-slate-900">
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

      {/* 그래픽 배경 - 호버 시 올라옴 */}
      <div className="absolute z-10 bottom-0 left-0 w-[332px] h-[332px] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <img
          src={graphicImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 text-white pointer-events-none">
          <div>
            <h3 className="text-title1 text-white mb-1">{name}</h3>
            <p className="text-fancy-body1 text-white">{org}</p>
          </div>
          <p className="text-title1 text-black leading-tight">{topic}</p>
        </div>
      </div>

      {/* 스피커 정보 (이미지 위 오버레이) */}
      <div className="absolute z-1 bottom-0 left-0 right-0 w-full bg-linear-to-t from-black/80 via-black/40 to-transparent pt-8 pb-6 px-6 text-white">
        <h3 className="text-title1 text-white mb-1">{name}</h3>
        <p className="text-fancy-body1 text-white">{title}</p>
      </div>
    </div>
  );
}
