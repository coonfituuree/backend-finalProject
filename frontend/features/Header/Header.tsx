"use client";

import Container from "@/shared/ui/Container";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated (you can use localStorage, cookies, or context)
    const checkAuth = async () => {
      try {
        // This is a simple check - in production you'd validate with backend
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <header>
      <Container className="py-8">
        <div className="flex items-center justify-between gap-9">
          <Link href={"/"} className="text-2xl text-white font-bold">
            Vizier Airways
          </Link>

          <div className="flex items-center gap-12 text-white font-semibold">
            <Link href={"/"}>Главная</Link>
            <Link href={"/faq"}>FAQ</Link>
            <Link href={"/bookings"}>Мои бронирования</Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={"/profile"}
                  className="px-6 py-2 bg-blue-600 cursor-pointer rounded-2xl hover:bg-blue-700">
                  Профиль
                </Link>
              </>
            ) : (
              <Link
                href={"/auth"}
                className="px-6 py-2 bg-[#242424] cursor-pointer rounded-2xl hover:bg-[#242424e9]">
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
