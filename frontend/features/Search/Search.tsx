"use client";

import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Container from "@/shared/ui/Container";
import { Search } from "lucide-react";

interface SearchSectionProps {
  onSearch?: (from: string, to: string) => void;
}

function SearchSection({ onSearch }: SearchSectionProps) {
  const [time, setTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleString("ru-RU"));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = () => {
    if (from && to && onSearch) {
      onSearch(from, to);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black/30 pb-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        src="../video.mp4"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <Container>
        <Header />

        <div className="w-full flex flex-col gap-8 py-8">
          <div className="text-white text-4xl font-medium">
            Добрый вечер, куда мы летим сегодня?
          </div>

          <div className="flex flex-wrap gap-2 w-full">
            <div className="flex flex-1 gap-2">
              <div className="flex-1 bg-white px-3 py-4 rounded-l-2xl">
                <label className="block text-sm font-medium text-gray-400">
                  Откуда:
                </label>
                <input
                  className="w-full outline-none text-base py-2"
                  placeholder="Страна, город или аэропорт"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="flex-1 bg-white px-3 py-4 rounded-r-2xl">
                <label className="block text-sm text-gray-400">Куда:</label>
                <input
                  className="w-full outline-none text-base py-2"
                  placeholder="Страна, город или аэропорт"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-20 bg-[#242424] rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:opacity-80">
              <Search color="white" />
            </button>
          </div>

          <div className="flex justify-end text-white font-medium">
            Билеты действительны до {time}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SearchSection;
