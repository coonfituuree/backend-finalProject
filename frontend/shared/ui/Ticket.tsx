import { cn } from "../libs/utils";
import Image from "next/image";

import { MinusIcon } from "@/shared/ui/icons/MinusIcon";
import { ArrowRightIcon } from "@/shared/ui/icons/ArrowRightIcon";
import { TimeBlock } from "@/shared/ui/blocks/TimeBlock";
import { DetailsButton } from "@/shared/ui/DetailsButton";
import Economy from "./blocks/Economy";


interface TicketProps {
  className?: string;
}

interface ticketsType {
  id: number;
  from: string;
  to: string;
  price: string;
  departureTime: string;
  arrivalTime: string;
}
function Ticket({ className }: TicketProps) {
  return (
    <div className={cn("", className)}>
      <div className="w-270.5 flex outline-1 outline-[rgb(238,238,240)] rounded-lg transition-all duration-300 hover:outline-[rgb(164,134,86)]">
        <div className="h-38 bg-white px-6 py-4">
          <div className="flex flex-col">
            <div className="flex gap-20">
              <div className="flex gap-20">
                <TimeBlock time="08:30" code="NQZ" />

                <div className="flex items-center self-start gap-2">
                  <MinusIcon className="w-6 h-6 fill-[rgb(152,162,179)]" />
                  <div className="text-xs font-medium text-[rgb(80,98,112)]">
                    2h, direct
                  </div>
                  <ArrowRightIcon className="w-6 h-6 fill-[rgb(152,162,179)]" />
                </div>
              </div>

              <div className="flex gap-20">
                <TimeBlock time="10:30" code="AKX" />
                <DetailsButton />
              </div>
            </div>

            <div className="mt-8 flex gap-2 text-xs font-medium text-[rgb(80,98,112)] items-center">
              Operated By
              <Image src="/logos/AirAstana.svg" alt="" width={24} height={24} />
              <span className="text-[rgb(152,162,179)]"> Air Astana</span>
            </div>
          </div>
        </div>

        <Economy />
      </div>
    </div>
  );
}

export default Ticket;
