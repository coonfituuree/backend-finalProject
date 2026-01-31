"use client";

import { cn } from "../libs/utils";
import { MinusIcon } from "@/shared/ui/icons/MinusIcon";
import { ArrowRightIcon } from "@/shared/ui/icons/ArrowRightIcon";
import { TimeBlock } from "@/shared/ui/blocks/TimeBlock";
import { DetailsButton } from "@/shared/ui/DetailsButton";
import Economy from "./blocks/Economy";
import Business from "./blocks/Business";
import { Flight } from "@/shared/types/flight.types";

interface TicketProps {
  flight: Flight;
  className?: string;
}

function Ticket({ flight, className }: TicketProps) {
  const formatPrice = (value: unknown) => {
    const n = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(n)) return 0; 
    return n;
  };

  const transfersNum = Number(flight.numberOfTransfers ?? 0);
  const transfersText =
    Number.isFinite(transfersNum) && transfersNum === 0
      ? "direct"
      : `${Number.isFinite(transfersNum) ? transfersNum : 0} transfers`;

  const durationText = String(flight.flightDuration ?? "—");

  const operatedBy = (flight.operatedBy ?? "Unknown").trim();
  const operatedByLetter = operatedBy ? operatedBy.charAt(0).toUpperCase() : "U";

  const fromAirportAbbreviation = String(flight.fromAirportAbbreviation ?? "—");
  const toAirportAbbreviation = String(flight.toAirportAbbreviation ?? "—");

  const economPrice = formatPrice((flight as any).EconomPrice ?? (flight as any).economPrice);
  const businessPrice = formatPrice((flight as any).businessPrice);

  return (
    <div className={cn("", className)}>
      <div className="w-270.5 flex justify-between outline-1 outline-[rgb(238,238,240)] rounded-lg transition-all duration-300 hover:outline-[rgb(164,134,86)]">
        <div className="bg-white px-6 py-4">
          <div className="flex flex-col">
            <div className="flex gap-16">
              <div className="flex gap-14">
                <TimeBlock time={flight.departureTime} code={fromAirportAbbreviation} />

                <div className="flex items-center self-start gap-2 whitespace-nowrap">
                  <MinusIcon className="w-6 h-6 fill-[rgb(152,162,179)]" />
                  <div className="text-xs font-medium text-[rgb(80,98,112)]">
                    {durationText}, {transfersText}
                  </div>
                  <ArrowRightIcon className="w-6 h-6 fill-[rgb(152,162,179)]" />
                </div>
              </div>

              <div className="flex w-full items-start justify-between gap-14">
                <TimeBlock time={flight.arrivalTime} code={toAirportAbbreviation} />
                <DetailsButton flight={flight} />
              </div>
            </div>

            <div className="mt-8 flex gap-2 text-xs font-medium text-[rgb(80,98,112)] items-center">
              Operated By
              <div className="w-6 h-6 bg-[rgb(164,134,86)] rounded-full flex items-center justify-center text-white text-xs font-bold">
                {operatedByLetter}
              </div>
              <span className="text-[rgb(152,162,179)]">{operatedBy}</span>
            </div>
          </div>
        </div>

        <div className="flex">
          <Economy price={economPrice} />
          <Business price={businessPrice} />
        </div>
      </div>
    </div>
  );
}

export default Ticket;
