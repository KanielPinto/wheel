'use client'
import { useEffect, useState } from "react";
import { HoverEffect } from "./ui/card-hover-effect";

export function NewsCards() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("http://127.0.0.1:5000/news/");
        const data = await response.json();
        setNews(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto h-10 px-8">
        {/* Three larger card-like boxes with three lines of loading state bars each */}
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10 gap-8">
          <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20">
            <div className="p-4">
              <div className="w-full h-4 rounded-lg bg-zinc-100 animate-pulse mt-5"></div>
              <div className="w-24 h-4 rounded-lg bg-gray-300 animate-pulse mt-5 mb-3"></div>
              <div className="w-20 h-4 rounded-lg bg-zinc-300 animate-pulse mt-8"></div>
            </div>
          </div>
          <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20">
            <div className="p-4">
              <div className="w-full h-4 rounded-lg bg-zinc-100 animate-pulse mt-5"></div>
              <div className="w-24 h-4 rounded-lg bg-gray-300 animate-pulse mt-5 mb-3"></div>
              <div className="w-20 h-4 rounded-lg bg-zinc-300 animate-pulse mt-8"></div>
            </div>
          </div>
          <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20">
            <div className="p-4">
              <div className="w-full h-4 rounded-lg bg-zinc-100 animate-pulse mt-5"></div>
              <div className="w-24 h-4 rounded-lg bg-gray-300 animate-pulse mt-5 mb-3"></div>
              <div className="w-20 h-4 rounded-lg bg-zinc-300 animate-pulse mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-10 px-8">
      <HoverEffect items={news} />
    </div>
  );
}
