export type Point = [number, number];

export type ZodiacSign = {
  id: string;
  name: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  /** A short, cryptic "Daily Truth" teaser. */
  dailyTruth: string;
  /** What the Oracle already "knows" — freemium teaser bullets. */
  oracleKnows: string[];
  /**
   * The constellation drawn from stars. Each entry is a "stroke" — a
   * polyline of points in a 0–100 box (y points down). Stars are placed
   * at every vertex; lines are drawn along each stroke. Together they
   * form the astrological figure in the sky.
   */
  strokes: Point[][];
  /** Position of the constellation's centre on the oversized canvas (%). */
  x: number;
  y: number;
};

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: "aries",
    name: "Aries",
    dates: "Mar 21 — Apr 19",
    element: "Fire",
    dailyTruth: "A spark you ignored at dawn becomes a fire by dusk.",
    oracleKnows: [
      "You move before you are ready — and you are usually right.",
      "Your impatience is a compass, not a flaw.",
      "Something you start this month outlives you.",
    ],
    strokes: [
      [
        [22, 68],
        [26, 44],
        [34, 34],
        [44, 42],
        [50, 54],
      ],
      [
        [50, 54],
        [56, 42],
        [66, 34],
        [74, 44],
        [78, 68],
      ],
    ],
    x: 14,
    y: 20,
  },
  {
    id: "taurus",
    name: "Taurus",
    dates: "Apr 20 — May 20",
    element: "Earth",
    dailyTruth: "What you root in silence today, no storm can uproot.",
    oracleKnows: [
      "You confuse stubbornness with loyalty — the stars do not.",
      "Comfort is your altar, and your cage.",
      "A door you refuse to close is the one fate keeps knocking on.",
    ],
    strokes: [
      [
        [65, 64],
        [62, 55],
        [55, 50],
        [45, 50],
        [38, 55],
        [35, 64],
        [38, 73],
        [45, 78],
        [55, 78],
        [62, 73],
        [65, 64],
      ],
      [
        [42, 52],
        [32, 42],
        [42, 34],
      ],
      [
        [58, 52],
        [68, 42],
        [58, 34],
      ],
    ],
    x: 30,
    y: 40,
  },
  {
    id: "gemini",
    name: "Gemini",
    dates: "May 21 — Jun 20",
    element: "Air",
    dailyTruth: "Two voices. Only one is telling you the truth.",
    oracleKnows: [
      "You are never lonely, yet rarely known.",
      "The mask you wear best is the one shaped like your face.",
      "A message you have not sent is already changing things.",
    ],
    strokes: [
      [
        [34, 28],
        [50, 23],
        [66, 28],
      ],
      [
        [41, 27],
        [41, 73],
      ],
      [
        [59, 27],
        [59, 73],
      ],
      [
        [34, 72],
        [50, 77],
        [66, 72],
      ],
    ],
    x: 48,
    y: 16,
  },
  {
    id: "cancer",
    name: "Cancer",
    dates: "Jun 21 — Jul 22",
    element: "Water",
    dailyTruth: "The tide remembers a name you are trying to forget.",
    oracleKnows: [
      "Your shell was built by someone you have already forgiven.",
      "You feel the weather of a room before you enter it.",
      "Home is not a place for you — it is a person.",
    ],
    strokes: [
      [
        [30, 40],
        [42, 34],
        [54, 40],
      ],
      [
        [68, 60],
        [56, 66],
        [44, 60],
      ],
      [[48, 46]],
      [[52, 54]],
    ],
    x: 64,
    y: 34,
  },
  {
    id: "leo",
    name: "Leo",
    dates: "Jul 23 — Aug 22",
    element: "Fire",
    dailyTruth: "The crown is not given. Tonight, you take it.",
    oracleKnows: [
      "You wear leadership like a second skin you forgot you put on.",
      "Behind the pride hides a quiet fear of being unseen.",
      "Your warmth is a weapon you rarely sheath.",
    ],
    strokes: [
      [
        [48, 66],
        [44, 73],
        [36, 73],
        [32, 66],
        [36, 59],
        [44, 59],
        [48, 66],
      ],
      [
        [44, 59],
        [48, 46],
        [58, 38],
        [70, 46],
        [66, 60],
      ],
    ],
    x: 82,
    y: 22,
  },
  {
    id: "virgo",
    name: "Virgo",
    dates: "Aug 23 — Sep 22",
    element: "Earth",
    dailyTruth: "Order is a spell. You have been casting it all along.",
    oracleKnows: [
      "You mistake your own kindness for weakness — it is the opposite.",
      "The flaw you obsess over, no one else can see.",
      "You are tidying a life that secretly longs for chaos.",
    ],
    strokes: [
      [
        [26, 42],
        [26, 70],
      ],
      [
        [26, 42],
        [35, 42],
        [35, 70],
      ],
      [
        [35, 42],
        [44, 42],
        [44, 70],
      ],
      [
        [44, 52],
        [56, 46],
        [62, 56],
        [54, 66],
        [45, 62],
      ],
    ],
    x: 18,
    y: 58,
  },
  {
    id: "libra",
    name: "Libra",
    dates: "Sep 23 — Oct 22",
    element: "Air",
    dailyTruth: "A scale tips at midnight. Choose before it chooses you.",
    oracleKnows: [
      "You keep the peace by waging quiet wars with yourself.",
      "Indecision is how you stay loyal to every version of you.",
      "The balance you seek arrives the moment you stop weighing it.",
    ],
    strokes: [
      [
        [26, 72],
        [74, 72],
      ],
      [
        [30, 62],
        [42, 62],
        [50, 52],
        [58, 62],
        [70, 62],
      ],
    ],
    x: 40,
    y: 66,
  },
  {
    id: "scorpio",
    name: "Scorpio",
    dates: "Oct 23 — Nov 21",
    element: "Water",
    dailyTruth: "What you buried is breathing again beneath the surface.",
    oracleKnows: [
      "You forgive, but the stars know you never truly forget.",
      "Your intensity frightens people who needed to be frightened.",
      "A secret you guard is guarding you in return.",
    ],
    strokes: [
      [
        [24, 44],
        [24, 70],
      ],
      [
        [24, 44],
        [33, 44],
        [33, 70],
      ],
      [
        [33, 44],
        [42, 44],
        [42, 72],
      ],
      [
        [42, 72],
        [54, 72],
        [54, 58],
      ],
      [
        [54, 58],
        [48, 63],
      ],
      [
        [54, 58],
        [60, 63],
      ],
    ],
    x: 60,
    y: 52,
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    dates: "Nov 22 — Dec 21",
    element: "Fire",
    dailyTruth: "The arrow has already left. Stop aiming. Start trusting.",
    oracleKnows: [
      "You run toward horizons to avoid the room you are standing in.",
      "Your honesty heals more than it wounds — barely.",
      "The freedom you chase is already inside the thing you fear.",
    ],
    strokes: [
      [
        [28, 72],
        [66, 34],
      ],
      [
        [66, 34],
        [50, 38],
      ],
      [
        [66, 34],
        [62, 50],
      ],
      [
        [40, 50],
        [56, 58],
      ],
    ],
    x: 80,
    y: 64,
  },
  {
    id: "capricorn",
    name: "Capricorn",
    dates: "Dec 22 — Jan 19",
    element: "Earth",
    dailyTruth: "The summit you fear is lower than the one you've climbed.",
    oracleKnows: [
      "You aged early so you could stay young later — the stars approve.",
      "Your ambition is a love letter you never learned to read aloud.",
      "The mountain was never the point. The climbing was.",
    ],
    strokes: [
      [
        [26, 40],
        [36, 58],
        [46, 42],
        [54, 58],
      ],
      [
        [54, 58],
        [66, 50],
        [70, 62],
        [60, 68],
        [54, 60],
      ],
    ],
    x: 28,
    y: 82,
  },
  {
    id: "aquarius",
    name: "Aquarius",
    dates: "Jan 20 — Feb 18",
    element: "Air",
    dailyTruth: "A future only you can see is leaking into the present.",
    oracleKnows: [
      "You belong to everyone, which is why you belong to no one yet.",
      "Your distance is not coldness — it is altitude.",
      "An idea you have not spoken aloud will outlast the ones who doubt it.",
    ],
    strokes: [
      [
        [26, 46],
        [36, 40],
        [46, 46],
        [56, 40],
        [68, 46],
      ],
      [
        [26, 60],
        [36, 54],
        [46, 60],
        [56, 54],
        [68, 60],
      ],
    ],
    x: 52,
    y: 86,
  },
  {
    id: "pisces",
    name: "Pisces",
    dates: "Feb 19 — Mar 20",
    element: "Water",
    dailyTruth: "The dream was not a dream. Look again when you wake.",
    oracleKnows: [
      "You absorb other people's storms and call them your own.",
      "The escape you crave is a door, not a wall.",
      "Two currents pull at you. The stars know which one is fate.",
    ],
    strokes: [
      [
        [36, 32],
        [28, 50],
        [36, 68],
      ],
      [
        [64, 32],
        [72, 50],
        [64, 68],
      ],
      [
        [34, 50],
        [66, 50],
      ],
    ],
    x: 74,
    y: 80,
  },
];

/** Convenience lookup by id. */
export const getSignById = (id: string | null) =>
  ZODIAC_SIGNS.find((s) => s.id === id) ?? null;

/** Canvas dimensions in pixels — intentionally larger than any viewport. */
export const CANVAS_WIDTH = 3200;
export const CANVAS_HEIGHT = 2200;

/** Rendered size of one constellation figure on the map, in px. */
export const CONSTELLATION_SIZE = 190;
