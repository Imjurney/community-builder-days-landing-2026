import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    speaker?: {
        name: string;
        org: string;
        profileImage: string;
    };
    description?: string;
    position: { x: number; y: number };
}

export function SessionModal({
    isOpen,
    onClose,
    title,
    speaker,
    description,
    position,
}: SessionModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalPosition, setModalPosition] = useState({ left: -9999, top: -9999 });
    const [isPositioned, setIsPositioned] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsPositioned(false);
            setModalPosition({ left: -9999, top: -9999 });
            return;
        }

        // Small delay to ensure modal is rendered with content
        const timer = setTimeout(() => {
            if (!modalRef.current) return;

            const modal = modalRef.current;
            const rect = modal.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let left = position.x + 20; // 20px offset from cursor
            let top = position.y + 20;

            // Adjust if modal goes off-screen to the right
            if (left + rect.width > viewportWidth - 20) {
                left = position.x - rect.width - 20;
            }

            // Adjust if modal goes off-screen to the bottom
            if (top + rect.height > viewportHeight - 20) {
                top = viewportHeight - rect.height - 20;
            }

            // Ensure modal doesn't go off-screen to the left
            if (left < 20) {
                left = 20;
            }

            // Ensure modal doesn't go off-screen to the top
            if (top < 20) {
                top = 20;
            }

            setModalPosition({ left, top });
            setIsPositioned(true);
        }, 0);

        return () => clearTimeout(timer);
    }, [isOpen, position]);

    if (!isOpen || !description) return null;

    return (
        <>
            {/* Backdrop for mobile - click to close */}
            <div
                className="fixed inset-0 z-40 bg-black/40 xl:hidden"
                onClick={onClose}
            />

            <div
                ref={modalRef}
                className={cn(
                    'fixed z-50 w-[min(480px,calc(100vw-40px))] max-h-[400px] overflow-y-auto',
                    'bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e]',
                    'border border-brand-stroke rounded-xl shadow-2xl',
                    'transition-opacity duration-150',
                    isPositioned ? 'opacity-100' : 'opacity-0'
                )}
                style={{
                    left: `${modalPosition.left}px`,
                    top: `${modalPosition.top}px`
                }}
                onClick={(e) => e.stopPropagation()}>
                {/* Content */}
                <div className="p-4">
                    {/* Speaker info */}
                    {speaker && (
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-brand-stroke/50">
                            <img
                                src={speaker.profileImage}
                                alt={`${speaker.name} 프로필`}
                                className="w-12 h-12 rounded-full object-cover"
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
                    <h3 className="text-[16px] leading-[24px] font-semibold text-white mb-2">
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
