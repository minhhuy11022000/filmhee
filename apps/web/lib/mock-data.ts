import type { Film, User } from "./types";

export const FILMS: Film[] = [
  {
    id: "1",
    title: "Eternal Shadows",
    year: 2024,
    genres: ["Drama", "Thriller"],
    rating: 8.4,
    duration: 132,
    posterUrl: "https://picsum.photos/seed/film-1/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-1/1920/1080",
    description:
      "A renowned photographer uncovers a conspiracy that stretches across generations when she discovers a series of photographs hidden in her late father's darkroom — each one depicting a crime that has yet to happen.",
    director: "Sofia Marchetti",
    featured: true,
    cast: [
      { id: "a1", name: "Elara Voss", character: "Mara Cole", avatarUrl: "https://picsum.photos/seed/actor-1/80/80" },
      { id: "a2", name: "James Holloway", character: "Detective Reeves", avatarUrl: "https://picsum.photos/seed/actor-2/80/80" },
      { id: "a3", name: "Nadia Okonkwo", character: "Dr. Sylvia Park", avatarUrl: "https://picsum.photos/seed/actor-3/80/80" },
      { id: "a4", name: "Théo Dubois", character: "Vincent Cole", avatarUrl: "https://picsum.photos/seed/actor-4/80/80" },
    ],
  },
  {
    id: "2",
    title: "Neon Requiem",
    year: 2024,
    genres: ["Thriller", "Sci-Fi"],
    rating: 7.9,
    duration: 118,
    posterUrl: "https://picsum.photos/seed/film-2/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-2/1920/1080",
    description:
      "In a rain-soaked cyberpunk city, a memory broker discovers her latest client's mind holds the key to a corporate cover-up that could bring down the most powerful corporation on Earth.",
    director: "Kai Tanaka",
    cast: [
      { id: "a5", name: "Sasha Merrifield", character: "Lyra", avatarUrl: "https://picsum.photos/seed/actor-5/80/80" },
      { id: "a6", name: "Omar Rashidi", character: "Cipher", avatarUrl: "https://picsum.photos/seed/actor-6/80/80" },
      { id: "a7", name: "Yuna Choi", character: "Director Shan", avatarUrl: "https://picsum.photos/seed/actor-7/80/80" },
    ],
  },
  {
    id: "3",
    title: "The Last Horizon",
    year: 2023,
    genres: ["Sci-Fi", "Action"],
    rating: 8.1,
    duration: 148,
    posterUrl: "https://picsum.photos/seed/film-3/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-3/1920/1080",
    description:
      "When Earth's last colony ship loses contact with its destination, a crew of scientists and soldiers must choose between turning back or pushing into the unknown darkness of deep space.",
    director: "Marcus Webb",
    cast: [
      { id: "a8", name: "Reuben Cross", character: "Commander Hayes", avatarUrl: "https://picsum.photos/seed/actor-8/80/80" },
      { id: "a9", name: "Lila Storm", character: "Dr. Anara Patel", avatarUrl: "https://picsum.photos/seed/actor-9/80/80" },
      { id: "a10", name: "Finn O'Callaghan", character: "Sergeant Bauer", avatarUrl: "https://picsum.photos/seed/actor-10/80/80" },
    ],
  },
  {
    id: "4",
    title: "Crimson Tide Rising",
    year: 2024,
    genres: ["Action", "Thriller"],
    rating: 7.5,
    duration: 109,
    posterUrl: "https://picsum.photos/seed/film-4/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-4/1920/1080",
    description:
      "A retired black-ops agent is drawn back into the world of shadows when her daughter is taken hostage by a rogue faction within her former agency.",
    director: "Carla Denison",
    cast: [
      { id: "a11", name: "Maya Rivers", character: "Agent Kira", avatarUrl: "https://picsum.photos/seed/actor-11/80/80" },
      { id: "a12", name: "Diego Santos", character: "Colonel Vance", avatarUrl: "https://picsum.photos/seed/actor-12/80/80" },
    ],
  },
  {
    id: "5",
    title: "Whispering Pines",
    year: 2023,
    genres: ["Horror"],
    rating: 7.7,
    duration: 98,
    posterUrl: "https://picsum.photos/seed/film-5/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-5/1920/1080",
    description:
      "A family retreats to a remote mountain cabin for the holidays, only to discover that the dense pine forest surrounding them is home to something that has been waiting for decades.",
    director: "Isla Hargreaves",
    cast: [
      { id: "a13", name: "Thomas Reed", character: "David Monroe", avatarUrl: "https://picsum.photos/seed/actor-13/80/80" },
      { id: "a14", name: "Claire Fontaine", character: "Helen Monroe", avatarUrl: "https://picsum.photos/seed/actor-14/80/80" },
    ],
  },
  {
    id: "6",
    title: "A Thousand Stars",
    year: 2024,
    genres: ["Romance", "Drama"],
    rating: 7.3,
    duration: 114,
    posterUrl: "https://picsum.photos/seed/film-6/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-6/1920/1080",
    description:
      "Two strangers who have exchanged letters for ten years finally agree to meet — only to discover they are each other's greatest rivals in a prestigious architecture competition.",
    director: "Amara Osei",
    cast: [
      { id: "a15", name: "Lucía Vargas", character: "Elena", avatarUrl: "https://picsum.photos/seed/actor-15/80/80" },
      { id: "a16", name: "Noah Blackwood", character: "James", avatarUrl: "https://picsum.photos/seed/actor-16/80/80" },
    ],
  },
  {
    id: "7",
    title: "Iron Fortress",
    year: 2023,
    genres: ["Action", "Fantasy"],
    rating: 6.8,
    duration: 127,
    posterUrl: "https://picsum.photos/seed/film-7/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-7/1920/1080",
    description:
      "In a kingdom where magic has been outlawed, a disgraced knight must forge an unlikely alliance with a rebel sorcerer to prevent an ancient evil from consuming the realm.",
    director: "Ben Carver",
    cast: [
      { id: "a17", name: "Rylan Grey", character: "Sir Aldric", avatarUrl: "https://picsum.photos/seed/actor-17/80/80" },
      { id: "a18", name: "Zara Okonkwo", character: "Sorceress Nia", avatarUrl: "https://picsum.photos/seed/actor-18/80/80" },
    ],
  },
  {
    id: "8",
    title: "The Forgotten Garden",
    year: 2022,
    genres: ["Drama"],
    rating: 8.2,
    duration: 141,
    posterUrl: "https://picsum.photos/seed/film-8/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-8/1920/1080",
    description:
      "After inheriting a dilapidated English estate, a woman unravels the mystery of a long-forgotten garden and the tragic love story buried within its overgrown hedgerows.",
    director: "Helena Price",
    cast: [
      { id: "a19", name: "Eliza Ashworth", character: "Caroline", avatarUrl: "https://picsum.photos/seed/actor-19/80/80" },
      { id: "a20", name: "Samuel Holt", character: "Edmund", avatarUrl: "https://picsum.photos/seed/actor-20/80/80" },
    ],
  },
  {
    id: "9",
    title: "Quantum Break",
    year: 2024,
    genres: ["Sci-Fi", "Action"],
    rating: 7.6,
    duration: 122,
    posterUrl: "https://picsum.photos/seed/film-9/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-9/1920/1080",
    description:
      "A quantum physicist accidentally shatters the timeline and must race against collapsing realities to restore the fabric of the universe before it unravels completely.",
    director: "Priya Mehta",
    cast: [
      { id: "a21", name: "Atlas Monroe", character: "Dr. Reed", avatarUrl: "https://picsum.photos/seed/actor-21/80/80" },
      { id: "a22", name: "Mira Solano", character: "Agent Lena", avatarUrl: "https://picsum.photos/seed/actor-22/80/80" },
    ],
  },
  {
    id: "10",
    title: "Midnight Express",
    year: 2023,
    genres: ["Thriller", "Drama"],
    rating: 8.0,
    duration: 107,
    posterUrl: "https://picsum.photos/seed/film-10/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-10/1920/1080",
    description:
      "On a cross-country train, a forensic accountant discovers that one of the passengers is carrying evidence that could bring down a powerful cartel — and she has twelve hours to decide what to do with it.",
    director: "Andrei Popescu",
    cast: [
      { id: "a23", name: "Vera Hollis", character: "Claire Chen", avatarUrl: "https://picsum.photos/seed/actor-23/80/80" },
      { id: "a24", name: "Matteo Conti", character: "Marco", avatarUrl: "https://picsum.photos/seed/actor-24/80/80" },
    ],
  },
  {
    id: "11",
    title: "Ember Falls",
    year: 2024,
    genres: ["Drama", "Romance"],
    rating: 7.1,
    duration: 103,
    posterUrl: "https://picsum.photos/seed/film-11/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-11/1920/1080",
    description:
      "In a small town still healing from a wildfire, two survivors find unexpected connection as they rebuild their lives from the ashes of everything they lost.",
    director: "Rosalie Nguyen",
    cast: [
      { id: "a25", name: "Felix Grant", character: "Noah", avatarUrl: "https://picsum.photos/seed/actor-25/80/80" },
      { id: "a26", name: "Ana Pereira", character: "Sable", avatarUrl: "https://picsum.photos/seed/actor-26/80/80" },
    ],
  },
  {
    id: "12",
    title: "The Silent Code",
    year: 2022,
    genres: ["Thriller", "Sci-Fi"],
    rating: 7.8,
    duration: 116,
    posterUrl: "https://picsum.photos/seed/film-12/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-12/1920/1080",
    description:
      "A deaf cryptographer discovers a hidden message embedded in a global streaming algorithm that, when decoded, reveals the identities of every intelligence operative on Earth.",
    director: "Lin Fang",
    cast: [
      { id: "a27", name: "Sam Willis", character: "Alex Torres", avatarUrl: "https://picsum.photos/seed/actor-27/80/80" },
      { id: "a28", name: "Petra Vali", character: "Director Marsh", avatarUrl: "https://picsum.photos/seed/actor-28/80/80" },
    ],
  },
  {
    id: "13",
    title: "Stardust Chronicles",
    year: 2023,
    genres: ["Sci-Fi", "Fantasy"],
    rating: 7.4,
    duration: 135,
    posterUrl: "https://picsum.photos/seed/film-13/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-13/1920/1080",
    description:
      "An interstellar cartographer mapping the edges of the galaxy encounters an ancient alien civilisation whose extinction holds a terrifying warning for humanity.",
    director: "Jonas Steele",
    cast: [
      { id: "a29", name: "Aria Lennox", character: "Cass Veil", avatarUrl: "https://picsum.photos/seed/actor-29/80/80" },
      { id: "a30", name: "Rex Stone", character: "Captain Orion", avatarUrl: "https://picsum.photos/seed/actor-30/80/80" },
    ],
  },
  {
    id: "14",
    title: "Bloodmoon",
    year: 2024,
    genres: ["Horror", "Thriller"],
    rating: 6.9,
    duration: 95,
    posterUrl: "https://picsum.photos/seed/film-14/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-14/1920/1080",
    description:
      "During a rare lunar eclipse, a sleepy coastal town is cut off from the mainland and begins to experience a series of terrifying events that seem to follow an ancient lunar cycle.",
    director: "Damien Cross",
    cast: [
      { id: "a31", name: "Nia Adeyemi", character: "Rue", avatarUrl: "https://picsum.photos/seed/actor-31/80/80" },
      { id: "a32", name: "Cole Whitman", character: "Sheriff Banks", avatarUrl: "https://picsum.photos/seed/actor-32/80/80" },
    ],
  },
  {
    id: "15",
    title: "Glass Memories",
    year: 2022,
    genres: ["Drama", "Romance"],
    rating: 8.3,
    duration: 120,
    posterUrl: "https://picsum.photos/seed/film-15/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-15/1920/1080",
    description:
      "A neurologist specialising in memory loss falls for a patient who is slowly losing her recollection of their relationship — and must decide how far she'll go to preserve their love.",
    director: "Isabelle Laurent",
    cast: [
      { id: "a33", name: "Henri Clément", character: "Dr. Mathieu", avatarUrl: "https://picsum.photos/seed/actor-33/80/80" },
      { id: "a34", name: "Sophia Ellis", character: "Rose", avatarUrl: "https://picsum.photos/seed/actor-34/80/80" },
    ],
  },
  {
    id: "16",
    title: "Apex Protocol",
    year: 2024,
    genres: ["Action", "Sci-Fi"],
    rating: 7.2,
    duration: 112,
    posterUrl: "https://picsum.photos/seed/film-16/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-16/1920/1080",
    description:
      "Elite soldiers equipped with experimental neural implants are deployed on a covert mission, only to discover their own command has weaponised their minds against them.",
    director: "Ryan Blake",
    cast: [
      { id: "a35", name: "Zane Archer", character: "Sergeant Cruz", avatarUrl: "https://picsum.photos/seed/actor-35/80/80" },
      { id: "a36", name: "Talia Moon", character: "Dr. Holt", avatarUrl: "https://picsum.photos/seed/actor-36/80/80" },
    ],
  },
  {
    id: "17",
    title: "Dark Frequencies",
    year: 2023,
    genres: ["Thriller", "Horror"],
    rating: 7.6,
    duration: 101,
    posterUrl: "https://picsum.photos/seed/film-17/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-17/1920/1080",
    description:
      "A radio astronomer begins receiving signals she believes are extraterrestrial — until the transmissions start referencing events from her own past that no one else could know.",
    director: "Vanya Korova",
    cast: [
      { id: "a37", name: "Iris Chen", character: "Dr. Hara Nakashima", avatarUrl: "https://picsum.photos/seed/actor-37/80/80" },
      { id: "a38", name: "Lars Erikson", character: "Professor Aldis", avatarUrl: "https://picsum.photos/seed/actor-38/80/80" },
    ],
  },
  {
    id: "18",
    title: "Project Nebula",
    year: 2022,
    genres: ["Sci-Fi", "Documentary"],
    rating: 8.5,
    duration: 90,
    posterUrl: "https://picsum.photos/seed/film-18/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-18/1920/1080",
    description:
      "An immersive documentary following the scientists behind humanity's most ambitious deep-space telescope, capturing five years of breakthroughs, heartbreaks, and wonder.",
    director: "Nour Al-Rashid",
    cast: [
      { id: "a39", name: "Dr. Elena Markov", character: "Herself", avatarUrl: "https://picsum.photos/seed/actor-39/80/80" },
      { id: "a40", name: "Dr. James Oduya", character: "Himself", avatarUrl: "https://picsum.photos/seed/actor-40/80/80" },
    ],
  },
  {
    id: "19",
    title: "The Wanderer",
    year: 2024,
    genres: ["Drama"],
    rating: 8.7,
    duration: 155,
    posterUrl: "https://picsum.photos/seed/film-19/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-19/1920/1080",
    description:
      "A former concert pianist, now homeless after a decade of addiction, embarks on a cross-country journey on foot — and the people he meets along the way slowly restore his faith in humanity.",
    director: "Emeka Eze",
    cast: [
      { id: "a41", name: "Gabriel Rivera", character: "Leo", avatarUrl: "https://picsum.photos/seed/actor-41/80/80" },
      { id: "a42", name: "Ruth Abara", character: "Sister Grace", avatarUrl: "https://picsum.photos/seed/actor-42/80/80" },
    ],
  },
  {
    id: "20",
    title: "Velvet Underground",
    year: 2023,
    genres: ["Drama", "Thriller"],
    rating: 7.8,
    duration: 119,
    posterUrl: "https://picsum.photos/seed/film-20/300/450",
    backdropUrl: "https://picsum.photos/seed/backdrop-20/1920/1080",
    description:
      "An undercover journalist infiltrates the city's most exclusive underground art scene, only to find herself morally compromised when she uncovers the dark funding behind its most celebrated works.",
    director: "Céline Morin",
    cast: [
      { id: "a43", name: "Jade Laurent", character: "Petra", avatarUrl: "https://picsum.photos/seed/actor-43/80/80" },
      { id: "a44", name: "Max Dupont", character: "Lucian Voss", avatarUrl: "https://picsum.photos/seed/actor-44/80/80" },
    ],
  },
];

