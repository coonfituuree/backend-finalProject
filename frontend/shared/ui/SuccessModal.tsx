"use client";

import { X, CheckCircle, Mail, Plane, Calendar, Users } from "lucide-react";
import { Booking } from "@/shared/types/booking.types";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onViewBookings: () => void;
}

export function SuccessModal({
  isOpen,
  onClose,
  booking,
  onViewBookings,
}: SuccessModalProps) {
  if (!isOpen) return null;

  const formatTime = (time: string) => {
    if (!time) return "—";
    return time.slice(0, 5);
  };

  const formatDate = (date: string) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header with success icon */}
        <div className="relative bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2">
              Оплата прошла успешно!
            </h2>
            <p className="text-green-100 text-lg">
              Ваш билет успешно забронирован
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-8">
          {/* Email notification banner */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                📧 Билет отправлен на вашу почту
              </p>
              <p className="text-xs text-blue-700">
                Электронный билет отправлен на адрес:{" "}
                <span className="font-bold">{booking.email}</span>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Проверьте папку "Входящие" или "Спам"
              </p>
            </div>
          </div>

          {/* PNR Number - Large and prominent */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-6 text-center">
            <p className="text-sm font-medium mb-2 text-blue-100">
              Номер бронирования (PNR)
            </p>
            <p className="text-5xl font-bold tracking-wider mb-2">
              {booking.pnr}
            </p>
            <p className="text-xs text-blue-100">
              Сохраните этот номер для регистрации на рейс
            </p>
          </div>

          {/* Flight Information */}
          {booking.flight && (
            <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">
                  Информация о рейсе
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Вылет</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {booking.flight.departureTime}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {booking.flight.from}
                  </p>
                  <p className="text-xs text-gray-500">
                    {booking.flight.fromAirport}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Прибытие</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {formatTime(booking.flight.arrivalTime)}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {booking.flight.to}
                  </p>
                  <p className="text-xs text-gray-500">
                    {booking.flight.toAirport}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Рейс:</span>
                  <span className="font-bold text-gray-800">
                    {booking.flight.flightNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Авиакомпания:</span>
                  <span className="font-semibold text-gray-800">
                    {booking.flight.operatedBy}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Дата вылета:</span>
                  <span className="font-semibold text-gray-800">
                    {formatDate(booking.flight.departureDate)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Продолжительность:</span>
                  <span className="font-semibold text-gray-800">
                    {booking.flight.flightDuration}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Passengers and Class */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border-2 border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-gray-800 text-sm">Пассажиры</h4>
              </div>
              <ul className="space-y-1">
                {booking.passengers.map((p, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    {idx + 1}. {p.firstName} {p.lastName}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 text-sm mb-3">
                Класс обслуживания
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {booking.cabinClass === "economy" ? "Эконом" : "Бизнес"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {booking.totalPrice.toLocaleString()} ₸
              </p>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-yellow-900 text-sm mb-2">
              ⚠️ Важная информация
            </h4>
            <ul className="text-xs text-yellow-800 space-y-1">
              <li>
                • Регистрация на рейс открывается за 24 часа до вылета
              </li>
              <li>
                • Прибудьте в аэропорт не позднее чем за 2 часа до вылета
              </li>
              <li>• Не забудьте взять с собой документ, удостоверяющий личность</li>
              <li>• PNR номер потребуется для онлайн-регистрации</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onViewBookings}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
            >
              Мои бронирования
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 font-bold py-4 rounded-xl hover:bg-gray-300 transition"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}