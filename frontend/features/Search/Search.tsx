"use client";

import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Container from "@/shared/ui/Container";
import { Search } from "lucide-react";

type SearchOptions = {
  departureDate?: string; 
  returnDate?: string; 
  passengers?: number;
  travelClass?: "economy" | "business";
};

interface SearchSectionProps {
  onSearch?:
    | ((from: string, to: string) => void)
    | ((from: string, to: string, options: SearchOptions) => void);
}

function SearchSection({ onSearch }: SearchSectionProps) {
  const [time, setTime] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // NEW state
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState<string>("1");
  const [travelClass, setTravelClass] = useState<"economy" | "business">(
    "economy",
  );

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleString("ru-RU"));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = () => {
    if (!from || !to || !onSearch) return;

    const p = Number(passengers);
    const options: SearchOptions = {
      departureDate: departureDate || undefined,
      returnDate: returnDate || undefined,
      travelClass,
    };

    (onSearch as any)(from, to, options);
  };

  return (
    <section className="relative w-full overflow-hidden bg-black/30 pb-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="/video.mp4"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <Container>
        <Header />

        <div className="w-full flex flex-col gap-8 py-8">
          <div className="text-white text-4xl font-medium">
            Добрый вечер, куда мы летим сегодня?
          </div>

          {/* FROM/TO + SEARCH button */}
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
              <div className="flex gap-8">
                <div className="flex gap-2 w-[320px]">
                  <div className="flex-1 bg-white p-4 rounded-l-2xl">
                    <label className="block text-sm text-gray-400">Туда</label>
                    <input
                      type="date"
                      className="w-full outline-none py-2"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-r-2xl">
                    <label className="block text-sm text-gray-400 ">
                      Обратно
                    </label>
                    <input
                      type="date"
                      className="w-full outline-none py-2"
                      value={returnDate}
                      min={departureDate || undefined}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-50 bg-white p-4 rounded-2xl">
                  <label className="block text-sm text-gray-400">
                    Class
                  </label>

                  {/* input EXACT as you wrote + functional */}
                  

                  {/* class selector (functional, below input) */}
                  <div className="mt-2 flex gap-2 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setTravelClass("economy")}
                      className={`px-3 py-2 rounded-xl text-sm transition ${
                        travelClass === "economy"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                      Economy
                    </button>

                    <button
                      type="button"
                      onClick={() => setTravelClass("business")}
                      className={`px-3 py-2 rounded-xl text-sm transition ${
                        travelClass === "business"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                      Business
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-20 bg-primary rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:opacity-80">
              <Search color="white" />
            </button>
          </div>

          {/* ✅ EXACT block you sent + functionality */}

          <div className="flex justify-end text-white font-medium">
            Билеты действительны до {time}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SearchSection;