export const CURRENT_USER: User = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  avatarUrl: "https://picsum.photos/seed/user-1/80/80",
  subscription: "premium",
  watchlist: ["2", "5", "9", "15", "18"],
  history: [
    { filmId: "1", watchedAt: "2024-12-20T18:30:00Z", progress: 100 },
    { filmId: "3", watchedAt: "2024-12-18T21:00:00Z", progress: 72 },
    { filmId: "8", watchedAt: "2024-12-15T19:45:00Z", progress: 100 },
    { filmId: "10", watchedAt: "2024-12-12T20:15:00Z", progress: 45 },
    { filmId: "19", watchedAt: "2024-12-10T17:00:00Z", progress: 100 },
    { filmId: "6", watchedAt: "2024-12-08T21:30:00Z", progress: 88 },
  ],
};

export const TRENDING = FILMS.slice(0, 8);
export const NEW_RELEASES = FILMS.filter((f) => f.year === 2024);
export const TOP_RATED = [...FILMS].sort((a, b) => b.rating - a.rating).slice(0, 8);
export const FEATURED_FILM = FILMS.find((f) => f.featured) ?? FILMS[0]!;

export const GENRES = [
  { name: "Action", icon: "💥", color: "from-orange-600 to-red-700" },
  { name: "Drama", icon: "🎭", color: "from-indigo-600 to-purple-700" },
  { name: "Sci-Fi", icon: "🚀", color: "from-cyan-600 to-blue-700" },
  { name: "Thriller", icon: "🔪", color: "from-zinc-600 to-zinc-800" },
  { name: "Horror", icon: "👻", color: "from-rose-700 to-red-900" },
  { name: "Romance", icon: "💗", color: "from-pink-600 to-rose-700" },
  { name: "Documentary", icon: "🎥", color: "from-emerald-600 to-teal-700" },
  { name: "Fantasy", icon: "✨", color: "from-violet-600 to-purple-800" },
] as const;
