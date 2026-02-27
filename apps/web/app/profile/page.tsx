"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Clock, Settings, LogOut, Crown, Shield, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/navbar";
import { CURRENT_USER, FILMS } from "@/lib/mock-data";

const PLAN_DETAILS = {
  free: { label: "Free", icon: Zap, color: "text-zinc-400", bg: "bg-zinc-800" },
  standard: { label: "Standard", icon: Shield, color: "text-blue-400", bg: "bg-blue-950" },
  premium: { label: "Premium", icon: Crown, color: "text-amber-400", bg: "bg-amber-950" },
} as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ProfilePage() {
  const plan = PLAN_DETAILS[CURRENT_USER.subscription];
  const PlanIcon = plan.icon;

  const watchlistFilms = FILMS.filter((f) => CURRENT_USER.watchlist.includes(f.id));
  const historyFilms = CURRENT_USER.history.map((entry) => ({
    entry,
    film: FILMS.find((f) => f.id === entry.filmId),
  })).filter((h) => h.film !== undefined);

  const [name, setName] = useState(CURRENT_USER.name);
  const [email, setEmail] = useState(CURRENT_USER.email);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Profile header */}
      <div className="pt-24 pb-10 px-6 md:px-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-primary/50">
              <AvatarImage src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} />
              <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                {CURRENT_USER.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full ${plan.bg} flex items-center justify-center border-2 border-background`}>
              <PlanIcon className={`w-3.5 h-3.5 ${plan.color}`} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white">{CURRENT_USER.name}</h1>
              <Badge className={`${plan.bg} ${plan.color} border-0 text-xs font-semibold`}>
                <PlanIcon className="w-3 h-3 mr-1" />
                {plan.label}
              </Badge>
            </div>
            <p className="text-zinc-400 text-sm">{CURRENT_USER.email}</p>
            <div className="flex gap-4 mt-3 text-sm text-zinc-500">
              <span><span className="text-white font-semibold">{watchlistFilms.length}</span> saved</span>
              <span><span className="text-white font-semibold">{historyFilms.length}</span> watched</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="border-white/15 bg-white/5 hover:bg-white/10 text-white gap-1.5">
              <Settings className="w-3.5 h-3.5" />
              Edit Profile
            </Button>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white gap-1.5">
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
        <Tabs defaultValue="watchlist">
          <TabsList className="bg-zinc-900 border border-white/8 mb-8 h-10">
            <TabsTrigger value="watchlist" className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-400 text-sm">
              My List ({watchlistFilms.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-400 text-sm">
              Watch History
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-400 text-sm">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Watchlist tab */}
          <TabsContent value="watchlist">
            {watchlistFilms.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                <p className="text-lg font-medium mb-2">Your list is empty</p>
                <p className="text-sm mb-6">Add films to watch them later.</p>
                <Link href="/">
                  <Button className="bg-primary hover:bg-primary/90 text-white">Browse Films</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {watchlistFilms.map((film) => (
                  <Link key={film.id} href={`/film/${film.id}`} className="group block">
                    <div className="relative rounded-lg overflow-hidden aspect-[2/3] bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-all group-hover:scale-[1.02]">
                      <Image
                        src={film.posterUrl}
                        alt={film.title}
                        fill
                        className="object-cover group-hover:opacity-75 transition-opacity"
                        unoptimized
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/70 rounded px-1.5 py-0.5">
                        <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-white">{film.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium text-white truncate">{film.title}</p>
                    <p className="text-xs text-zinc-500">{film.year}</p>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          {/* History tab */}
          <TabsContent value="history">
            <div className="flex flex-col gap-3">
              {historyFilms.map(({ film, entry }) => (
                <Link key={entry.filmId} href={`/film/${entry.filmId}`}>
                  <Card className="bg-zinc-900/60 border-white/5 hover:border-white/15 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-4">
                      {/* Poster */}
                      <div className="relative w-14 h-20 rounded-md overflow-hidden shrink-0 border border-white/10">
                        <Image
                          src={film!.posterUrl}
                          alt={film!.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <p className="text-sm font-semibold text-white truncate">{film!.title}</p>
                            <div className="flex items-center gap-3 mt-0.5 text-xs text-zinc-500">
                              <span>{film!.year}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {Math.floor(film!.duration / 60)}h {film!.duration % 60}m
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-zinc-500">{formatDate(entry.watchedAt)}</p>
                            {entry.progress === 100 ? (
                              <Badge className="mt-1 bg-emerald-900/50 text-emerald-400 border-emerald-800 text-[10px]">
                                Completed
                              </Badge>
                            ) : (
                              <p className="text-xs text-zinc-400 mt-1">{entry.progress}% watched</p>
                            )}
                          </div>
                        </div>

                        {/* Progress bar */}
                        {entry.progress < 100 && (
                          <Progress
                            value={entry.progress}
                            className="h-1 mt-2 bg-zinc-800 [&>div]:bg-primary"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Settings tab */}
          <TabsContent value="settings">
            <div className="max-w-lg flex flex-col gap-8">
              {/* Account info */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Account Information</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 mb-1.5 block">Display Name</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-zinc-900 border-white/10 text-white focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1.5 block">Email Address</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-zinc-900 border-white/10 text-white focus-visible:ring-primary"
                    />
                  </div>
                  <Button className="self-start bg-primary hover:bg-primary/90 text-white">
                    Save Changes
                  </Button>
                </div>
              </div>

              <Separator className="bg-white/8" />

              {/* Subscription */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Subscription Plan</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-white/8">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${plan.bg} flex items-center justify-center`}>
                      <PlanIcon className={`w-5 h-5 ${plan.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{plan.label} Plan</p>
                      <p className="text-xs text-zinc-500">
                        {CURRENT_USER.subscription === "premium"
                          ? "Unlimited 4K streaming, no ads"
                          : CURRENT_USER.subscription === "standard"
                          ? "HD streaming, limited ads"
                          : "SD streaming with ads"}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/15 bg-transparent text-white hover:bg-white/10">
                    {CURRENT_USER.subscription === "premium" ? "Manage" : "Upgrade"}
                  </Button>
                </div>
              </div>

              <Separator className="bg-white/8" />

              {/* Danger zone */}
              <div>
                <h3 className="text-sm font-semibold text-red-400 mb-4">Danger Zone</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-900 bg-red-950/30 hover:bg-red-950/60 text-red-400 hover:text-red-300"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
