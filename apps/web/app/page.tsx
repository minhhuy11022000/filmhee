import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { HeroBanner } from "@/components/hero-banner";
import { FilmRow } from "@/components/film-row";
import { FEATURED_FILM, TRENDING, NEW_RELEASES, TOP_RATED, GENRES } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <HeroBanner film={FEATURED_FILM} />

      {/* Film rows */}
      <div className="flex flex-col gap-10 py-10">
        <FilmRow title="Trending Now" films={TRENDING} seeAllHref="/browse" />
        <FilmRow title="New Releases" films={NEW_RELEASES} seeAllHref="/browse" />
        <FilmRow title="Top Rated" films={TOP_RATED} seeAllHref="/browse" />
      </div>

      {/* Genre grid */}
      <section className="px-6 md:px-10 pb-16">
        <h2 className="text-lg md:text-xl font-semibold text-white mb-6">Browse by Genre</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {GENRES.map((genre) => (
            <Link
              key={genre.name}
              href={`/browse?genre=${genre.name}`}
              className={`relative overflow-hidden rounded-xl bg-linear-to-br ${genre.color} p-5 cursor-pointer group transition-transform hover:scale-[1.02]`}
            >
              <span className="text-3xl mb-2 block">{genre.icon}</span>
              <p className="text-white font-bold text-base">{genre.name}</p>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 md:px-10 py-8 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Filmhee. All rights reserved.
      </footer>
    </main>
  );
}
