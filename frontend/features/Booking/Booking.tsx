"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/shared/ui/Container";
import { bookingApi } from "@/shared/api/booking.api";
import { flightApi } from "@/shared/api/flight.api";
import { Flight } from "@/shared/types/flight.types";
import { Passenger } from "@/shared/types/booking.types";

function Booking() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const flightId = searchParams.get("flightId");

  const [flight, setFlight] = useState<Flight | null>(null);
  const [cabinClass, setCabinClass] = useState<"economy" | "business">(
    "economy",
  );
  const [passengers, setPassengers] = useState<Passenger[]>([
    { firstName: "", lastName: "", gender: "male" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Get flight details from search params or navigate back
    if (!flightId) {
      router.push("/");
      return;
    }

    // In a real app, you'd fetch the flight details from API
    // For now, we'll just set a placeholder
  }, [flightId]);

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { firstName: "", lastName: "", gender: "male" },
    ]);
  };

  const removePassenger = (index: number) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const updatePassenger = (
    index: number,
    field: keyof Passenger,
    value: string,
  ) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value as any };
    setPassengers(updated);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate passengers
      const isValid = passengers.every((p) => p.firstName && p.lastName);
      if (!isValid) {
        setError("Пожалуйста, заполните данные всех пассажиров");
        setLoading(false);
        return;
      }

      const result = await bookingApi.createBooking({
        flightId: flightId || "",
        cabinClass,
        passengers,
      });

      setSuccess("Бронирование создано! Перенаправление на оплату...");
      setTimeout(() => {
        if (result.booking) {
          router.push(`/payment?bookingId=${result.booking._id}`);
        }
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка создания бронирования",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Новое бронирование
            </h1>
            <p className="text-gray-600 mb-8">
              Заполните данные пассажиров и выберите класс салона
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleBooking} className="space-y-8">
              {/* Cabin Class Selection */}
              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  Выберите класс салона
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={() => setCabinClass("economy")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      cabinClass === "economy"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 bg-gray-50"
                    }`}>
                    <p className="font-bold text-gray-800">Эконом</p>
                    <p className="text-sm text-gray-600">Стандартное место</p>
                  </div>

                  <div
                    onClick={() => setCabinClass("business")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      cabinClass === "business"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 bg-gray-50"
                    }`}>
                    <p className="font-bold text-gray-800">Бизнес</p>
                    <p className="text-sm text-gray-600">Премиум место</p>
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-gray-700 font-bold">
                    Пассажиры ({passengers.length})
                  </label>
                  <button
                    type="button"
                    onClick={addPassenger}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    + Добавить пассажира
                  </button>
                </div>

                <div className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">
                          Пассажир {index + 1}
                        </h3>
                        {passengers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePassenger(index)}
                            className="text-red-600 hover:text-red-800 font-bold">
                            ✕ Удалить
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Имя
                          </label>
                          <input
                            type="text"
                            value={passenger.firstName}
                            onChange={(e) =>
                              updatePassenger(
                                index,
                                "firstName",
                                e.target.value,
                              )
                            }
                            placeholder="Иван"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Фамилия
                          </label>
                          <input
                            type="text"
                            value={passenger.lastName}
                            onChange={(e) =>
                              updatePassenger(index, "lastName", e.target.value)
                            }
                            placeholder="Иванов"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Пол
                          </label>
                          <select
                            value={passenger.gender}
                            onChange={(e) =>
                              updatePassenger(
                                index,
                                "gender",
                                e.target.value as "male" | "female",
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="male">Мужской</option>
                            <option value="female">Женский</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                  {loading ? "Бронирование..." : "Подтвердить и оплатить"}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition">
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Booking;
