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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Админ-панель
              </h1>
              <p className="text-gray-600">
                Управление пользователями и рейсами
              </p>
            </div>
            <Link
              href="/profile"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Профиль
            </Link>
          </div>
        </div>

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

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 px-6 py-4 font-bold text-center transition ${
                activeTab === "users"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              👥 Пользователи
            </button>
            <button
              onClick={() => setActiveTab("flights")}
              className={`flex-1 px-6 py-4 font-bold text-center transition ${
                activeTab === "flights"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              ✈️ Все рейсы
            </button>
            <button
              onClick={() => setActiveTab("add-flight")}
              className={`flex-1 px-6 py-4 font-bold text-center transition ${
                activeTab === "add-flight"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              ➕ Добавить рейс
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Управление пользователями
                </h2>

                {usersLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">
                      Загрузка пользователей...
                    </p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12 text-gray-600">
                    Пользователей не найдено
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                            Имя
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                            Телефон
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                            Роль
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                            Статус
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                            Дата создания
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {user.phoneNumber}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  user.role === "admin"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}>
                                {user.role === "admin"
                                  ? "Администратор"
                                  : "Пользователь"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  user.isAccountVerified
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                {user.isAccountVerified
                                  ? "Подтверждено"
                                  : "Не подтверждено"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Все рейсы в системе
                </h2>
                <p className="text-gray-600 mb-4">
                  Эта функция будет загружать список всех рейсов при добавлении
                  эндпоинта GET /admin/flights в backend
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    💡 Подсказка: Для отображения рейсов добавьте GET эндпоинт в
                    backend routes/admin.routes.js
                  </p>
                </div>
              </div>
            )}

            {/* Add Flight Tab */}
            {activeTab === "add-flight" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Добавить новый рейс
                </h2>

                {/* Single Flight Form */}
                <div className="mb-12 pb-12 border-b">
                  <h3 className="text-xl font-bold text-gray-700 mb-6">
                    📋 Добавить один рейс
                  </h3>

                  <form onSubmit={handleAddFlight} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Откуда
                        </label>
                        <input
                          type="text"
                          name="from"
                          value={flightForm.from}
                          onChange={handleFlightChange}
                          placeholder="Москва"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Код аэропорта (откуда)
                        </label>
                        <input
                          type="text"
                          name="fromAirport"
                          value={flightForm.fromAirport}
                          onChange={handleFlightChange}
                          placeholder="SVO"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Куда
                        </label>
                        <input
                          type="text"
                          name="to"
                          value={flightForm.to}
                          onChange={handleFlightChange}
                          placeholder="Санкт-Петербург"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Код аэропорта (куда)
                        </label>
                        <input
                          type="text"
                          name="toAirport"
                          value={flightForm.toAirport}
                          onChange={handleFlightChange}
                          placeholder="LED"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Авиакомпания
                        </label>
                        <input
                          type="text"
                          name="operatedBy"
                          value={flightForm.operatedBy}
                          onChange={handleFlightChange}
                          placeholder="Аэрофлот"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Номер рейса
                        </label>
                        <input
                          type="text"
                          name="flightNumber"
                          value={flightForm.flightNumber}
                          onChange={handleFlightChange}
                          placeholder="SU100"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Тип самолета
                        </label>
                        <input
                          type="text"
                          name="airplaneType"
                          value={flightForm.airplaneType}
                          onChange={handleFlightChange}
                          placeholder="Boeing 737"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Время вылета
                        </label>
                        <input
                          type="datetime-local"
                          name="departureTime"
                          value={flightForm.departureTime}
                          onChange={handleFlightChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Время прибытия
                        </label>
                        <input
                          type="datetime-local"
                          name="arrivalTime"
                          value={flightForm.arrivalTime}
                          onChange={handleFlightChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Продолжительность полета
                        </label>
                        <input
                          type="text"
                          name="flightDuration"
                          value={flightForm.flightDuration}
                          onChange={handleFlightChange}
                          placeholder="1h 30min"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Количество пересадок
                        </label>
                        <input
                          type="text"
                          name="numberOfTransfers"
                          value={flightForm.numberOfTransfers}
                          onChange={handleFlightChange}
                          placeholder="0"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Цена Эконом класса (₽)
                        </label>
                        <input
                          type="number"
                          name="EconomPrice"
                          value={flightForm.EconomPrice}
                          onChange={handleFlightChange}
                          placeholder="5000"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Цена Бизнес класса (₽)
                        </label>
                        <input
                          type="number"
                          name="businessPrice"
                          value={flightForm.businessPrice}
                          onChange={handleFlightChange}
                          placeholder="10000"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                      {loading ? "Добавление..." : "Добавить рейс"}
                    </button>
                  </form>
                </div>

                {/* Bulk Upload Form */}
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-6">
                    📦 Добавить несколько рейсов (JSON)
                  </h3>

                  <form onSubmit={handleAddFlightsBulk} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50">
                      {loading ? "Добавление..." : "Добавить рейсы"}
                    </button>
                  </form>

                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 font-semibold mb-2">
                      ℹ️ Формат JSON:
                    </p>
                    <p className="text-xs text-blue-700">
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
