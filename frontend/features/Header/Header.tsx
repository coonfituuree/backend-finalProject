"use client";

import Container from "@/shared/ui/Container";
import Link from "next/link";
import { useAuthStore } from "@/shared/store/auth.store";
import { useRouter } from "next/navigation";

import { authApi } from "@/shared/api/auth.api";

function Header() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const logoutStore = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await authApi.logout(); // ✅ сервер удалит cookie
    } catch (e) {
      // даже если ошибка — локально всё равно выходим
    } finally {
      logoutStore(); // ✅ сброс zustand
      router.replace("/auth"); // лучше replace
    }
  };

  return (
    <header>
      <Container className="py-8">
        <div className="flex items-center justify-between gap-9">
          <Link href="/" className="text-2xl text-white font-bold">
            Vizier Airways
          </Link>

          <div className="flex items-center gap-12 text-white font-semibold">
            <Link href="/">Главная</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/bookings">Мои бронирования</Link>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="px-6 py-2 bg-blue-600 cursor-pointer rounded-2xl hover:bg-blue-700">
                  {user.username}
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 cursor-pointer rounded-2xl hover:bg-red-700">
                  Выход
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-6 py-2 bg-primary cursor-pointer rounded-2xl hover:bg-[#242424]">
                Вход
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
