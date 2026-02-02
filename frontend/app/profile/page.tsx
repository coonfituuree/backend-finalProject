"use client";
import { useEffect, useState } from "react";
import { userApi } from "@/shared/api/user.api";
import { authApi } from "@/shared/api/auth.api";
import { User, UpdateUserRequest } from "@/shared/types/user.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState<UpdateUserRequest>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setLoading(true);
    try {
      const result = await userApi.getCurrentUser();
      if (result.user) {
        setUser(result.user);
        setFormData({
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          phoneNumber: result.user.phoneNumber,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки профиля");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await userApi.updateUser(formData);
      setSuccess("Профиль успешно обновлен!");
      setEditing(false);
      await loadUser();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка обновления профиля",
      );
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push("/auth");
    } catch (err) {
      setError("Ошибка выхода");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <p className="text-red-600 mb-4">Пожалуйста, авторизуйтесь</p>
          <Link
            href="/auth"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Войти
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Мой профиль</h1>
            <p className="text-blue-100">Управление личной информацией</p>
          </div>

          {/* Content */}
          <div className="p-8">
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

            {!editing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-600 text-sm font-semibold">
                      Имя
                    </label>
                    <p className="text-gray-800 text-lg mt-1">
                      {user.firstName}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-semibold">
                      Фамилия
                    </label>
                    <p className="text-gray-800 text-lg mt-1">
                      {user.lastName}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-semibold">
                      Имя пользователя
                    </label>
                    <p className="text-gray-800 text-lg mt-1">
                      {user.username}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-semibold">
                      Email
                    </label>
                    <p className="text-gray-800 text-lg mt-1">{user.email}</p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-semibold">
                      Номер телефона
                    </label>
                    <p className="text-gray-800 text-lg mt-1">
                      {user.phoneNumber}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-semibold">
                      Роль
                    </label>
                    <p className="text-gray-800 text-lg mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                        {user.role === "admin"
                          ? "Администратор"
                          : "Пользователь"}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-semibold">
                      Статус верификации
                    </label>
                    <p className="text-gray-800 text-lg mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.isAccountVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {user.isAccountVerified
                          ? "Подтверждено"
                          : "Не подтверждено"}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-semibold">
                      Дата создания
                    </label>
                    <p className="text-gray-800 text-lg mt-1">
                      {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t flex gap-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                    Редактировать профиль
                  </button>

                  {user.role === "admin" && (
                    <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition" onClick={() => window.location.href = '/admin'}>
                      Админ-панель
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">
                    Выход
                  </button>
                </div>
              </div>
            ) : (
              /* Edit Form */
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                    Сохранить изменения
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition">
                    Отмена
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
