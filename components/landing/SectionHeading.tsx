import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-ember/80">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl leading-tight text-white text-balance md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/55">
          {subtitle}
        </p>
      )}
    </div>
  );
}
