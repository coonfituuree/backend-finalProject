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
      <div className="min-h-screen bg-[rgb(244,245,247)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(28,43,79)]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[rgb(244,245,247)] flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
          <p className="text-red-700 mb-4 font-semibold">
            Пожалуйста, авторизуйтесь
          </p>
          <Link
            href="/auth"
            className="inline-block bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] text-white px-6 py-3 rounded-lg hover:opacity-90 font-bold transition">
            Войти
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(244,245,247)] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Мой профиль</h1>
            <p className="text-white/80 font-medium">
              Управление личной информацией
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
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

            {!editing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[rgb(244,245,247)] rounded-lg p-4">
                    <label className="text-[rgb(80,98,112)] text-sm font-semibold">
                      Имя
                    </label>
                    <p className="text-[rgb(28,43,79)] text-lg mt-1 font-semibold">
                      {user.firstName}
                    </p>
                  </div>

                  <div className="bg-[rgb(244,245,247)] rounded-lg p-4">
                    <label className="text-[rgb(80,98,112)] text-sm font-semibold">
                      Фамилия
                    </label>
                    <p className="text-[rgb(28,43,79)] text-lg mt-1 font-semibold">
                      {user.lastName}
                    </p>
                  </div>

                  <div className="bg-[rgb(244,245,247)] rounded-lg p-4">
                    <label className="text-[rgb(80,98,112)] text-sm font-semibold">
                      Имя пользователя
                    </label>
                    <p className="text-[rgb(28,43,79)] text-lg mt-1 font-semibold">
                      {user.username}
                    </p>
                  </div>

                  <div className="bg-[rgb(244,245,247)] rounded-lg p-4">
                    <label className="text-[rgb(80,98,112)] text-sm font-semibold">
                      Email
                    </label>
                    <p className="text-[rgb(28,43,79)] text-lg mt-1 font-semibold">
                      {user.email}
                    </p>
                  </div>

                  <div className="bg-[rgb(244,245,247)] rounded-lg p-4">
                    <label className="text-[rgb(80,98,112)] text-sm font-semibold">
                      Номер телефона
                    </label>
                    <p className="text-[rgb(28,43,79)] text-lg mt-1 font-semibold">
                      {user.phoneNumber}
                    </p>
                  </div>

                  <div className="bg-[rgb(244,245,247)] rounded-lg p-4">
                    <label className="text-[rgb(80,98,112)] text-sm font-semibold">
                      Роль
                    </label>
                    <p className="text-lg mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
                          user.role === "admin"
                            ? "bg-[rgb(164,134,86)] text-white"
                            : "bg-[rgb(28,43,79)] text-white"
                        }`}>
                        {user.role === "admin"
                          ? "Администратор"
                          : "Пользователь"}
                      </span>
                    </p>
                  </div>

                  <div className="bg-[rgb(244,245,247)] rounded-lg p-4">
                    <label className="text-[rgb(80,98,112)] text-sm font-semibold">
                      Статус верификации
                    </label>
                    <p className="text-lg mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
                          user.isAccountVerified
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}>
                        {user.isAccountVerified
                          ? "Подтверждено"
                          : "Не подтверждено"}
                      </span>
                    </p>
                  </div>

                  <div className="bg-[rgb(244,245,247)] rounded-lg p-4">
                    <label className="text-[rgb(80,98,112)] text-sm font-semibold">
                      Дата создания
                    </label>
                    <p className="text-[rgb(28,43,79)] text-lg mt-1 font-semibold">
                      {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t flex gap-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 bg-[rgb(164,134,86)] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition">
                    Редактировать профиль
                  </button>

                  {user.role === "admin" && (
                    <button
                      className="flex-1 bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"
                      onClick={() => (window.location.href = "/admin")}>
                      Админ-панель
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-[rgb(244,245,247)] border border-gray-200 text-[rgb(28,43,79)] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                    Выход
                  </button>
                </div>
              </div>
            ) : (
              /* Edit Form */
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                    Имя
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                  />
                </div>

                <div>
                  <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                  />
                </div>

                <div>
                  <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[rgb(164,134,86)] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition">
                    Сохранить изменения
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-[rgb(244,245,247)] border border-gray-200 text-[rgb(28,43,79)] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
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
