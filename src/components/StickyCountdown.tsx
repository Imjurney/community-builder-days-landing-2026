import React from "react";
import gsap from "gsap";
import { useGSAP } from "@/lib/gsap";
import Countdown from "./Countdown";
import { EVENT } from "@/constants/event";

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollPosition);
    };
  }, []);

  return scrollPercentage;
}

type Props = {
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function StickyCountdown({
  buttonText = "참가하러 가기",
  onButtonClick,
}: Props) {
  const scrollPercentage = useScrollPosition();
  const [isMounted, setIsMounted] = React.useState(false);
  const showTimelineRef = React.useRef<gsap.core.Timeline | null>(null);
  const hideTimelineRef = React.useRef<gsap.core.Timeline | null>(null);
  const shouldShow = scrollPercentage >= 10;

  // 버튼 클릭 핸들러 메모이제이션
  const handleButtonClick = React.useCallback(() => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.open(EVENT.registerUrl, "_blank");
    }
  }, [onButtonClick]);

  // GSAP 애니메이션을 위한 ref와 애니메이션 로직
  const setupAnimation = React.useCallback((element: HTMLDivElement, ctx: gsap.Context) => {
    gsap.set(element, { y: -100, autoAlpha: 0, scale: 0.96 });

    const showTimeline = ctx.timeline({ paused: true });
    const hideTimeline = ctx.timeline({ paused: true });

    showTimeline.to(element, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
      clearProps: "willChange",
    });

    hideTimeline.to(element, {
      y: -120,
      autoAlpha: 0,
      scale: 0.96,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => setIsMounted(false),
    });

    showTimelineRef.current = showTimeline;
    hideTimelineRef.current = hideTimeline;

    return () => {
      showTimelineRef.current = null;
      hideTimelineRef.current = null;
    };
  }, []);

  const containerRef = useGSAP<HTMLDivElement>(setupAnimation);

  React.useEffect(() => {
    if (shouldShow) {
      setIsMounted(true);
      return;
    }

    hideTimelineRef.current?.restart();
  }, [shouldShow]);

  React.useEffect(() => {
    if (!isMounted || !shouldShow) return;
    const id = requestAnimationFrame(() => showTimelineRef.current?.restart());
    return () => cancelAnimationFrame(id);
  }, [isMounted, shouldShow]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-[112px] left-1/2 z-50 -translate-x-1/2 will-change-transform"
    >
      <Countdown
        targetIso={EVENT.startAt}
        buttonText={buttonText}
        onButtonClick={handleButtonClick}
        className="shadow-xl"
      />
    </div>
  );
}
