"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Info, Plus, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Film } from "@/lib/types";

interface HeroBannerProps {
  film: Film;
}

export function HeroBanner({ film }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[88vh] min-h-140 max-h-215 overflow-hidden">
      {/* Backdrop image */}
      <Image
        src={film.backdropUrl}
        alt={film.title}
        fill
        className="object-cover object-center"
        priority
        unoptimized
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 md:px-10">
        <div className="max-w-2xl">
          {/* Featured label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Featured Film</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight drop-shadow-2xl">
            {film.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-sm font-bold">{film.rating.toFixed(1)}</span>
            </div>
            <span className="text-zinc-300 text-sm">{film.year}</span>
            <div className="flex items-center gap-1 text-zinc-300 text-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>{Math.floor(film.duration / 60)}h {film.duration % 60}m</span>
            </div>
            <div className="flex gap-1.5">
              {film.genres.map((g) => (
                <Badge key={g} variant="outline" className="border-white/30 text-white/80 text-xs px-2">
                  {g}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 max-w-xl line-clamp-3">
            {film.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/film/${film.id}`}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold gap-2 px-8 shadow-lg shadow-primary/30"
              >
                <Play className="w-5 h-5 fill-white" />
                Play Now
              </Button>
            </Link>

            <Link href={`/film/${film.id}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold gap-2 backdrop-blur-sm"
              >
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </Link>

            <Button
              size="icon"
              variant="outline"
              className="w-11 h-11 border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Director */}
          <p className="mt-5 text-xs text-zinc-500">
            Directed by <span className="text-zinc-300 font-medium">{film.director}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
