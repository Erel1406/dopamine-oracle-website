"use client";

/**
 * A painterly, volumetric deep-space nebula — the Skyrim constellation-menu
 * backdrop. Built from layered blurred colour blobs, two tinted fractal-noise
 * fog clouds (SVG feTurbulence), a ghostly central god-ray, fine film grain
 * and a heavy cinematic vignette.
 *
 * Rendered as a FIXED layer behind the panning canvas, so the turbulence
 * filters are only ever computed at viewport resolution (cheap) while the
 * stars/constellations parallax on top of it.
 */
export default function NebulaBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden bg-[#04060a]">
      {/* Deep base wash — cold navy with a green undertone, like Skyrim's sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 90% at 50% 18%, #0a1a1c 0%, #071019 38%, #04060a 72%)",
        }}
      />

      {/* Soft colour blobs — the painterly depth (teal/green dominant) */}
      <div className="absolute inset-0">
        <span className="nebula-blob animate-nebula-drift absolute left-[8%] top-[6%] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(30,175,160,0.5),transparent_62%)] blur-[70px]" />
        <span className="nebula-blob animate-nebula-drift-slow absolute right-[4%] top-[2%] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(40,120,190,0.4),transparent_62%)] blur-[80px]" />
        <span className="nebula-blob animate-nebula-drift-slow absolute left-[52%] top-[30%] h-[48vh] w-[42vw] rounded-full bg-[radial-gradient(circle,rgba(36,150,105,0.34),transparent_62%)] blur-[85px]" />
        <span className="nebula-blob animate-nebula-drift absolute left-[28%] bottom-[-8%] h-[58vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(90,70,180,0.26),transparent_64%)] blur-[90px]" />
        <span className="nebula-blob animate-nebula-drift-slow absolute right-[18%] bottom-[2%] h-[42vh] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(255,128,38,0.18),transparent_60%)] blur-[80px]" />
        <span className="nebula-blob absolute left-[42%] top-[24%] h-[40vh] w-[30vw] rounded-full bg-[radial-gradient(circle,rgba(255,150,60,0.1),transparent_64%)] blur-[70px]" />
      </div>

      {/* Ghostly vertical god-ray / figure */}
      <div
        className="absolute left-1/2 top-0 h-full w-[34vw] -translate-x-1/2 opacity-60 mix-blend-screen"
        style={{
          background:
            "linear-gradient(180deg, rgba(150,210,225,0.0) 0%, rgba(120,190,210,0.16) 30%, rgba(90,150,190,0.10) 55%, transparent 85%)",
          filter: "blur(28px)",
        }}
      />

      {/* Fractal-noise fog clouds */}
      <svg
        className="absolute inset-0 h-full w-full mix-blend-screen"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <filter id="fogTeal" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.011"
              numOctaves={4}
              seed={7}
              stitchTiles="stitch"
              result="n"
            />
            {/* constant teal-green RGB, alpha driven by the noise red channel */}
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0.09
                      0 0 0 0 0.50
                      0 0 0 0 0.42
                      0.95 0 0 0 -0.18"
            />
            <feGaussianBlur stdDeviation="5" />
          </filter>

          <filter id="fogViolet" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves={4}
              seed={29}
              stitchTiles="stitch"
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0.22
                      0 0 0 0 0.34
                      0 0 0 0 0.58
                      0.8 0 0 0 -0.30"
            />
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <rect
          className="animate-fog-drift"
          width="120%"
          height="120%"
          x="-10%"
          y="-10%"
          filter="url(#fogTeal)"
          opacity={0.55}
        />
        <rect
          className="animate-fog-drift-rev"
          width="120%"
          height="120%"
          x="-10%"
          y="-10%"
          filter="url(#fogViolet)"
          opacity={0.4}
        />
      </svg>

      {/* Fine film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 42%, transparent 40%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.9) 100%)",
        }}
      />
    </div>
  );
}
