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
  rating: number;
  duration: number;
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
  watchedAt: string;
  progress: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  subscription: SubscriptionTier;
  watchlist: string[];
  history: WatchHistoryEntry[];
}
