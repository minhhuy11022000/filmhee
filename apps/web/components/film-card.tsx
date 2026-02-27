"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Film } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilmCardProps {
  film: Film;
  className?: string;
}

export function FilmCard({ film, className }: FilmCardProps) {
  return (
    <Link href={`/film/${film.id}`} className={cn("group block shrink-0", className)}>
      <div className="relative w-[160px] md:w-[185px] rounded-lg overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-black/60">
        {/* Poster */}
        <div className="relative aspect-[2/3]">
          <Image
            src={film.posterUrl}
            alt={film.title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-70"
            sizes="(max-width: 768px) 160px, 185px"
            unoptimized
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3">
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-xs gap-1.5"
              onClick={(e) => { e.preventDefault(); }}
            >
              <Play className="w-3 h-3 fill-white" />
              Play
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full border-white/30 bg-white/10 hover:bg-white/20 text-white text-xs gap-1.5"
              onClick={(e) => { e.preventDefault(); }}
            >
              <Plus className="w-3 h-3" />
              My List
            </Button>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-white">{film.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Info below poster */}
        <div className="p-2.5">
          <p className="text-sm font-medium text-white truncate leading-tight">{film.title}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-zinc-400">{film.year}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400">{Math.floor(film.duration / 60)}h {film.duration % 60}m</span>
          </div>
          {film.genres[0] && (
            <Badge variant="secondary" className="mt-1.5 text-[10px] px-1.5 py-0 h-4 bg-zinc-800 text-zinc-300 border-zinc-700">
              {film.genres[0]}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
