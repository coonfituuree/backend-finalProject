import { ArrowDownIcon } from "../icons/ArrowDownIcon";

interface EconomyProps {
  price: number | string | null | undefined;
}

function Economy({ price }: EconomyProps) {
  const n = typeof price === "number" ? price : Number(price);

  const priceText = Number.isFinite(n) ? n.toLocaleString("ru-RU") : "—";
  const monthlyText = Number.isFinite(n)
    ? (n / 6).toLocaleString("ru-RU", { maximumFractionDigits: 0 })
    : "—";

  return (
    <div className="w-[216px] flex flex-col items-start p-4 h-[152px] rounded-sm relative bg-[rgb(244,245,247)]">
      <div className="w-full flex flex-col gap-1">
        <div className="flex w-full">
          <div className="text-[rgb(28,43,79)] text-xl font-bold">Economy</div>
          <ArrowDownIcon />
        </div>

        <div className="flex flex-col p-0 gap-2 items-start">
          <div className="absolute left-0 top-0 w-0 h-0 border-t-[16px] border-t-[rgb(164,134,86)] border-r-[16px] border-r-transparent" />
          <div className="flex flex-col items-start gap-1">
            <div className="font-medium text-sm text-[rgb(28,43,79)]">from</div>
            <div className="font-bold text-[17px] text-[rgb(28,43,79)]">
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

            <div className="text-sm font-bold">
              {monthlyText} KZT <span className="font-medium">x 6 месяцев</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Economy;
