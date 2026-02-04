export function Business({ price }: { price: number }) {
  const priceText = Number.isFinite(price) ? price.toLocaleString("ru-RU") : "—";
  const monthlyText = Number.isFinite(price)
    ? (price / 6).toLocaleString("ru-RU", { maximumFractionDigits: 0 })
    : "—";

  return (
    <div className="w-[216px] flex flex-col items-start p-4 h-[152px] rounded-sm relative bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)]">
      <div className="w-full flex flex-col gap-1">
        <div className="flex w-full">
          <div className="text-white text-xl font-bold">Бизнес</div>
          <svg
            className="w-4 h-4 fill-white ml-auto"
            viewBox="0 0 24 24"
          >
            <path d="M4.463 8.476a.75.75 0 0 1 1.061-.013l5.606 5.477a1.236 1.236 0 0 0 1.74 0l.006-.007 5.6-5.47a.75.75 0 0 1 1.048 1.074l-5.597 5.467a2.736 2.736 0 0 1-3.854 0L4.476 9.537a.75.75 0 0 1-.013-1.061z" />
          </svg>
        </div>

        <div className="flex flex-col p-0 gap-2 items-start">
          <div className="flex flex-col items-start gap-1">
            <div className="font-medium text-sm text-white">от</div>
            <div className="font-bold text-[17px] text-white">
              {priceText} KZT
            </div>
          </div>

          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 8 8"
              aria-hidden="true"
              className="w-2 h-2 fill-[rgb(164,134,86)]"
            >
              <path d="M6.367 3.134a1 1 0 0 1 0 1.732L1.633 7.6a1 1 0 0 1-1.5-.866V1.267a1 1 0 0 1 1.5-.866l4.734 2.733z" />
            </svg>

            <div className="text-sm text-white font-bold whitespace-nowrap">
              {monthlyText} KZT <span className="font-medium">x 6 месяцев</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
