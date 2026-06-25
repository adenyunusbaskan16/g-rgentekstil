import { cn } from "@/lib/utils";

interface SectionTitleProps {
  tag?: "h1" | "h2" | "h3";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export default function SectionTitle({
  tag: Tag = "h2",
  title,
  subtitle,
  align = "center",
  className,
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      <Tag
        className={cn(
          "font-bold tracking-tight",
          Tag === "h1" && "text-3xl md:text-4xl lg:text-5xl",
          Tag === "h2" && "text-2xl md:text-3xl lg:text-4xl",
          Tag === "h3" && "text-xl md:text-2xl",
          light ? "text-white" : "text-[#1a2744]"
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base md:text-lg max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-gray-300" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
