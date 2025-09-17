import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Bed,
  Coffee,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import rec9 from "../img/rec9pic.webp";
import rec11 from "../img/rec11pic.webp";

interface RoomCard {
  id: "twin" | "suite";
  image: string;
  accent: string;
  title: string;
  description: string;
  priceLabel: string;
  amenities: string[];
  highlight?: boolean;
}

const amenityIconMap: Record<string, LucideIcon> = {
  "rooms.amenities.twoPersons": Users,
  "rooms.amenities.fourPersons": Users,
  "rooms.amenities.wifi": Wifi,
  "rooms.amenities.bathroom": Bed,
};

const Room = () => {
  const { t } = useTranslation();

  const rooms: RoomCard[] = [
    {
      id: "twin",
      image: rec9,
      accent: t("prices.roomTypes.twin.namename"),
      title: t("rooms.twin.title"),
      description: t("rooms.twin.description"),
      priceLabel: t("rooms.twin.price"),
      amenities: [
        "rooms.amenities.twoPersons",
        "rooms.amenities.wifi",
        "rooms.amenities.bathroom",
      ],
    },
    {
      id: "suite",
      image: rec11,
      accent: t("prices.roomTypes.suite.namename"),
      title: t("rooms.semiLuxury.title"),
      description: t("rooms.semiLuxury.description"),
      priceLabel: t("rooms.semiLuxury.price"),
      amenities: [
        "rooms.amenities.fourPersons",
        "rooms.amenities.wifi",
        "rooms.amenities.bathroom",
      ],
      highlight: true,
    },
  ];

  return (
    <section
      id="rooms"
      className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white py-20"
      aria-labelledby="rooms-heading"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(98,65,245,0.12)_0,_rgba(255,255,255,0)_55%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="rooms-heading"
            className="text-4xl font-bold tracking-tight text-primary-700"
          >
            {t("rooms.sectionTitle")}
          </h2>
          <p className="mt-4 text-base text-gray-600">
            {t("info.description.location")}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:grid-rows-1">
          {rooms.map((room) => (
            <article
              key={room.id}
              className={`group relative overflow-hidden rounded-3xl border border-primary-100/60 bg-white/80 backdrop-blur-sm shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl h-full w-full ${
                room.highlight ? "lg:scale-[1.02]" : ""
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                  className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700 shadow">
                  {room.accent}
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-6 p-8 h-[400px]">
                <div className="min-h-[100px]">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {room.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">
                    {room.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-100 bg-white/70 px-6 py-4 shadow-sm min-h-[90px]">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      {t("prices.pricePerNight")}
                    </span>
                    <p className="text-xl font-semibold text-primary-600">
                      {room.priceLabel}
                    </p>
                  </div>
                  <a
                    href="https://booking-universitycentre.otelms.com/booking/rooms/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
                  >
                    {t("rooms.bookNow")}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 min-h-[50px]">
                  {room.amenities.map((amenityKey) => {
                    const Icon = amenityIconMap[amenityKey];
                    return (
                      <span
                        key={amenityKey}
                        className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-700 shadow-sm"
                      >
                        {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                        {t(amenityKey)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Room;
