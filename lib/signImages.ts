import type { StaticImageData } from "next/image";
import aries from "@/app/assets/aries.png";
import taurus from "@/app/assets/taurus.png";
import gemini from "@/app/assets/gemini.png";
import cancer from "@/app/assets/cancer.png";
import leo from "@/app/assets/leo.png";
import virgo from "@/app/assets/virgo.png";
import libra from "@/app/assets/libra.png";
import scorpio from "@/app/assets/scorpio.png";
import sagittarius from "@/app/assets/sagittarius.png";
import capricorn from "@/app/assets/capricorn.png";
import aquarius from "@/app/assets/aquarius.png";
import pisces from "@/app/assets/pisces.png";

/** Illustrated sign artwork, keyed by ZodiacSign.id. */
export const SIGN_IMAGES: Record<string, StaticImageData> = {
  aries,
  taurus,
  gemini,
  cancer,
  leo,
  virgo,
  libra,
  scorpio,
  sagittarius,
  capricorn,
  aquarius,
  pisces,
};
