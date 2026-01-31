import { Sheet } from "./Sheet";
import { Flight } from "@/shared/types/flight.types";

interface Props {
  open: boolean;
  onClose: () => void;
  flight: Flight;
}

export function FlightDetailsSheet({ open, onClose, flight }: Props) {
  return (
    <Sheet open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold text-[rgb(28,43,79)] mb-6">
        Flight details
      </h2>

      <div className="space-y-6 text-sm">

        <Info label="Total flight duration" value={flight.flightDuration} />
        <Info label="Number of transfers" value={flight.numberOfTransfers} />

        <div>
          <div className="font-medium">{flight.departureDate}</div>    
          <div className="text-lg font-semibold">{flight.departureTime}</div>
          <div className="text-gray-500">
            {flight.fromAirport} ({flight.fromAirportAbbreviation})
          </div>
        </div>

        <div>
          <div className="font-medium">{flight.arrivalDate}</div>
          <div className="text-lg font-semibold">{flight.arrivalTime}</div>
          <div className="text-gray-500">
            {flight.toAirport} ({flight.toAirportAbbreviation})
          </div>
          <div className="text-gray-500">Terminal 2</div>
        </div>

        <Info label="Duration" value={flight.flightDuration} />
        <Info label="Operated by" value={flight.operatedBy} />
        <Info label="Flight number" value={flight.flightNumber} />
        <Info label="Aircraft" value={flight.airplaneType} />

      </div>
    </Sheet>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
