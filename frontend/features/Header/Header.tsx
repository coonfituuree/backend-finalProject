"use client";

import { useState, useEffect } from "react";
import Container from "@/shared/ui/Container";
import Link from "next/link";
import { useAuthStore } from "@/shared/store/auth.store";
import { cn } from "@/shared/libs/utils";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
type HeaderProps = {
  className?: string;
};

function Header({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
      { name: "My Bookings", href: "/mybookings" },
  ];

  return (
    <header className={cn("relative z-50", className)}>
      <Container className="py-6 md:py-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className={cn(
              "text-xl pl-2 md:pl-0 md:text-2xl font-bold transition-colors z-50",
              isHome || isOpen ? "text-white" : "text-black"
            )}
          >
            Vizier Airways
          </Link>

          <nav
            className={cn(
              "hidden md:flex items-center gap-12 font-semibold transition-colors",
              isHome ? "text-white" : "text-black"
            )}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-70 transition-opacity">
                {link.name}
              </Link>
            ))}

            {isAuthenticated && user ? (
              <Link
                href="/profile"
                className={cn(
                  "px-6 py-2 rounded-2xl transition-all duration-300",
                  isHome ? "bg-primary text-white hover:bg-[#22345f]" : "bg-black text-white hover:bg-[#242424]"
                )}
              >
                {user.username}
              </Link>
            ) : (
              <Link
                href="/auth"
                className={cn(
                  "px-6 py-2 rounded-2xl transition-all",
                  isHome ? "bg-primary text-white" : "bg-black text-white"
                )}
              >
                Sign In
              </Link>
            )}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "md:hidden z-50 p-2 transition-colors",
              isHome || isOpen ? "text-white" : "text-black"
            )}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "fixed inset-0 bg-black/95 transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 text-white",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-2xl font-semibold hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}

        {isAuthenticated && user ? (
          <Link
            href="/profile"
            className="text-2xl font-semibold bg-primary px-8 py-3 rounded-2xl"
          >
            {user.username}
          </Link>
        ) : (
          <Link
            href="/auth"
            className="text-2xl font-semibold bg-primary px-8 py-3 rounded-2xl"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;