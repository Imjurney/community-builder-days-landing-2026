import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SessionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  speaker?: {
    name: string;
    org: string;
    profileImage: string;
  };
  description?: string;
  trackId?: string;
}

export function SessionBottomSheet({
  isOpen,
  onClose,
  title,
  speaker,
  description,
  trackId,
}: SessionBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 트랙별 배경색 설정
  const getTrackBackground = () => {
    switch (trackId) {
      case 'track1':
        return 'backdrop-blur-[10px] border border-primary bg-gradient-to-br from-[#703fff]/20 to-[#703fff]/10 border-[#703fff]/30';
      case 'track2':
        return 'backdrop-blur-[10px] border border-secondary bg-gradient-to-br from-[#FF9900]/20 to-[#FF9900]/10 border-[#FF9900]/30';
      case 'track3':
        return 'backdrop-blur-[10px] border border-stroke bg-gradient-to-br from-white/20 to-white/10 border-white/30';
      default:
        return 'backdrop-blur-[10px] border border-stroke bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] border-brand-stroke';
    }
  };

  // 트랙별 테두리 색상 설정
  const getTrackBorderColor = () => {
    switch (trackId) {
      case 'track1':
        return 'border-[#703fff]/50';
      case 'track2':
        return 'border-[#FF9900]/50';
      case 'track3':
        return 'border-white/50';
      default:
        return 'border-brand-stroke/50';
    }
  };

  // 트랙별 핸들 색상 설정
  const getTrackHandleColor = () => {
    switch (trackId) {
      case 'track1':
        return 'bg-[#703fff]/60';
      case 'track2':
        return 'bg-[#FF9900]/60';
      case 'track3':
        return 'bg-white/60';
      default:
        return 'bg-white/40';
    }
  };

  // 애니메이션 상태 관리
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(false);

      // 다음 렌더 사이클에서 애니메이션 시작
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);

      return () => clearTimeout(timer);
    } else if (isVisible) {
      setIsAnimating(false);

      // 애니메이션 완료 후 컴포넌트 숨김
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 모바일에서만 스크롤 막기 (1240px 미만)
      if (window.innerWidth < 1240) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (window.innerWidth < 1240) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose]);

  if (!isVisible || !description) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-out',
          isAnimating ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          'fixed bottom-0 left-1/2 z-50 max-h-[80vh] overflow-hidden w-full max-w-[430px]',
          'rounded-t-2xl shadow-2xl -translate-x-1/2',
          getTrackBackground(),
          'transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isAnimating
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-full opacity-0 scale-95'
        )}
        onClick={(e) => e.stopPropagation()}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className={cn('w-10 h-1 rounded-full', getTrackHandleColor())} />
        </div>

        {/* Content */}
        <div className="px-5 pb-8 max-h-[calc(80vh-40px)] overflow-y-auto">
          {/* Speaker info */}
          {speaker && (
            <div
              className={cn(
                'flex items-center gap-3 mb-4 pb-4 border-b',
                getTrackBorderColor()
              )}>
              <img
                src={speaker.profileImage}
                alt={`${speaker.name} 프로필`}
                className="w-12 h-12 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] leading-[20px] text-white/70">
                  {speaker.name} · {speaker.org}
                </p>
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="text-[18px] leading-[26px] font-semibold text-white mb-3">
            {title}
          </h3>

          {/* Description */}
          <div className="text-[14px] leading-[22px] text-white/80 whitespace-pre-wrap">
            {description}
          </div>
        </div>
      </div>
    </>
  );
}
