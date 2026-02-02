"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, AdminUser, Flight } from "@/shared/api/admin.api";
import Link from "next/link";

type TabType = "users" | "flights" | "add-flight";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [flightForm, setFlightForm] = useState({
    from: "",
    fromAirport: "",
    to: "",
    toAirport: "",
    operatedBy: "",
    flightNumber: "",
    airplaneType: "",
    departureTime: "",
    arrivalTime: "",
    flightDuration: "",
    numberOfTransfers: "",
    EconomPrice: "",
    businessPrice: "",
  });

  const [flightsBulkText, setFlightsBulkText] = useState("");

  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    setUsersLoading(true);
    setError("");
    try {
      const result = await adminApi.getAllUsers();
      if (result.data) {
        setUsers(result.data);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки пользователей",
      );
      if (err instanceof Error && err.message.includes("401")) {
        setTimeout(() => router.push("/auth"), 2000);
      }
    } finally {
      setUsersLoading(false);
    }
  };

  const handleFlightChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFlightForm({ ...flightForm, [e.target.name]: e.target.value });
  };

  const handleAddFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await adminApi.addFlight({
        ...flightForm,
        EconomPrice: parseFloat(flightForm.EconomPrice),
        businessPrice: parseFloat(flightForm.businessPrice),
      });

      setSuccess("Рейс успешно добавлен!");
      setFlightForm({
        from: "",
        fromAirport: "",
        to: "",
        toAirport: "",
        operatedBy: "",
        flightNumber: "",
        airplaneType: "",
        departureTime: "",
        arrivalTime: "",
        flightDuration: "",
        numberOfTransfers: "",
        EconomPrice: "",
        businessPrice: "",
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка добавления рейса");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFlightsBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const flights = JSON.parse(flightsBulkText);
      if (!Array.isArray(flights)) {
        throw new Error("JSON должен быть массивом рейсов");
      }

      await adminApi.addFlightsBulk(flights);
      setSuccess(`Успешно добавлено ${flights.length} рейсов!`);
      setFlightsBulkText("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка добавления рейсов");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(244,245,247)] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[rgb(28,43,79)] mb-2">
                Админ-панель
              </h1>
              <p className="text-[rgb(80,98,112)] font-medium">
                Управление пользователями и рейсами
              </p>
            </div>
            <Link
              href="/profile"
              className="bg-[rgb(164,134,86)] text-white px-6 py-3 rounded-lg hover:opacity-90 font-bold transition">
              Профиль
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 px-6 py-4 font-bold text-center transition ${
                activeTab === "users"
                  ? "bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] text-white"
                  : "bg-[rgb(244,245,247)] text-[rgb(80,98,112)] hover:bg-gray-200"
              }`}>
              👥 Пользователи
            </button>
            <button
              onClick={() => setActiveTab("flights")}
              className={`flex-1 px-6 py-4 font-bold text-center transition ${
                activeTab === "flights"
                  ? "bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] text-white"
                  : "bg-[rgb(244,245,247)] text-[rgb(80,98,112)] hover:bg-gray-200"
              }`}>
              ✈️ Все рейсы
            </button>
            <button
              onClick={() => setActiveTab("add-flight")}
              className={`flex-1 px-6 py-4 font-bold text-center transition ${
                activeTab === "add-flight"
                  ? "bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] text-white"
                  : "bg-[rgb(244,245,247)] text-[rgb(80,98,112)] hover:bg-gray-200"
              }`}>
              ➕ Добавить рейс
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-bold text-[rgb(28,43,79)] mb-6">
                  Управление пользователями
                </h2>

                {usersLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(28,43,79)]"></div>
                    <p className="mt-4 text-[rgb(80,98,112)] font-medium">
                      Загрузка пользователей...
                    </p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12 text-[rgb(80,98,112)] font-medium">
                    Пользователей не найдено
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[rgb(244,245,247)]">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-bold text-[rgb(28,43,79)]">
                            Имя
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-[rgb(28,43,79)]">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-[rgb(28,43,79)]">
                            Телефон
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-[rgb(28,43,79)]">
                            Роль
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-[rgb(28,43,79)]">
                            Статус
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-[rgb(28,43,79)]">
                            Дата создания
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-[rgb(244,245,247)]">
                            <td className="px-6 py-4 text-sm text-[rgb(28,43,79)] font-medium">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className="px-6 py-4 text-sm text-[rgb(80,98,112)]">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-[rgb(80,98,112)]">
                              {user.phoneNumber}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                  user.role === "admin"
                                    ? "bg-[rgb(164,134,86)] text-white"
                                    : "bg-[rgb(28,43,79)] text-white"
                                }`}>
                                {user.role === "admin"
                                  ? "Администратор"
                                  : "Пользователь"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                                  user.isAccountVerified
                                    ? "bg-green-500 text-white"
                                    : "bg-yellow-500 text-white"
                                }`}>
                                {user.isAccountVerified
                                  ? "Подтверждено"
                                  : "Не подтверждено"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-[rgb(80,98,112)]">
                              {new Date(user.createdAt).toLocaleDateString(
                                "ru-RU",
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Flights Tab */}
            {activeTab === "flights" && (
              <div>
                <h2 className="text-2xl font-bold text-[rgb(28,43,79)] mb-6">
                  Все рейсы в системе
                </h2>
                <p className="text-[rgb(80,98,112)] mb-4 font-medium">
                  Эта функция будет загружать список всех рейсов при добавлении
                  эндпоинта GET /admin/flights в backend
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 font-medium">
                    💡 Подсказка: Для отображения рейсов добавьте GET эндпоинт в
                    backend routes/admin.routes.js
                  </p>
                </div>
              </div>
            )}

            {/* Add Flight Tab */}
            {activeTab === "add-flight" && (
              <div>
                <h2 className="text-2xl font-bold text-[rgb(28,43,79)] mb-6">
                  Добавить новый рейс
                </h2>

                {/* Single Flight Form */}
                <div className="mb-12 pb-12 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-[rgb(28,43,79)] mb-6">
                    📋 Добавить один рейс
                  </h3>

                  <form onSubmit={handleAddFlight} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(flightForm).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                            {key === "from" && "Откуда"}
                            {key === "fromAirport" && "Код аэропорта (откуда)"}
                            {key === "to" && "Куда"}
                            {key === "toAirport" && "Код аэропорта (куда)"}
                            {key === "operatedBy" && "Авиакомпания"}
                            {key === "flightNumber" && "Номер рейса"}
                            {key === "airplaneType" && "Тип самолета"}
                            {key === "departureTime" && "Время вылета"}
                            {key === "arrivalTime" && "Время прибытия"}
                            {key === "flightDuration" && "Продолжительность полета"}
                            {key === "numberOfTransfers" && "Количество пересадок"}
                            {key === "EconomPrice" && "Цена Эконом класса (₽)"}
                            {key === "businessPrice" && "Цена Бизнес класса (₽)"}
                          </label>
                          <input
                            type={
                              key === "departureTime" || key === "arrivalTime"
                                ? "datetime-local"
                                : key === "EconomPrice" || key === "businessPrice"
                                ? "number"
                                : "text"
                            }
                            name={key}
                            value={value}
                            onChange={handleFlightChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[rgb(164,134,86)] text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50">
                      {loading ? "Добавление..." : "Добавить рейс"}
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[rgb(28,43,79)] mb-6">
                    📦 Добавить несколько рейсов (JSON)
                  </h3>

                  <form onSubmit={handleAddFlightsBulk} className="space-y-4">
                    <div>
                      <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                        JSON с рейсами
                      </label>
                      <textarea
                        value={flightsBulkText}
                        onChange={(e) => setFlightsBulkText(e.target.value)}
                        placeholder={`[
  {
    "from": "Москва",
    "fromAirport": "SVO",
    "to": "Казань",
    "toAirport": "KZN",
    "operatedBy": "Аэрофлот",
    "flightNumber": "SU200",
    "airplaneType": "Boeing 737",
    "departureTime": "2025-02-15T10:00:00",
    "arrivalTime": "2025-02-15T12:00:00",
    "flightDuration": "2h 0min",
    "numberOfTransfers": "0",
    "EconomPrice": 4500,
    "businessPrice": 9000
  }
]`}
                        rows={10}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] font-mono text-sm transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50">
                      {loading ? "Добавление..." : "Добавить рейсы"}
                    </button>
                  </form>

                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-[rgb(28,43,79)] font-semibold mb-2">
                      ℹ️ Формат JSON:
                    </p>
                    <p className="text-xs text-[rgb(80,98,112)]">
                      Используйте массив объектов с полями: from, fromAirport,
                      to, toAirport, operatedBy, flightNumber, airplaneType,
                      departureTime, arrivalTime, flightDuration,
                      numberOfTransfers, EconomPrice, businessPrice
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}