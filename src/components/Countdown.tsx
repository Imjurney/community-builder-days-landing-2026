import React from "react";
import gsap from "gsap";
import {
  cnCustom,
  textFancyLargeTitle2,
  textFancySubtitle1,
  textBody1,
} from "@/lib/utils";

// 유틸리티 함수: 숫자를 2자리로 패딩
function pad2(value: number) {
  return String(value).padStart(2, "0");
}

// 유틸리티 함수: 남은 시간 계산
function getRemaining(targetAtMs: number, nowMs: number) {
  const totalMs = Math.max(0, targetAtMs - nowMs);
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isComplete: targetAtMs <= nowMs,
  };
}

// 커스텀 Hook: 카운트다운 로직 분리 (단일 책임 원칙)
function useCountdown(targetIso: string) {
  const targetAtMs = React.useMemo(() => Date.parse(targetIso), [targetIso]);
  const [nowMs, setNowMs] = React.useState(() => Date.now());

  React.useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const isValidTarget = Number.isFinite(targetAtMs);
  const remaining = React.useMemo(() => {
    return isValidTarget ? getRemaining(targetAtMs, nowMs) : null;
  }, [isValidTarget, targetAtMs, nowMs]);

  return { isValidTarget, remaining };
}

type Props = {
  targetIso: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
};

// 프레젠테이션 컴포넌트: UI 렌더링만 담당
export default function Countdown({
  targetIso,
  buttonText = "참가하러 가기",
  onButtonClick,
  className,
}: Props) {
  const { isValidTarget, remaining } = useCountdown(targetIso);

  // 버튼 클릭 핸들러 메모이제이션
  const handleButtonClick = React.useCallback(() => {
    onButtonClick?.();
  }, [onButtonClick]);

  if (!isValidTarget || !remaining) {
    return null;
  }

  return (
    <div
      className={cnCustom(
        "relative isolate w-max my-0 mx-auto",
        className
      )}
      aria-live="polite"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[20px] bg-white/20 backdrop-blur-[10px]"
      />

      <div className="relative z-10 flex gap-16 items-center p-3">
        <div className="flex gap-8 items-center">
          <TimeUnit value={remaining.days} label="days" />
          <TimeUnit value={remaining.hours} label="hours" />
          <TimeUnit value={remaining.minutes} label="minutes" />
          <TimeUnit value={remaining.seconds} label="seconds" />
        </div>

        <button
          onClick={handleButtonClick}
          className="relative flex items-center justify-center rounded-2xl px-[14px] py-[10px] shrink-0"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-orange-500/60 backdrop-blur-[5px] transition-colors hover:bg-orange-500/80"
          />
          <span
            className={textBody1("relative z-10 text-white text-center whitespace-nowrap")}
          >
            {buttonText}
          </span>
        </button>
      </div>
    </div>
  );
}

// 시간 단위 컴포넌트: 각 시간 단위를 표시 (React.memo로 최적화)
type TimeUnitProps = {
  value: number;
  label: string;
};

const TimeUnit = React.memo(function TimeUnit({ value, label }: TimeUnitProps) {
  const valueRef = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    if (!valueRef.current) return;
    const tween = gsap.fromTo(
      valueRef.current,
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out" }
    );
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <div className="flex gap-1 items-center whitespace-nowrap">
      <span ref={valueRef} className={textFancyLargeTitle2("text-white tabular-nums")}>
        {pad2(value)}
      </span>
      <span className={textFancySubtitle1("text-white/60")}>{label}</span>
    </div>
  );
});
