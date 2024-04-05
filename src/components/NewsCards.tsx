'use client'
import { useEffect, useState } from "react";
import { HoverEffect } from "./ui/card-hover-effect";


export function NewsCards() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const news = await fetch("http://127.0.0.1:5000/news/");
      setNews(await news.json());
    }
    fetchNews();
  }, []);


  return (
    <div className="max-w-7xl mx-auto h-10 px-8">
      <HoverEffect items={news} />
    </div>
  );
}

