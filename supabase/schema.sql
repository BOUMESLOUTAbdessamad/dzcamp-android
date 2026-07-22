-- ============================================================
-- DZCamp — Supabase schema + seed data
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. ENUMS
-- ============================================================

CREATE TYPE event_category AS ENUM ('hiking', 'camping');
CREATE TYPE difficulty_level AS ENUM ('Easy', 'Moderate', 'Hard');

-- 2. TABLES
-- ============================================================

CREATE TABLE events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT        NOT NULL,
  category      event_category NOT NULL,
  location      TEXT        NOT NULL,
  starts_at     TIMESTAMPTZ NOT NULL,
  max_attendees INTEGER     NOT NULL CHECK (max_attendees > 0),
  spots_left    INTEGER     NOT NULL CHECK (spots_left >= 0),
  image_url     TEXT        NOT NULL,
  description   TEXT        NOT NULL,

  -- hiking-specific (nullable)
  difficulty        difficulty_level,
  duration_label    TEXT,
  distance_km       NUMERIC(5,1),
  elevation_gain_m  INTEGER,

  -- camping-specific (nullable)
  meals_provided    BOOLEAN DEFAULT FALSE,
  facilities        TEXT,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fast lookups for the Home list and detail screen
CREATE INDEX idx_events_category ON events (category);
CREATE INDEX idx_events_starts_at ON events (starts_at);

-- 3. ROW-LEVEL SECURITY (open read for now, tighten later)
-- ============================================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  USING (true);

-- 4. SEED DATA
-- ============================================================

INSERT INTO events (
  id, title, category, location, starts_at,
  max_attendees, spots_left, image_url, description,
  difficulty, duration_label, distance_km, elevation_gain_m,
  meals_provided, facilities
) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Cedar Ridge Sunrise Hike',
  'camping',
  'Cedar Ridge Trail, NC',
  '2026-08-05T06:30:00+00:00',
  20, 7,
  'https://img.magnific.com/free-vector/camping-composition-with-two-tents-fire-cool-box-with-trees-night-sky-cartoon_1284-54942.jpg',
  'Join us for a breathtaking sunrise hike along Cedar Ridge Trail. The path winds through old-growth forest before opening up to panoramic valley views at dawn. Suitable for intermediate hikers — expect some rocky sections and steady elevation gain. Hot coffee and pastries provided at the summit viewpoint.',
  'Moderate', '4 hours', 8.5, 620,
  false, 'Restrooms at trailhead'
),
(
  '22222222-2222-2222-2222-222222222222',
  'Blue Lake Campout',
  'camping',
  'Blue Lake Campground, CO',
  '2026-08-12T14:00:00+00:00',
  30, 12,
  'https://img.magnific.com/free-photo/couple-tourists-enjoying-camping-by-lake_335224-1342.jpg?t=st=1784714063~exp=1784717663~hmac=66c130443219349c8e1ef73c4df15dc3eeadaafc9df42051fe973c237b545e9c&w=1060',
  'Spend two nights under the stars at pristine Blue Lake Campground. Nestled among towering pines at 9,200 ft, the crystal-clear lake is perfect for kayaking, fishing, and morning swims. We provide group dinners each evening and guided nature walks. Family-friendly with dedicated quiet zones.',
  'Easy', '2 Days', 3.0, 120,
  true, 'Fire pits, picnic tables, potable water'
),
(
  '33333333-3333-3333-3333-333333333333',
  'Eagle Peak Trail',
  'hiking',
  'Eagle Peak, WA',
  '2026-08-18T07:00:00+00:00',
  15, 3,
  'https://gibbonswhistler.com/wp-content/uploads/2015/09/2-High-Note-Trail-Whistler-Mountain-Canada.jpeg',
  'A challenging alpine trek to the summit of Eagle Peak at 2,400 m. The trail features exposed ridgelines, a brief scramble section, and unmatched 360° views of the Cascade Range. Not recommended for beginners — solid fitness and sure-footedness required. Packed lunch included.',
  'Hard', '7 hours', 14.0, 1180,
  false, 'None — backcountry'
),
(
  '44444444-4444-4444-4444-444444444444',
  'Whispering Pines Weekend',
  'camping',
  'Whispering Pines, MT',
  '2026-08-25T12:00:00+00:00',
  25, 18,
  'https://picsum.photos/seed/camp-2/400/300',
  'Unplug for a full weekend in the Whispering Pines wilderness. The campground sits on a gentle meadow surrounded by lodgepole pines with easy access to wildflower trails and a lazy river. Evenings feature campfire storytelling and stargazing sessions with a local astronomer.',
  'Easy', '3 Days', 5.0, 90,
  true, 'Showers, fire pits, bear boxes, camp store'
);
