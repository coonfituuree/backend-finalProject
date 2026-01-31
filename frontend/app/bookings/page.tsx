"use client";
import { useEffect, useState } from "react";
import { bookingApi } from "@/shared/api/booking.api";
import { Booking } from "@/shared/types/booking.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const result = await bookingApi.getMyBookings();
      if (result.bookings) {
        setBookings(result.bookings);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки бронирований",
      );
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Вы уверены, что хотите отменить бронирование?")) return;

    setCancelingId(bookingId);
    try {
      await bookingApi.cancelBooking(bookingId);
      setBookings(
        bookings.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка отмены бронирования",
      );
    } finally {
      setCancelingId(null);
    }
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (time: string) => {
    return new Date(time).toLocaleDateString("ru-RU");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Подтверждено";
      case "pending":
        return "Ожидание";
      case "cancelled":
        return "Отменено";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Мои бронирования</h1>
            <p className="text-blue-100">
              Всего бронирований: {bookings.length}
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-600 text-lg mb-4">
                  У вас нет бронирований
                </p>
                <Link
                  href="/"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Найти рейсы
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="border-l-4 border-blue-600 bg-gray-50 p-6 rounded-lg hover:shadow-lg transition">
                    {/* Header Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-4 border-b">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          PNR номер
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {booking.pnr}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Статус
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                            booking.status,
                          )}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Класс салона
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {booking.cabinClass === "economy"
                            ? "Эконом"
                            : "Бизнес"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Дата бронирования
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {formatDate(booking.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Flight Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
                      {/* From */}
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-600 font-semibold mb-2">
                          Вылет
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {formatTime(booking.flight.departureTime)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.flight.from}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.flight.fromAirport}
                        </p>
                      </div>

                      {/* Flight details */}
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-sm text-gray-600 font-semibold mb-4">
                          Рейс
                        </p>
                        <p className="text-lg font-bold text-blue-600 mb-2">
                          {booking.flight.flightNumber}
                        </p>
                        <div className="w-full h-px bg-gray-300"></div>
                        <p className="text-xs text-gray-500 mt-2">
                          {booking.flight.flightDuration}
                        </p>
                      </div>

                      {/* To */}
                      <div className="flex flex-col text-right">
                        <p className="text-sm text-gray-600 font-semibold mb-2">
                          Прибытие
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {formatTime(booking.flight.arrivalTime)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.flight.to}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.flight.toAirport}
                        </p>
                      </div>
                    </div>

                    {/* Passengers and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold mb-2">
                          Пассажиры ({booking.passengers.length})
                        </p>
                        <ul className="space-y-1">
                          {booking.passengers.map((p, idx) => (
                            <li key={idx} className="text-sm text-gray-700">
                              {p.firstName} {p.lastName}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Цена за пассажира
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {booking.pricePerPassenger.toLocaleString()} ₽
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">
                          Общая сумма
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {booking.totalPrice.toLocaleString()} ₽
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      {booking.status === "pending" && (
                        <>
                          <Link
                            href={`/payment?bookingId=${booking._id}`}
                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition text-center">
                            Оплатить
                          </Link>
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            disabled={cancelingId === booking._id}
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-50">
                            {cancelingId === booking._id
                              ? "Отмена..."
                              : "Отменить"}
                          </button>
                        </>
                      )}

                      {booking.status === "confirmed" && (
                        <>
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            disabled={cancelingId === booking._id}
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-50">
                            {cancelingId === booking._id
                              ? "Отмена..."
                              : "Отменить бронирование"}
                          </button>
                        </>
                      )}

                      {booking.status === "cancelled" && (
                        <p className="flex-1 text-center text-gray-600 font-semibold">
                          Бронирование отменено
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
