"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/shared/ui/Container";
import { bookingApi } from "@/shared/api/booking.api";
import { Booking } from "@/shared/types/booking.types";
import { useAuthStore } from "@/shared/store/auth.store";
import { ArrowRightIcon } from "@/shared/ui/icons/ArrowRightIcon";
import { MinusIcon } from "@/shared/ui/icons/MinusIcon";
import Header from "@/features/Header/Header";

function MyBookings() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
      return;
    }

    fetchBookings();
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await bookingApi.getMyBookings();
      if (result.bookings) {
        setBookings(result.bookings);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await bookingApi.cancelBooking(bookingId);
      setBookings(
        bookings.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error cancelling booking");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status: string) => {
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
        return "Confirmed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  if (loading) {
    return (
      <Container>
        <div className="py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c2b4f] mb-4"></div>
            <p className="text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <div className="py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#1c2b4f] mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">View and manage your flight bookings</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && !error ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="mb-4 text-5xl">✈️</div>
            <h2 className="text-2xl font-bold text-[#1c2b4f] mb-2">
              You have no bookings
            </h2>
            <p className="text-gray-600 mb-6">
              Start searching and book your first flight
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#1c2b4f] text-white px-8 py-3 rounded-lg hover:bg-[#152140] transition-colors duration-200 font-bold">
              Search flights
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                {/* Booking Card Header */}
                <div
                  onClick={() =>
                    setExpandedBooking(
                      expandedBooking === booking._id ? null : booking._id,
                    )
                  }
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {/* Flight Info */}
                      {booking.flight && (
                        <div className="mb-4">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-2xl font-bold text-[#1c2b4f]">
                              {booking.flight.fromAirportAbbreviation}
                            </span>
                            <div className="flex items-center gap-2">
                              <MinusIcon className="w-5 h-5 fill-gray-400" />
                              <ArrowRightIcon className="w-5 h-5 fill-gray-400" />
                            </div>
                            <span className="text-2xl font-bold text-[#1c2b4f]">
                              {booking.flight.toAirportAbbreviation}
                            </span>
                          </div>

                          <div className="text-sm text-gray-600">
                            {formatTime(booking.flight.departureTime)} -{" "}
                            {formatTime(booking.flight.arrivalTime)} ·{" "}
                            {formatDate(booking.flight.departureDate)}
                          </div>
                        </div>
                      )}

                      {/* Booking Meta Info */}
                      <div className="flex flex-wrap gap-4 items-center text-sm">
                        <div>
                          <span className="text-gray-600">PNR: </span>
                          <span className="font-bold text-[#1c2b4f]">
                            {booking.pnr}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Passengers: </span>
                          <span className="font-bold text-[#1c2b4f]">
                            {booking.passengers.length}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Class: </span>
                          <span className="font-bold text-[#1c2b4f]">
                            {booking.cabinClass === "economy"
                              ? "Economy"
                              : "Business"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge and Price */}
                    <div className="flex flex-col items-end gap-3">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-bold ${getStatusColor(
                          booking.status,
                        )}`}>
                        {getStatusText(booking.status)}
                      </span>
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Total</p>
                        <p className="text-2xl font-bold text-[#1c2b4f]">
                          {booking.totalPrice.toFixed(0)} KZT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedBooking === booking._id && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    {/* Passengers Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#1c2b4f] mb-4">
                        Passengers
                      </h3>
                      <div className="space-y-2">
                        {booking.passengers.map((passenger, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-3 rounded border border-gray-200">
                            <p className="text-sm font-semibold text-[#1c2b4f]">
                              {idx + 1}. {passenger.firstName}{" "}
                              {passenger.lastName}
                            </p>
                            <p className="text-xs text-gray-600">
                              Gender:{" "}
                              {passenger.gender === "male" ? "Male" : "Female"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Details Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#1c2b4f] mb-4">
                        Price Details
                      </h3>
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">
                            Price per passenger:
                          </span>
                          <span className="font-bold text-[#1c2b4f]">
                            {booking.pricePerPassenger.toFixed(0)} KZT
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                          <span className="text-gray-700">
                            Number of passengers:
                          </span>
                          <span className="font-bold text-[#1c2b4f]">
                            {booking.passengers.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-[#1c2b4f]">
                            Total:
                          </span>
                          <span className="text-lg font-bold text-[#1c2b4f]">
                            {booking.totalPrice.toFixed(0)} KZT
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-[#1c2b4f] mb-4">
                        Contact Information
                      </h3>
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Email:</span>
                          <span className="font-bold text-[#1c2b4f]">
                            {booking.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Flight Details Section */}
                    {booking.flight && (
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-[#1c2b4f] mb-4">
                          Flight Information
                        </h3>
                        <div className="bg-white p-4 rounded border border-gray-200 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Flight:</span>
                            <span className="font-bold text-[#1c2b4f]">
                              {booking.flight.flightNumber}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">
                              Flight duration:
                            </span>
                            <span className="font-bold text-[#1c2b4f]">
                              {booking.flight.flightDuration}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Transfers:</span>
                            <span className="font-bold text-[#1c2b4f]">
                              {booking.flight.numberOfTransfers === "0"
                                ? "Direct"
                                : `${booking.flight.numberOfTransfers} transfer(s)`}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Operator:</span>
                            <span className="font-bold text-[#1c2b4f]">
                              {booking.flight.operatedBy}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions Section */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      {booking.status !== "cancelled" && (
                        <>
                          {booking.status === "pending" && (
                            <button
                              onClick={() =>
                                router.push(`/payment?bookingId=${booking._id}`)
                              }
                              className="flex-1 bg-[#a48656] hover:bg-[#8b6f47] text-white px-4 py-3 rounded-lg transition-colors duration-200 font-bold">
                              Continue Payment
                            </button>
                          )}
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            disabled={cancellingId === booking._id}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg transition-colors duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                            {cancellingId === booking._id
                              ? "Cancelling..."
                              : "Cancel"}
                          </button>
                        </>
                      )}
                      {booking.status === "cancelled" && (
                        <button
                          onClick={() => router.push("/")}
                          className="flex-1 bg-[#1c2b4f] text-white px-4 py-3 rounded-lg hover:bg-[#152140] transition-colors duration-200 font-bold">
                          Search new flights
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default MyBookings;
