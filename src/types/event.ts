export type NavItem = {
  label: string;
  href: string;
};

export type EventInfo = {
  name: string;
  tagline: string;
  startAt: string;
  endAt: string;
  dateLabel: string;
  locationLabel: string;
  cityLabel: string;
  registerUrl: string;

  contactEmail: string;
};

export type Speaker = {
  id: string;
  name: string;
  org: string;
  bio: string;
  profileImage: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  description?: string;
  meta?: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

export type Sponsor = {
  name: string;
  url: string;
  tier: 'community' | 'supporting' | 'partner';
};
