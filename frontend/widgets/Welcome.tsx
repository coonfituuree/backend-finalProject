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
    title: "Save up to 70%\nwhen buying\nluggage online",
    subtitle: "Included in Comfort and Comfort+ packages",
    img: "/welcome/promo-bag.jpg",
  },
  {
    title: "Flying for the first time?",
    subtitle:
      "Familiarize yourself with check-in and boarding rules before your flight",
    img: "/welcome/promo-first.jpg",
  },
  {
    title: "Already bought a ticket?",
    subtitle:
      "Book airport transfer in advance — reliable, cost-effective, no overpayment",
    img: "/welcome/promo-taxi.jpg",
  },
];

const destinations: Destination[] = [
  {
    title: "Heart of the Empire",
    priceFrom: "from 34,000 ₸",
    subtitle: "Our destinations",
    img: "/welcome/dest-1.jpg",
  },
  {
    title: "Capital of Friendship",
    priceFrom: "from 33,000 ₸",
    subtitle: "",
    img: "/welcome/dest-2.jpg",
  },
  {
    title: "Embrace of Altai",
    priceFrom: "from 10,000 ₸",
    subtitle: "",
    img: "/welcome/dest-3.jpg",
  },
];

export default function Welcome() {
  return (
    <div className="w-full">
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

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-[rgb(28,43,79)] leading-tight">
            Time for new
            <br />
            adventures
          </h2>

          <button className="mt-4 text-left text-sm font-semibold text-[rgb(164,134,86)] hover:opacity-80 transition">
            Our destinations →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <DestinationCard key={d.title} {...d} />
          ))}
        </div>
      </div>
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
          Learn more →
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
        Subscribe to
        <br />
        our newsletter
      </h3>

      <p className="mt-3 text-white/80 text-sm max-w-md">
        and be the first to know about new routes and special offers.
      </p>

      <input
        className="w-full rounded-2xl mt-5 bg-white/15 placeholder-white/60 outline-none px-4 py-3"
        placeholder="Email"
      />

      <p className="mt-5 text-xs text-white/70 max-w-lg">
        By clicking the "Subscribe" button, you consent to the processing of
        your personal data.
      </p>

      <div className="mt-6">
        <button className="bg-white text-[#1f3c87] font-semibold px-6 py-3 rounded-2xl hover:opacity-90 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
}

function AppCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-[#d6453a] text-white p-8 relative">
      <h3 className="text-2xl font-semibold leading-snug">
        Mobile
        <br />
        Application
      </h3>

      <p className="mt-3 text-white/85 text-sm max-w-md">
        Book tickets quickly and easily with the Vizier Airways app
      </p>

      <div className="mt-6 flex items-center gap-6">
        <div className="bg-white rounded-2xl p-3">
          <Image
            src="/welcome/qr.png"
            alt="qr"
            width={100}
            height={100}
            className="w-[90px] h-[90px] bg-black/10 rounded-xl"
          />
        </div>

        <p className="text-sm text-white/90 max-w-[220px]">
          To download, point your smartphone camera at the QR code
        </p>
      </div>
    </div>
  );
}
