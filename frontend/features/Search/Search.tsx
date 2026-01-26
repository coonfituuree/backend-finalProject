"use client";

import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Container from "@/shared/ui/Container";
import { Search } from "lucide-react";

function SearchSection() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleString("ru-RU"));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black/30 pb-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/video.mp4"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <Container>
        <Header />

        <div className="w-full flex flex-col gap-8 py-8">
          <div className="text-white text-4xl font-medium">
            Good evening, where are we flying today?
          </div>

          <div className="flex flex-wrap gap-2 w-full">
            <div className="flex flex-1 gap-2">
              <div className="flex-1 bg-white px-3 py-4 rounded-l-2xl">
                <label className="block text-sm font-medium text-gray-400">
                  From:
                </label>
                <input
                  className="w-full outline-none text-base py-2"
                  placeholder="Страна, город или аэропорт"
                />
              </div>
              <div className="flex-1 bg-white px-3 py-4 rounded-r-2xl">
                <label className="block text-sm text-gray-400">To:</label>
                <input
                  className="w-full outline-none text-base py-2"
                  placeholder="Страна, город или аэропорт"
                />
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex gap-2 w-[320px]">
                <div className="flex-1 bg-white p-4 rounded-l-2xl">
                  <label className="block text-sm text-gray-400">Туда</label>
                  <input type="date" className="w-full outline-none py-2" />
                </div>
                <div className="flex-1 bg-white p-4 rounded-r-2xl">
                  <label className="block text-sm text-gray-400 ">
                    Обратно
                  </label>
                  <input type="date" className="w-full outline-none py-2" />
                </div>
              </div>

              <div className="w-50 bg-white p-4 rounded-2xl">
                <label className="block text-sm text-gray-400">
                  Пассажиры и класс
                </label>
                <input
                  className="w-full outline-none py-2"
                  placeholder="Количество пассажиров"
                />
              </div>
            </div>

            <button className="w-20 bg-[#242424] rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:opacity-80">
              <Search color="white" />
            </button>
          </div>

          <div className="flex justify-end text-white font-medium">
            Tickets are valid for {time}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SearchSection;
