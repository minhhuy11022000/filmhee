"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilmCard } from "@/components/film-card";
import type { Film } from "@/lib/types";

interface FilmRowProps {
  title: string;
  films: Film[];
  seeAllHref?: string;
}

export function FilmRow({ title, films, seeAllHref }: FilmRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 600;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative group/row">
      {/* Row header */}
      <div className="flex items-center justify-between mb-4 px-6 md:px-10">
        <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
        {seeAllHref && (
          <a
            href={seeAllHref}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            See all
          </a>
        )}
      </div>

      {/* Scroll area */}
      <div className="relative">
        {/* Left arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-linear-to-r from-background to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-linear-to-r hover:from-background hover:to-transparent"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </Button>

        {/* Film cards */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-6 md:px-10 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>

        {/* Right arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-linear-to-l from-background to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-linear-to-l hover:from-background hover:to-transparent"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </Button>
      </div>
    </section>
  );
}
