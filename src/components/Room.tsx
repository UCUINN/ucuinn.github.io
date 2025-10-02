import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Bed,
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
      className="relative overflow-hidden py-20"
      aria-labelledby="rooms-heading"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-primary-50/30 to-white" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="rooms-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-primary-700"
          >
            {t("rooms.sectionTitle")}
          </h2>
          <p className="mt-4 text-base text-gray-700 font-medium">
            {t("info.description.location")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2">
          {rooms.map((room) => (
            <article
              key={room.id}
              className={`group relative overflow-hidden rounded-3xl border border-primary-100/50 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                room.highlight ? "ring-2 ring-primary-200/50" : ""
              }`}
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
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
                <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-700 shadow-md">
                  {room.accent}
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {room.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 font-medium line-clamp-3">
                    {room.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-primary-100/50 bg-white/90 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
                  <div className="text-center sm:text-left">
                    <span className="text-xs uppercase tracking-wider text-gray-600 font-semibold block">
                      {t("prices.pricePerNight")}
                    </span>
                    <p className="text-lg sm:text-xl font-bold text-primary-700">
                      {room.priceLabel}
                    </p>
                  </div>
                  <a
                    href="https://booking-universitycentre.otelms.com/booking/rooms/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto"
                  >
                    {t("rooms.bookNow")}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                <div className="flex justify-center flex-wrap gap-2">
                  {room.amenities.map((amenityKey) => {
                    const Icon = amenityIconMap[amenityKey];
                    return (
                      <span
                        key={amenityKey}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary-50/80 px-3 py-1.5 text-xs font-medium text-primary-700 border border-primary-100/50 shadow-sm"
                      >
                        {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
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
