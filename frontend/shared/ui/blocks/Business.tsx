import { ArrowDownIcon } from "../icons/ArrowDownIcon";

interface EconomyProps {
  price: string;
}

function Business() {
  return (
    <div className="w-54 flex flex-col items-start p-4 h-38 rounded-sm relative bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] ">
      <div className="w-full flex flex-col gap-1">
        <div className="flex w-full">
          <div className="text-white text-xl font-bold">Economy</div>
          <ArrowDownIcon className="fill-white"/>
        </div>

        <div className="flex flex-col p-0 gap-2 items-start">
          <div className="flex flex-col items-start gap-1">
            <div className="font-medium text-sm text-white">from</div>
            <div className="font-bold text-[17px] text-white">
              80,008KZT
            </div>
          </div>

          <div className="flex items-center gap-1">
            <svg
              viewBox="0 0 8 8"
              aria-hidden="true"
              className="w-2 h-2 fill-[rgb(164,134,86)]">
              <path d="M6.367 3.134a1 1 0 0 1 0 1.732L1.633 7.6a1 1 0 0 1-1.5-.866V1.267a1 1 0 0 1 1.5-.866l4.734 2.733z" />
            </svg>
            <div className="text-sm text-white font-bold">
              6 401 KZT <span className="font-medium">x 6 месяцев</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Business;
