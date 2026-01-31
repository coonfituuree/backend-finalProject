"use client";

type Props = {
  sort: "recommended" | "cheap" | "fast";
  onSortChange: (v: Props["sort"]) => void;
  onOpenFilters: () => void;
};

export function ResultsToolbar({ sort, onSortChange, onOpenFilters }: Props) {
  return (
    <div className="mt-8 bg-white rounded-2xl border border-gray-200 px-4 py-3 flex items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-[rgb(80,98,112)] font-semibold">
          СОРТИРОВАТЬ РЕЙСЫ:
        </span>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="text-sm font-semibold text-[rgb(164,134,86)] outline-none"
        >
          <option value="recommended">РЕКОМЕНДОВАННЫЙ</option>
          <option value="cheap">САМЫЙ ДЕШЕВЫЙ</option>
          <option value="fast">САМЫЙ БЫСТРЫЙ</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onOpenFilters}
        className="text-sm font-semibold text-[rgb(80,98,112)] hover:text-[rgb(164,134,86)] transition"
      >
        ФИЛЬТР
      </button>

      <div className="ml-auto text-sm text-[rgb(80,98,112)] font-semibold">
        СРОК КРЕДИТОВАНИЯ: <span className="text-[rgb(164,134,86)]">6 МЕСЯЦЕВ</span>
      </div>
    </div>
  );
}
