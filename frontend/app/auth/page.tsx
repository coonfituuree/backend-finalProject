"use client";

import React, { useEffect, useState } from "react";
import { authApi } from "@/shared/api/auth.api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";
import { userApi } from "@/shared/api/user.api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const loginStore = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await authApi.login(loginForm);

      if (!result.success) {
        return setError("Ошибка входа");
      }

      const me = await userApi.getCurrentUser();

      if (!me?.user) {
        throw new Error("Cannot load current user");
      }

      
      loginStore({
        id: me.user._id,
        username: me.user.username,
        email: me.user.email,
      });

      setSuccess("Успешно вошли в систему!");
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await authApi.register(registerForm);

      const u = (result as any)?.data?.user;

      const userToStore = u
        ? { id: u.id ?? u._id, username: u.username, email: u.email }
        : { username: registerForm.username, email: registerForm.email };

      loginStore(userToStore);

      setSuccess("Регистрация успешна!");
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[rgb(244,245,247)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md shadow-sm">
        <h1 className="text-3xl font-bold text-[rgb(28,43,79)] mb-2 text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
        <p className="text-[rgb(80,98,112)] text-center mb-6 font-medium">
          {isLogin ? "Welcome back!" : "Create a new account"}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
            {success}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={registerForm.firstName}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                  placeholder="Serkan"
                />
              </div>
              <div>
                <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={registerForm.lastName}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                  placeholder="Bolat"
                />
              </div>
            </div>

            <div>
              <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                placeholder="serkan_bolat"
              />
            </div>

            <div>
              <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={registerForm.phoneNumber}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                placeholder="+7 (999) 999-99-99"
              />
            </div>

            <div>
              <label className="block text-[rgb(28,43,79)] font-semibold mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[rgb(164,134,86)] focus:ring-1 focus:ring-[rgb(164,134,86)] transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[linear-gradient(116.49deg,_rgb(28,43,79)_0%,_rgb(80,98,112)_100%)] text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-[rgb(80,98,112)] font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[rgb(164,134,86)] font-bold hover:underline cursor-pointer"
              type="button">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
