"use client";

import { useEffect, useMemo, useState } from "react";
import { FlightResultsHeader } from "../../widgets/FlightResultsHeader";
import { DatePriceStrip } from "../DatePriceStrip";
import { ResultsToolbar } from "../ResultsToolbar";
import Ticket from "@/shared/ui/Ticket";
import { Flight } from "@/shared/types/flight.types";
import { init } from "next/dist/compiled/webpack/webpack";

type Props = {
  flights: Flight[];
  initialDate?: string;
};

export function FlightResults({ flights, initialDate }: Props) {
  const [showPoints, setShowPoints] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    initialDate,
  );
  const [sort, setSort] = useState<"recommended" | "cheap" | "fast">(
    "recommended",
  );

  // 1) строим полоску дат из данных (берём departureDate, либо вытащи из departureTime)
  const dateItems = useMemo(() => {
    const map = new Map<string, number>();

    for (const f of flights) {
      const d =
        (f as any).departureDate || extractDate((f as any).departureTime);
      if (!d) continue;

      const price = (f as any).EconomPrice ?? (f as any).economyPrice ?? 0;
      if (!map.has(d)) map.set(d, price);
      else map.set(d, Math.min(map.get(d)!, price));
    }

    const arr = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, fromPrice]) => ({
        date,
        label: formatRuDateLabel(date),
        fromPrice,
        isLowest: false,
      }));

    let min = Infinity;
    for (const x of arr) min = Math.min(min, x.fromPrice);
    for (const x of arr) if (x.fromPrice === min) x.isLowest = true;

    return arr;
  }, [flights]);

  useEffect(() => {
    if (initialDate) setSelectedDate(initialDate);
  }, [initialDate]);

  // автоселект первой даты
  const activeDate = selectedDate ?? dateItems[0]?.date;

  // 2) фильтр по выбранной дате
  const filtered = useMemo(() => {
    let list = flights;

    if (activeDate) {
      list = list.filter((f) => {
        const d =
          (f as any).departureDate || extractDate((f as any).departureTime);
        return d === activeDate;
      });
    }

    // 3) сортировка (примерно)
    if (sort === "cheap") {
      list = [...list].sort(
        (a: any, b: any) =>
          (a.EconomPrice ?? a.economyPrice) - (b.EconomPrice ?? b.economyPrice),
      );
    } else if (sort === "fast") {
      list = [...list].sort(
        (a: any, b: any) =>
          minutes(a.flightDuration) - minutes(b.flightDuration),
      );
    }

    return list;
  }, [flights, activeDate, sort]);

  return (
    <div className="mt-10">
      <FlightResultsHeader
        showPoints={showPoints}
        onTogglePoints={setShowPoints}
      />

      {dateItems.length > 0 && (
        <DatePriceStrip
          items={dateItems}
          selectedDate={activeDate}
          onSelect={setSelectedDate}
          currency={showPoints ? "PTS" : "KZT"}
        />
      )}

      <ResultsToolbar
        sort={sort}
        onSortChange={setSort}
        onOpenFilters={() => alert("filters modal later")}
      />

      <div className="mt-6 flex flex-col gap-4">
        {filtered.map((flight) => (
          <Ticket key={flight._id} flight={flight} className="w-full" />
        ))}
      </div>
    </div>
  );
}

function extractDate(value?: string) {
  if (!value) return "";
  const s = String(value);
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "";
}

function formatRuDateLabel(yyyy_mm_dd: string) {
  const d = new Date(yyyy_mm_dd + "T00:00:00");
  const day = d.toLocaleDateString("ru-RU", { day: "2-digit" });
  const month = d
    .toLocaleDateString("ru-RU", { month: "short" })
    .replace(".", "");
  const weekday = d
    .toLocaleDateString("ru-RU", { weekday: "short" })
    .replace(".", "");
  return `${day} ${month}., ${weekday}`;
}

function minutes(text?: string) {
  const s = String(text ?? "");
  const h = Number(s.match(/(\d+)\s*ч/)?.[1] ?? 0);
  const m = Number(s.match(/(\d+)\s*м/)?.[1] ?? 0);
  return h * 60 + m;
}
