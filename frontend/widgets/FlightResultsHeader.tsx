"use client";

import { useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  showPoints: boolean;
  onTogglePoints: (v: boolean) => void;
};

export function FlightResultsHeader({
  title = "Выбор рейса",
  subtitle = "Цены указаны для всех пассажиров. Пожалуйста, выберите даты перелёта.",
  showPoints,
  onTogglePoints,
}: Props) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h2 className="text-3xl font-semibold text-[rgb(28,43,79)]">{title}</h2>
        <p className="mt-2 text-[rgb(80,98,112)] font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[rgb(80,98,112)] font-medium whitespace-nowrap">
          Показать стоимость в баллах
        </span>

        <button
          type="button"
          onClick={() => onTogglePoints(!showPoints)}
          className={`relative w-12 h-7 rounded-full transition ${
            showPoints ? "bg-[rgb(164,134,86)]" : "bg-gray-300"
          }`}
          aria-pressed={showPoints}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
              showPoints ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
