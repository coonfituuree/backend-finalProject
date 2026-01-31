import { ArrowDownIcon } from "../icons/ArrowDownIcon";

interface BusinessProps {
  price: number | string | null | undefined;
}

function Business({ price }: BusinessProps) {
  const n = typeof price === "number" ? price : Number(price);

  const priceText = Number.isFinite(n) ? n.toLocaleString("ru-RU") : "—";
  const monthlyText = Number.isFinite(n)
    ? (n / 6).toLocaleString("ru-RU", { maximumFractionDigits: 0 })
    : "—";

  return (
    <div className="w-[216px] flex flex-col items-start p-4 h-[152px] rounded-sm relative bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)]">
      <div className="w-full flex flex-col gap-1">
        <div className="flex w-full">
          <div className="text-white text-xl font-bold">Бизнес</div>
          <ArrowDownIcon className="fill-white" />
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
              className="w-2 h-2 fill-[rgb(164,134,86)]">
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

export default Business;
