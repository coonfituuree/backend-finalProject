"use client";
import SearchSection from "@/features/Search/Search";
import { useState } from "react";
import { flightApi } from "@/shared/api/flight.api";
import { Flight } from "@/shared/types/flight.types";
import Container from "@/shared/ui/Container";
import { FlightResults } from "@/features/FlightResults/FlightResults";
import Welcome from "@/widgets/Welcome";

export default function Home() {
  const [searchOptions, setSearchOptions] = useState<{
    departureDate?: string;
  }>({});

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (from: string, to: string, options?: any) => {
    setLoading(true);
    setError("");
    try {
      setSearchOptions({ departureDate: options?.departureDate });

      const result = await flightApi.searchFlights({ from, to });
      if (result.data) setFlights(result.data);
      else setFlights([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка поиска полетов");
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="">
      <SearchSection onSearch={handleSearch} />

      <Container>
        <div className="flex flex-col items-center justify-center py-12">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#242424]"></div>
              <p className="mt-4 text-gray-600">Загрузка полетов...</p>
            </div>
          )}

          {!loading && flights.length > 0 && (
            <FlightResults flights={flights} initialDate={searchOptions.departureDate}/>
          )}

          {!loading && flights.length === 0 && <Welcome />}
        </div>
      </Container>
    </main>
  );
}
