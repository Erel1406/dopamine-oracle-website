import Image from "next/image";
import type { ZodiacSign } from "@/lib/zodiac";
import { SIGN_IMAGES } from "@/lib/signImages";
import { cn } from "@/lib/utils";
import Constellation from "./Constellation";

/**
 * Illustrated sign artwork inside a rounded frame. Size and shape come from
 * `className` on the wrapper (e.g. "h-24 w-24 rounded-2xl"). Falls back to
 * the procedural constellation if a sign has no artwork yet.
 */
export default function SignArt({
  sign,
  className,
  sizes = "120px",
  priority = false,
}: {
  sign: ZodiacSign;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const img = SIGN_IMAGES[sign.id];
  if (!img) {
    return (
      <span className={cn("flex items-center justify-center", className)}>
        <Constellation sign={sign} size={64} variant="mini" />
      </span>
    );
  }
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <Image
        src={img}
        alt={`${sign.name} — ${sign.facts.symbol}`}
        fill
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        className="object-cover"
      />
    </span>
  );
}
