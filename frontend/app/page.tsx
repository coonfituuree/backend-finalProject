"use client";
import SearchSection from "@/features/Search/Search";
import { useState } from "react";
import { flightApi } from "@/shared/api/flight.api";
import { Flight } from "@/shared/types/flight.types";
import Ticket from "@/shared/ui/Ticket";
import Container from "@/shared/ui/Container";

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSearch = async (from: string, to: string) => {
    setLoading(true);
    setError("");
    try {
      const result = await flightApi.searchFlights({ from, to });
      if (result.data) {
        setFlights(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка поиска полетов");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-blue-50 to-white">
      <SearchSection onSearch={handleSearch} />

      <Container className="">
        <div className="flex items-center justify-center py-12">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Загрузка полетов...</p>
            </div>
          )}

          {!loading && flights.length > 0 && (
            <div className="flex flex-col gap-4">
              {flights.map((flight) => (
                <Ticket key={flight._id} flight={flight} className="w-full" />
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
