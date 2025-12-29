import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@/lib/gsap';
import Countdown from './Countdown';
import { EVENT } from '@/constants/event';

// 스크롤 위치를 추적하는 Hook (기존 방식 유지)
function useScrollPosition() {
  const [scrollPercentage, setScrollPercentage] = React.useState(0);

  React.useEffect(() => {
    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percentage =
        documentHeight > 0 ? (scrollY / documentHeight) * 100 : 0;
      setScrollPercentage(percentage);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateScrollPosition);
    };

    updateScrollPosition();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollPosition);
    };
  }, []);

  return scrollPercentage;
}

type Props = {
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function StickyCountdown({
  buttonText = '참가신청',
  onButtonClick,
}: Props) {
  const scrollPercentage = useScrollPosition();
  const [isReady, setIsReady] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);
  const showTimelineRef = React.useRef<gsap.core.Timeline | null>(null);
  const hideTimelineRef = React.useRef<gsap.core.Timeline | null>(null);
  const shouldShow = isShown;

  // 버튼 클릭 핸들러 메모이제이션
  const handleButtonClick = React.useCallback(() => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.open(EVENT.registerUrl, '_blank');
    }
  }, [onButtonClick]);

  // GSAP 애니메이션을 위한 ref와 애니메이션 로직
  const setupAnimation = React.useCallback(
    (element: HTMLDivElement, ctx: gsap.Context) => {
      gsap.set(element, {
        y: -100,
        autoAlpha: 0,
        scale: 0.96,
        pointerEvents: 'none',
      });

      const showTimeline = gsap.timeline({ paused: true });
      const hideTimeline = gsap.timeline({ paused: true });

      showTimeline
        .add(() => {
          gsap.set(element, { pointerEvents: 'auto' });
        }, 0)
        .to(element, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
        });

      hideTimeline
        .add(() => {
          gsap.set(element, { pointerEvents: 'none' });
        }, 0)
        .to(element, {
          y: -120,
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.5,
          ease: 'power3.inOut',
        });

      showTimelineRef.current = showTimeline;
      hideTimelineRef.current = hideTimeline;
      setIsReady(true);

      return () => {
        setIsReady(false);
        showTimelineRef.current = null;
        hideTimelineRef.current = null;
      };
    },
    []
  );

  const containerRef = useGSAP<HTMLDivElement>(setupAnimation);

  React.useEffect(() => {
    // 임계점(10%) 근처에서 토글되면 "뚝/깜빡"처럼 보일 수 있어서,
    // show/hide 임계값을 다르게(10%/8%) 둡니다.
    if (scrollPercentage >= 10) setIsShown(true);
    else if (scrollPercentage <= 8) setIsShown(false);
  }, [scrollPercentage]);

  React.useEffect(() => {
    if (!isReady) return;

    if (shouldShow) {
      hideTimelineRef.current?.pause(0);
      showTimelineRef.current?.restart(true);
      return;
    }

    // NOTE: hide 시 show 타임라인을 0으로 되감으면 즉시 "뚝" 사라져 보일 수 있어서
    // 현재 상태에서 멈추기만 하고, hide 타임라인이 현 상태에서 자연스럽게 내려가며 사라지게 합니다.
    showTimelineRef.current?.pause();
    hideTimelineRef.current?.restart(true);
  }, [shouldShow, isReady]);

  return (
    <div
      ref={containerRef}
      className="hidden xl:block fixed top-[70px] xl:top-[112px] left-1/2 z-50 -translate-x-1/2 will-change-transform"
      aria-hidden={!shouldShow}>
      <Countdown
        targetIso={EVENT.startAt}
        buttonText={buttonText}
        onButtonClick={handleButtonClick}
        className="shadow-xl"
      />
    </div>
  );
}
