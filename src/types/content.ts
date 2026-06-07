// Shared shapes for the JSON content under /content and generated data files.

export type Note = {
  slug: string;
  title: string;
  summary?: string;
  date: string;
  html: string;
};

export type Review = {
  id: number;
  title: string;
  artist: string;
  type: string;
  rating: number;
  reviewDate: string;
  review: string;
};

export type Park = {
  id: string | number;
  name: string;
  team: string;
  city: string;
  date?: string;
  photos?: string[];
};
