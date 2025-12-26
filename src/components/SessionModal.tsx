import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
  trackId?: string;
}

export function SessionModal({
  isOpen,
  onClose,
  title,
  speaker,
  description,
  position,
  trackId,
}: SessionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState({
    left: -9999,
    top: -9999,
  });
  const [isPositioned, setIsPositioned] = useState(false);

  // 트랙별 배경색 설정
  const getTrackBackground = () => {
    switch (trackId) {
      case "track1":
        return "backdrop-blur-[10px] border boder-primary bg-gradient-to-br from-[#703fff]/20 to-[#703fff]/10 border-[#703fff]/30";
      case "track2":
        return "backdrop-blur-[10px] border boder-secondary bg-gradient-to-br from-[#FF9900]/20 to-[#FF9900]/10 border-[#FF9900]/30";
      case "track3":
        return "backdrop-blur-[10px] border boder-stroke bg-gradient-to-br from-white/20 to-white/10 border-white/30";
      default:
        return "backdrop-blur-[10px] border boder-stroke bg-gradient-to-br from-white/20 to-white/10 border-white/30";
    }
  };

  // 트랙별 테두리 색상 설정
  const getTrackBorderColor = () => {
    switch (trackId) {
      case "track1":
        return "border-[#703fff]/50";
      case "track2":
        return "border-[#FF9900]/50";
      case "track3":
        return "border-brand-stroke/50";
      default:
        return "border-brand-stroke/50";
    }
  };

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
          "fixed z-50 w-[min(480px,calc(100vw-40px))] max-h-[400px] overflow-y-auto justify-start",
          getTrackBackground(),
          "rounded-xl shadow-2xl",
          "transition-opacity duration-150",
          isPositioned ? "opacity-100" : "opacity-0"
        )}
        style={{
          left: `${modalPosition.left}px`,
          top: `${modalPosition.top}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="p-4">
          {/* Speaker info */}
          {speaker && (
            <div
              className={cn(
                "flex items-center gap-3 mb-3 pb-3 border-b",
                getTrackBorderColor()
              )}
            >
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
