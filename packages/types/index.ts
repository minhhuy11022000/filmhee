export type Genre =
  | "Action"
  | "Comedy"
  | "Drama"
  | "Horror"
  | "Romance"
  | "Sci-Fi"
  | "Thriller"
  | "Documentary"
  | "Animation"
  | "Fantasy";

export type SubscriptionTier = "free" | "standard" | "premium";

export interface CastMember {
  id: string;
  name: string;
  character: string;
  avatarUrl: string;
}

export interface Film {
  id: string;
  title: string;
  year: number;
  genres: Genre[];
  rating: number; // 0–10
  duration: number; // minutes
  posterUrl: string;
  backdropUrl: string;
  description: string;
  director: string;
  cast: CastMember[];
  trailerUrl?: string;
  featured?: boolean;
}

export interface WatchHistoryEntry {
  filmId: string;
  watchedAt: string; // ISO date string
  progress: number; // 0–100 percentage
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  subscription: SubscriptionTier;
  watchlist: string[]; // Film IDs
  history: WatchHistoryEntry[];
}
