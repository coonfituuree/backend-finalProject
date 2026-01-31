"use client";

import Image from "next/image";
import { cn } from "@/shared/libs/utils";

type Destination = {
  title: string;
  priceFrom: string; // "от 34 000 ₸"
  subtitle: string;
  img: string; // path in /public
};

const promoTop = [
  {
    title: "Экономьте до 70%\nпри покупке\nбагажа онлайн",
    subtitle: "Входит в пакеты Комфорт и Комфорт+",
    img: "/welcome/promo-bag.jpg",
  },
  {
    title: "Летите впервые?",
    subtitle: "Ознакомьтесь с правилами регистрации и посадки до полёта",
    img: "/welcome/promo-first.jpg",
  },
  {
    title: "Уже купили билет?",
    subtitle:
      "Забронируйте трансфер из аэропорта заранее — надёжно, выгодно, без переплат",
    img: "/welcome/promo-taxi.jpg",
  },
];

const destinations: Destination[] = [
  {
    title: "Сердце Имперетии",
    priceFrom: "от 34 000 ₸",
    subtitle: "Наши направления",
    img: "/welcome/dest-1.jpg",
  },
  {
    title: "Столица дружбы",
    priceFrom: "от 33 000 ₸",
    subtitle: "",
    img: "/welcome/dest-2.jpg",
  },
  {
    title: "Объятия Алтая",
    priceFrom: "от 10 000 ₸",
    subtitle: "",
    img: "/welcome/dest-3.jpg",
  },
];

export default function Welcome() {
  return (
    <div className="w-full">
      {/* TOP promo cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promoTop.map((p) => (
          <PromoCard
            key={p.title}
            title={p.title}
            subtitle={p.subtitle}
            img={p.img}
          />
        ))}
      </div>

      {/* Destinations section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-[rgb(28,43,79)] leading-tight">
            Время новых
            <br />
            приключений
          </h2>

          <button className="mt-4 text-left text-sm font-semibold text-[rgb(164,134,86)] hover:opacity-80 transition">
            Наши направления →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <DestinationCard key={d.title} {...d} />
          ))}
        </div>
      </div>

      {/* Bottom big cards */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NewsletterCard />
        <AppCard />
      </div>
    </div>
  );
}

function PromoCard({
  title,
  subtitle,
  img,
}: {
  title: string;
  subtitle: string;
  img: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex">
      <div className="p-6 flex-1">
        <div className="whitespace-pre-line font-semibold text-[rgb(28,43,79)]">
          {title}
        </div>
        <div className="mt-2 text-sm text-gray-500">{subtitle}</div>
        <div className="mt-4 text-[rgb(164,134,86)] font-semibold">
          Подробнее →
        </div>
      </div>

      <div className="relative w-[140px]">
        <Image
          src={img}
          alt=""
          width={600}
          height={600}
          className="object-cover w-[140px] h-full"
          sizes="140px"
          priority={false}
        />
      </div>
    </div>
  );
}

function DestinationCard({ title, priceFrom, img }: Destination) {
  return (
    <div className="group">
      <div className="relative w-full h-[140px] rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={img}
          alt=""
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-3 text-[rgb(28,43,79)] font-semibold">{priceFrom}</div>
      <div className="mt-1 text-sm font-semibold text-[rgb(164,134,86)]">
        “{title}” →
      </div>
    </div>
  );
}

function NewsletterCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#3557b7] to-[#1f3c87] text-white p-8">
      <h3 className="text-2xl font-semibold leading-snug">
        Подпишитесь на
        <br />
        рассылки
      </h3>

      <p className="mt-3 text-white/80 text-sm max-w-md">
        и узнавайте первыми о новых маршрутах и специальных предложениях.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="rounded-2xl bg-white/15 placeholder-white/60 outline-none px-4 py-3"
          placeholder="Email"
        />
        <select className="rounded-2xl bg-white/15 outline-none px-4 py-3">
          <option className="text-black">Город</option>
          <option className="text-black">Almaty</option>
          <option className="text-black">Astana</option>
          <option className="text-black">Shymkent</option>
        </select>
      </div>

      <p className="mt-5 text-xs text-white/70 max-w-lg">
        Нажимая на кнопку «Подписаться», вы соглашаетесь на обработку ваших
        персональных данных.
      </p>

      <div className="mt-6">
        <button className="bg-white text-[#1f3c87] font-semibold px-6 py-3 rounded-2xl hover:opacity-90 transition">
          Подписаться
        </button>
      </div>
    </div>
  );
}

function AppCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-[#d6453a] text-white p-8 relative">
      <h3 className="text-2xl font-semibold leading-snug">
        Мобильное
        <br />
        приложение
      </h3>

      <p className="mt-3 text-white/85 text-sm max-w-md">
        Бронируйте билеты быстро и легко с приложением Vizier Airways
      </p>

      <div className="mt-6 flex items-end gap-6">
        <div className="bg-white rounded-2xl p-3">
          {/* QR placeholder */}
          <div className="w-[90px] h-[90px] bg-black/10 rounded-xl" />
        </div>

        <p className="text-sm text-white/90 max-w-[220px]">
          Для скачивания наведите камеру смартфона на QR-код
        </p>
      </div>

      {/* phone image */}
      <div className="hidden md:block absolute right-6 bottom-0 w-[260px] h-[320px]">
        <Image
          src="/welcome/app-phone.png"
          alt=""
          fill
          className="object-contain"
          sizes="260px"
        />
      </div>
    </div>
  );
}
