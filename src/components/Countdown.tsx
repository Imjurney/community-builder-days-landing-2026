import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import gsap from 'gsap';
import { cnCustom } from '@/lib/utils';
import { pad2, getRemaining } from '@/lib/time';

// 커스텀 Hook: 카운트다운 로직 분리 (단일 책임 원칙)
function useCountdown(targetIso: string) {
    const targetAtMs = useMemo(() => Date.parse(targetIso), [targetIso]);
    const [nowMs, setNowMs] = useState(() => Date.now());

    useEffect(() => {
        const id = window.setInterval(() => setNowMs(Date.now()), 1000);
        return () => window.clearInterval(id);
    }, []);

    const isValidTarget = Number.isFinite(targetAtMs);
    const remaining = useMemo(() => {
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
    buttonText = '참가신청',
    onButtonClick,
    className,
}: Props) {
    const { isValidTarget, remaining } = useCountdown(targetIso);

    // 버튼 클릭 핸들러 메모이제이션
    const handleButtonClick = useCallback(() => {
        onButtonClick?.();
    }, [onButtonClick]);

    if (!isValidTarget || !remaining) {
        return null;
    }

    return (
        <div
            className={cnCustom('relative isolate w-80 xl:w-max mx-auto', className)}
            aria-live="polite">
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 rounded-[20px] bg-white/20 backdrop-blur-[10px]"
            />

            <div className="relative z-10 flex flex-col xl:flex-row gap-3 xl:gap-16 items-center p-4 xl:p-3">
                <div className="flex gap-2 xl:gap-8 items-center w-full xl:w-auto justify-center">
                    <TimeUnit
                        value={remaining.days}
                        label="days"
                        mobileLabel="days"
                    />
                    <TimeUnit
                        value={remaining.hours}
                        label="hours"
                        mobileLabel="h"
                    />
                    <TimeUnit
                        value={remaining.minutes}
                        label="minutes"
                        mobileLabel="m"
                    />
                    <TimeUnit
                        value={remaining.seconds}
                        label="seconds"
                        mobileLabel="s"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="group relative flex items-center justify-center rounded-2xl px-[14px] py-[10px] shrink-0 w-full xl:w-auto">
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-2xl bg-orange-500/60 backdrop-blur-[5px] transition-colors duration-300 group-hover:bg-orange-500/80"
                    />
                    <span className="text-body1 relative z-10 text-white text-center whitespace-nowrap">
                        {buttonText}
                    </span>
                </button>
            </div>
        </div>
    );
}

// 시간 단위 컴포넌트: 각 시간 단위를 표시 (memo로 최적화)
type TimeUnitProps = {
    value: number;
    label: string;
    mobileLabel: string;
};

const TimeUnit = memo(function TimeUnit({
    value,
    label,
    mobileLabel,
}: TimeUnitProps) {
    const valueRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        if (!valueRef.current) return;
        const tween = gsap.fromTo(
            valueRef.current,
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' }
        );
        return () => {
            tween.kill();
        };
    }, [value]);

    return (
        <div className="flex gap-1 items-center whitespace-nowrap">
            <span
                ref={valueRef}
                className="text-fancy-timer2 xl:text-fancy-timer text-white">
                {pad2(value)}
            </span>
            <span className="text-fancy-body1 xl:text-fancy-subtitle1 text-white/60">
                <span className="xl:hidden">{mobileLabel}</span>
                <span className="hidden xl:inline">{label}</span>
            </span>
        </div>
    );
});
