"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/shared/ui/Container";
import { bookingApi } from "@/shared/api/booking.api";
import { flightApi } from "@/shared/api/flight.api";
import { Flight } from "@/shared/types/flight.types";
import { Passenger } from "@/shared/types/booking.types";

import { toast } from "react-toastify";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const flightId = searchParams.get("flightId");
  const urlCabinClass = searchParams.get("cabinClass") as
    | "economy"
    | "business"
    | null;

  const [flight, setFlight] = useState<Flight | null>(null);
  const [loadingFlight, setLoadingFlight] = useState(true);

  const [cabinClass, setCabinClass] = useState<"economy" | "business">(
    urlCabinClass || "economy",
  );

  const [passengers, setPassengers] = useState<Passenger[]>([
    { firstName: "", lastName: "", gender: "male" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!flightId) {
      router.push("/");
      return;
    }

    loadFlightData();
  }, [flightId]);

  const loadFlightData = async () => {
    try {
      setLoadingFlight(true);
      const result = await flightApi.getAllFlights();

      if (result.data) {
        const foundFlight = result.data.find((f) => f._id === flightId);
        if (foundFlight) {
          setFlight(foundFlight);
        } else {
          setError("Рейс не найден");
        }
      }
    } catch (err) {
      setError("Ошибка загрузки данных рейса");
    } finally {
      setLoadingFlight(false);
    }
  };

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
    setLoading(true);

    try {
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

      toast.success("Бронирование успешно создано!", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });

      setSuccess({message: "Бронирование успешно создано"});
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

  if (loadingFlight) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-semibold">
            Загрузка данных рейса...
          </p>
        </div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md">
          <p className="text-red-600 text-lg mb-4">
            {error || "Рейс не найден"}
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold">
            Вернуться к поиску
          </button>
        </div>
      </div>
    );
  }

  const pricePerPassenger =
    cabinClass === "business" ? flight.businessPrice : flight.economyPrice;
  const totalPrice = pricePerPassenger * passengers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Flight Info Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Выбранный рейс</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-blue-100 text-sm">Вылет</p>
                <p className="text-2xl font-bold">{flight.departureTime}</p>
                <p className="text-sm">{flight.fromAirport}</p>
                <p className="text-xs text-blue-100">{flight.departureDate}</p>
              </div>

              <div className="text-center">
                <p className="text-blue-100 text-sm">Рейс</p>
                <p className="text-xl font-bold">{flight.flightNumber}</p>
                <p className="text-sm">{flight.operatedBy}</p>
                <p className="text-xs text-blue-100">{flight.flightDuration}</p>
              </div>

              <div className="text-right">
                <p className="text-blue-100 text-sm">Прибытие</p>
                <p className="text-2xl font-bold">{flight.arrivalTime}</p>
                <p className="text-sm">{flight.toAirport}</p>
                <p className="text-xs text-blue-100">{flight.arrivalDate}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Оформление бронирования
            </h1>
            <p className="text-gray-600 mb-8">
              Заполните данные пассажиров и подтвердите класс обслуживания
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                {success.message}
              </div>
            )}

            <form onSubmit={handleBooking} className="space-y-8">
              {/* Cabin Class Selection */}
              <div>
                <label className="block text-gray-700 font-bold mb-4 text-lg">
                  Класс обслуживания
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCabinClass("economy")}
                    className={`p-6 border-2 rounded-xl text-left transition transform hover:scale-[1.02] ${
                      cabinClass === "economy"
                        ? "border-blue-600 bg-blue-50 shadow-lg"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}>
                    <p className="font-bold text-gray-800 text-xl mb-2">
                      Эконом
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Стандартное место, ручная кладь
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {flight.economyPrice.toLocaleString()} ₸
                    </p>
                    <p className="text-xs text-gray-500 mt-1">за пассажира</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCabinClass("business")}
                    className={`p-6 border-2 rounded-xl text-left transition transform hover:scale-[1.02] ${
                      cabinClass === "business"
                        ? "border-blue-600 bg-blue-50 shadow-lg"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}>
                    <p className="font-bold text-gray-800 text-xl mb-2">
                      Бизнес
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Премиум место, повышенный комфорт
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {flight.businessPrice.toLocaleString()} ₸
                    </p>
                    <p className="text-xs text-gray-500 mt-1">за пассажира</p>
                  </button>
                </div>
              </div>

              {/* Passengers */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-gray-700 font-bold text-lg">
                    Пассажиры ({passengers.length})
                  </label>
                  <button
                    type="button"
                    onClick={addPassenger}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-bold transition">
                    + Добавить пассажира
                  </button>
                </div>

                <div className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800 text-lg">
                          Пассажир {index + 1}
                        </h3>
                        {passengers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePassenger(index)}
                            className="text-red-600 hover:text-red-800 font-bold transition">
                            ✕ Удалить
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Имя *
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Фамилия *
                          </label>
                          <input
                            type="text"
                            value={passenger.lastName}
                            onChange={(e) =>
                              updatePassenger(index, "lastName", e.target.value)
                            }
                            placeholder="Иванов"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Пол *
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="male">Мужской</option>
                            <option value="female">Женский</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Итоговая стоимость
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Класс:</span>
                    <span className="font-bold">
                      {cabinClass === "economy" ? "Эконом" : "Бизнес"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Цена за пассажира:</span>
                    <span className="font-bold">
                      {pricePerPassenger.toLocaleString()} ₸
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      Количество пассажиров:
                    </span>
                    <span className="font-bold">{passengers.length}</span>
                  </div>

                  <div className="h-px bg-gray-300 my-3"></div>

                  <div className="flex justify-between items-center text-2xl font-bold text-blue-600">
                    <span>Итого к оплате:</span>
                    <span>{totalPrice.toLocaleString()} ₸</span>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Обработка..." : "Перейти к оплате →"}
                </button>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-gray-600 text-white font-bold py-4 rounded-lg hover:bg-gray-700 transition shadow-lg">
                  ← Назад к рейсам
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
