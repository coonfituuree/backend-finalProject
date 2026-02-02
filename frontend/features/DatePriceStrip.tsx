"use client";

import { useMemo, useState } from "react";

type DayPrice = {
  date: string;        
  label: string;       
  fromPrice: number;   
  isLowest?: boolean;
};

type Props = {
  items: DayPrice[];
  selectedDate?: string;
  onSelect: (date: string) => void;
  currency?: string;
};

export function DatePriceStrip({
  items,
  selectedDate,
  onSelect,
  currency = "KZT",
}: Props) {
  const [start, setStart] = useState(0);
  const visibleCount = 5;

  const slice = useMemo(() => {
    return items.slice(start, start + visibleCount);
  }, [items, start]);

  const canLeft = start > 0;
  const canRight = start + visibleCount < items.length;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={!canLeft}
          onClick={() => setStart((s) => Math.max(0, s - 1))}
          className={`h-14 w-14 rounded-xl flex items-center justify-center border transition
            ${canLeft ? "bg-white hover:border-[rgb(164,134,86)]" : "bg-gray-100 opacity-50"}
          `}
          aria-label="Previous dates"
        >
          <span className="text-2xl leading-none">‹</span>
        </button>

        <div className="flex-1 grid grid-cols-5 gap-3">
          {slice.map((d) => {
            const active = d.date === selectedDate;
            return (
              <button
                key={d.date}
                type="button"
                onClick={() => onSelect(d.date)}
                className={`
                  relative bg-white rounded-xl cursor-pointer border px-3 py-3 text-left transition
                  ${active ? "border-[rgb(164,134,86)] shadow-sm" : "border-gray-200 hover:border-[rgb(164,134,86)]"}
                `}
              >
                {d.isLowest && (
                  <span className="absolute -top-2 left-3 text-[10px] px-2 py-1 rounded-full bg-[rgb(164,134,86)] text-white">
                    Самая низкая цена
                  </span>
                )}

                <div className="text-[rgb(28,43,79)] font-semibold">{d.label}</div>
                <div className="text-sm text-[rgb(80,98,112)] font-medium">
                  от {formatNum(d.fromPrice)} {currency}
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!canRight}
          onClick={() => setStart((s) => Math.min(items.length - visibleCount, s + 1))}
          className={`h-14 w-14 rounded-xl flex items-center justify-center border transition
            ${canRight ? "bg-white hover:border-[rgb(164,134,86)]" : "bg-gray-100 opacity-50"}
          `}
          aria-label="Next dates"
        >
          <span className="text-2xl leading-none">›</span>
        </button>
      </div>
    </div>
  );
}

function formatNum(n: number) {
  return n.toLocaleString("ru-RU");
}
