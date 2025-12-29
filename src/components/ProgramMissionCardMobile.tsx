import { cn } from "@/lib/utils";

interface ProgramMissionCardMobileProps {
    title?: string;
    subtitle?: string;
    description?: string;
    className?: string;
}

export default function ProgramMissionCardMobile({
    title = "Program mission",
    subtitle = "AWS Community\nBuilders Day Korea는",
    description = "AWS Community Builder와 Hero가\n각자의 전문 분야에 \n최신 트렌드와 인사이트를 공유하는 행사입니다.",
    className = "",
}: ProgramMissionCardMobileProps) {
    return (
        <div
            className={cn(
                "xl:hidden w-full h-[320px] relative overflow-hidden",
                className
            )}
        >
            {/* Grid pattern */}
            <div className="absolute inset-0">
                {/* Vertical lines */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={`v-${i}`}
                        className="absolute h-full w-px bg-[#41424A]"
                        style={{ left: `${32 + i * 32}px` }}
                    />
                ))}
                {/* Horizontal lines */}
                {Array.from({ length: 11 }).map((_, i) => (
                    <div
                        key={`h-${i}`}
                        className="absolute w-full h-px bg-[#41424A]"
                        style={{ top: `${31.5 + i * 32}px` }}
                    />
                ))}
            </div>

            {/* Orange highlight shape */}
            <div
                className="absolute bg-[#FF9900] opacity-60"
                style={{
                    left: "0",
                    top: "32px",
                    width: "360px",
                    height: "255px",
                    clipPath:
                        "polygon(0 0, 287.5px 0, 287.5px 64px, 360px 64px, 360px 255px, 0 255px)",
                }}
            />

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
                <p className="text-fancy-subtitle1 mb-2">{title}</p>
                <h2 className="text-2xl font-bold leading-tight mb-3 korean-title1">
                    {subtitle.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            {index < subtitle.split("\n").length - 1 && <br />}
                        </span>
                    ))}
                </h2>
                <p className="text-base leading-relaxed korean-body1 max-w-4/5">
                    {description.replace(/\n/g, " ")}
                </p>
            </div>
        </div>
    );
}
