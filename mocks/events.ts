export type EventCategory = "hiking" | "camping";

export type Difficulty = "Easy" | "Moderate" | "Hard";

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  city: string;
  location: string;
  startsAt: string;
  maxAttendees: number;
  spotsLeft: number;
  imageUrl: string;
  // --- detail-screen fields (mock-only, swap for Supabase later) ---
  description: string;
  difficulty?: Difficulty;
  durationLabel?: string;
  distanceKm?: number;
  elevationGainM?: number;
  mealsProvided?: boolean;
  facilities?: string;
}

export const currentUser = {
  name: "Sarah",
};

function daysFromNow(n: number): string {
  return new Date(Date.now() + n * 86_400_000).toISOString();
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    title: "Cedar Ridge Sunrise Hike",
    category: "camping",
    city: "Cedar Falls",
    location: "Cedar Ridge Trail, NC",
    startsAt: daysFromNow(2),
    maxAttendees: 20,
    spotsLeft: 7,
    imageUrl:
      "https://img.magnific.com/free-vector/camping-composition-with-two-tents-fire-cool-box-with-trees-night-sky-cartoon_1284-54942.jpg",
    description:
      "Join us for a breathtaking sunrise hike along Cedar Ridge Trail. The path winds through old-growth forest before opening up to panoramic valley views at dawn. Suitable for intermediate hikers — expect some rocky sections and steady elevation gain. Hot coffee and pastries provided at the summit viewpoint.",
    difficulty: "Moderate",
    durationLabel: "4 hours",
    distanceKm: 8.5,
    elevationGainM: 620,
    mealsProvided: false,
    facilities: "Restrooms at trailhead",
  },
  {
    id: "2",
    title: "Blue Lake Campout",
    category: "camping",
    city: "Riverside",
    location: "Blue Lake Campground, CO",
    startsAt: daysFromNow(5),
    maxAttendees: 30,
    spotsLeft: 12,
    imageUrl:
      "https://img.magnific.com/free-photo/couple-tourists-enjoying-camping-by-lake_335224-1342.jpg?t=st=1784714063~exp=1784717663~hmac=66c130443219349c8e1ef73c4df15dc3eeadaafc9df42051fe973c237b545e9c&w=1060",
    description:
      "Spend two nights under the stars at pristine Blue Lake Campground. Nestled among towering pines at 9,200 ft, the crystal-clear lake is perfect for kayaking, fishing, and morning swims. We provide group dinners each evening and guided nature walks. Family-friendly with dedicated quiet zones.",
    difficulty: "Easy",
    durationLabel: "2 Days",
    distanceKm: 3,
    elevationGainM: 120,
    mealsProvided: true,
    facilities: "Fire pits, picnic tables, potable water",
  },
  {
    id: "3",
    title: "Eagle Peak Trail",
    category: "hiking",
    city: "Lakeview",
    location: "Eagle Peak, WA",
    startsAt: daysFromNow(12),
    maxAttendees: 15,
    spotsLeft: 3,
    imageUrl:
      "https://gibbonswhistler.com/wp-content/uploads/2015/09/2-High-Note-Trail-Whistler-Mountain-Canada.jpeg",
    description:
      "A challenging alpine trek to the summit of Eagle Peak at 2,400 m. The trail features exposed ridgelines, a brief scramble section, and unmatched 360° views of the Cascade Range. Not recommended for beginners — solid fitness and sure-footedness required. Packed lunch included.",
    difficulty: "Hard",
    durationLabel: "7 hours",
    distanceKm: 14,
    elevationGainM: 1180,
    mealsProvided: false,
    facilities: "None — backcountry",
  },
  {
    id: "4",
    title: "Whispering Pines Weekend",
    category: "camping",
    city: "Cedar Falls",
    location: "Whispering Pines, MT",
    startsAt: daysFromNow(25),
    maxAttendees: 25,
    spotsLeft: 18,
    imageUrl: "https://picsum.photos/seed/camp-2/400/300",
    description:
      "Unplug for a full weekend in the Whispering Pines wilderness. The campground sits on a gentle meadow surrounded by lodgepole pines with easy access to wildflower trails and a lazy river. Evenings feature campfire storytelling and stargazing sessions with a local astronomer.",
    difficulty: "Easy",
    durationLabel: "3 Days",
    distanceKm: 5,
    elevationGainM: 90,
    mealsProvided: true,
    facilities: "Showers, fire pits, bear boxes, camp store",
  },
];
