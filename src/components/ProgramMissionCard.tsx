import { cn } from "@/lib/utils";

interface ProgramMissionCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function ProgramMissionCard({
  title = "Program mission",
  subtitle = "AWS Community\nBuilders Day Korea는",
  description = "커뮤니티 Builder와 Hero가 각자의 전문 분야에 대한\n세션과 인사이트를 제공하는 행사입니다.",
  className = "",
}: ProgramMissionCardProps) {
  return (
    <div
      className={cn(
        "hidden xl:block w-[801px] h-[416px] relative overflow-hidden shrink-0",
        className
      )}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0">
        {/* Vertical lines */}
        {Array.from({ length: 26 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-[#41424A]"
            style={{ left: `${32 + i * 32}px` }}
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 14 }).map((_, i) => (
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
          left: "31.5px",
          top: "31px",
          width: "673px",
          height: "353px",
          clipPath:
            "polygon(0 0, 289px 0, 289px 64px, 673px 64px, 673px 353px, 0 353px)",
        }}
      />

      {/* Text content */}
      <div
        className="absolute inset-0 flex flex-col justify-center px-16 text-white"
        style={{ marginTop: "-25px" }}
      >
        <p className="text-fancy-title1 mb-2" style={{ marginBottom: "30px" }}>
          {title}
        </p>
        <h2
          className="text-[45px] font-bold leading-tight mb-4 korean-large-title1"
          style={{ marginBottom: "35px" }}
        >
          {subtitle.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index < subtitle.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="text-xl leading-relaxed korean-body1">
          {description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index < description.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
