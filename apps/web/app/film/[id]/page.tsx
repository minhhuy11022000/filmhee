import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Play,
  Plus,
  Share2,
  Star,
  Clock,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { FilmRow } from "@/components/film-row";
import { FILMS, CURRENT_USER } from "@/lib/mock-data";

interface FilmDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FilmDetailPage({ params }: FilmDetailPageProps) {
  const { id } = await params;
  const film = FILMS.find((f) => f.id === id);

  if (!film) notFound();

  const isInWatchlist = CURRENT_USER.watchlist.includes(film.id);
  const related = FILMS.filter(
    (f) => f.id !== film.id && f.genres.some((g) => film.genres.includes(g))
  ).slice(0, 8);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative w-full h-[70vh] min-h-120 max-h-200 overflow-hidden">
        {/* Backdrop */}
        <Image
          src={film.backdropUrl}
          alt={film.title}
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-black/30" />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-20 left-6 md:left-10 flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10 flex gap-8 items-end">
          {/* Poster thumbnail */}
          <div className="hidden md:block relative w-40 h-60 rounded-xl overflow-hidden border border-white/10 shadow-2xl shrink-0">
            <Image
              src={film.posterUrl}
              alt={film.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Film info */}
          <div className="flex-1 pb-2">
            <div className="flex gap-1.5 mb-3">
              {film.genres.map((g) => (
                <Badge
                  key={g}
                  variant="outline"
                  className="border-white/30 text-white/70 text-xs"
                >
                  {g}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {film.title}
            </h1>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 mb-5 text-sm text-zinc-400">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{film.rating.toFixed(1)}</span>
                <span className="text-zinc-500 font-normal">/10</span>
              </div>
              <span>{film.year}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {Math.floor(film.duration / 60)}h {film.duration % 60}m
                </span>
              </div>
              <span className="text-zinc-600">·</span>
              <span>
                Directed by{" "}
                <span className="text-zinc-200 font-medium">
                  {film.director}
                </span>
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold gap-2 px-8 shadow-lg shadow-primary/20"
              >
                <Play className="w-5 h-5 fill-white" />
                Play Now
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/8 hover:bg-white/15 text-white gap-2 backdrop-blur-sm"
              >
                {isInWatchlist ? (
                  <>
                    <Check className="w-4 h-4 text-primary" />
                    In My List
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add to List
                  </>
                )}
              </Button>

              <Button
                size="icon"
                variant="outline"
                className="w-11 h-11 border-white/25 bg-white/8 hover:bg-white/15 text-white"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="px-6 md:px-10 py-10 max-w-5xl">
        {/* Synopsis */}
        <div className="mb-10">
          <h2 className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-3">
            Synopsis
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed">
            {film.description}
          </p>
        </div>

        <Separator className="bg-white/8 mb-10" />

        {/* Cast */}
        <div>
          <h2 className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-5">
            Cast
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {film.cast.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border border-white/10 shrink-0">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback className="bg-zinc-800 text-xs text-zinc-300">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {member.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related films */}
      {related.length > 0 && (
        <div className="pb-16">
          <FilmRow title="More Like This" films={related} />
        </div>
      )}
    </main>
  );
}
