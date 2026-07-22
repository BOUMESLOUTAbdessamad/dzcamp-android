export type EventCategory = "hiking" | "camping";

export type Difficulty = "Easy" | "Moderate" | "Hard";

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
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

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Cedar Ridge Sunrise Hike",
    category: "camping",
    location: "Cedar Ridge Trail, NC",
    startsAt: "2026-08-05T06:30:00Z",
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
    location: "Blue Lake Campground, CO",
    startsAt: "2026-08-12T14:00:00Z",
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
    location: "Eagle Peak, WA",
    startsAt: "2026-08-18T07:00:00Z",
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
    location: "Whispering Pines, MT",
    startsAt: "2026-08-25T12:00:00Z",
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
