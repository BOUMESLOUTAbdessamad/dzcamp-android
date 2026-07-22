export type EventCategory = 'hiking' | 'camping';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  location: string;
  startsAt: string;
  maxAttendees: number;
  spotsLeft: number;
  imageUrl: string;
}

export const currentUser = {
  name: 'Sarah',
};

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Cedar Ridge Sunrise Hike',
    category: 'hiking',
    location: 'Cedar Ridge Trail, NC',
    startsAt: '2026-08-05T06:30:00Z',
    maxAttendees: 20,
    spotsLeft: 7,
    imageUrl: 'https://picsum.photos/seed/trail-1/400/300',
  },
  {
    id: '2',
    title: 'Blue Lake Campout',
    category: 'camping',
    location: 'Blue Lake Campground, CO',
    startsAt: '2026-08-12T14:00:00Z',
    maxAttendees: 30,
    spotsLeft: 12,
    imageUrl: 'https://picsum.photos/seed/camp-1/400/300',
  },
  {
    id: '3',
    title: 'Eagle Peak Trail',
    category: 'hiking',
    location: 'Eagle Peak, WA',
    startsAt: '2026-08-18T07:00:00Z',
    maxAttendees: 15,
    spotsLeft: 3,
    imageUrl: 'https://picsum.photos/seed/trail-2/400/300',
  },
  {
    id: '4',
    title: 'Whispering Pines Weekend',
    category: 'camping',
    location: 'Whispering Pines, MT',
    startsAt: '2026-08-25T12:00:00Z',
    maxAttendees: 25,
    spotsLeft: 18,
    imageUrl: 'https://picsum.photos/seed/camp-2/400/300',
  },
];
