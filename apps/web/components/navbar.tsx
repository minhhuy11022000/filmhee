"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Bell, ChevronDown, X, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CURRENT_USER } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/browse" },
  { label: "My List", href: "/profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10 bg-linear-to-b from-black/90 to-transparent backdrop-blur-sm border-b border-white/5">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-8 shrink-0">
        <Clapperboard className="w-6 h-6 text-primary" />
        <span className="text-xl font-bold tracking-tight text-white">
          film<span className="text-primary">hee</span>
        </span>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1 mr-auto">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md transition-colors",
              pathname === link.href
                ? "text-white font-medium"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Search */}
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-zinc-900/90 border border-white/10 rounded-lg px-3 py-1">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <Input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search films..."
              className="border-0 bg-transparent h-7 w-48 text-sm focus-visible:ring-0 p-0 placeholder:text-zinc-500"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
              <X className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
            </button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white hover:bg-white/10"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </Button>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>

        {/* User menu */}
        <Link href="/profile">
          <div className="flex items-center gap-2 cursor-pointer group ml-1">
            <Avatar className="w-8 h-8 border border-white/20">
              <AvatarImage src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} />
              <AvatarFallback className="bg-primary text-white text-xs">
                {CURRENT_USER.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors hidden md:block" />
          </div>
        </Link>
      </div>
    </header>
  );
}
