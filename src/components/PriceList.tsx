import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Bed,
  Coffee,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";

interface RoomPriceInfo {
  type: "twin" | "suite";
  highlight?: boolean;
  prices: {
    guests: string;
    amount: number;
  }[];
  amenities: string[];
}

const amenityIconMap: Record<string, LucideIcon> = {
  "rooms.amenities.twoPersons": Users,
  "rooms.amenities.fourPersons": Users,
  "rooms.amenities.wifi": Wifi,
  "rooms.amenities.bathroom": Bed,
};

const PriceList = () => {
  const { t } = useTranslation();

  const formatAmount = useMemo(
    () =>
      new Intl.NumberFormat("uk-UA", {
        maximumFractionDigits: 0,
      }),
    []
  );

  const rooms: RoomPriceInfo[] = [
    {
      type: "twin",
      prices: [
        { guests: t("prices.oneGuest"), amount: 1500 },
        { guests: t("prices.twoGuests"), amount: 1800 },
      ],
      amenities: [
        "rooms.amenities.twoPersons",
        "rooms.amenities.wifi",
        "rooms.amenities.bathroom",
      ],
    },
    {
      type: "suite",
      highlight: true,
      prices: [
        { guests: t("prices.oneGuest"), amount: 1800 },
        { guests: t("prices.twoGuests"), amount: 2100 },
        { guests: t("prices.threeGuests"), amount: 2400 },
      ],
      amenities: [
        "rooms.amenities.fourPersons",
        "rooms.amenities.wifi",
        "rooms.amenities.bathroom",
      ],
    },
  ];

  const callouts: Array<{
    icon: LucideIcon;
    title: string;
    accent?: string;
  }> = [
    {
      icon: Bed,
      title: `${t("prices.additionalInfo.amenities")} ${t(
        "prices.additionalInfo.amenitiesdetailed"
      )}`.trim(),
    },
    {
      icon: Wifi,
      title: t("prices.additionalInfo.wifi"),
      accent: t("prices.additionalInfo.wifiname"),
    },
    {
      icon: Coffee,
      title: `${t("prices.additionalInfo.breakfast")} 300 ${t(
        "prices.currency"
      )}`.replace(/\s+/g, " "),
    },
  ];

  return (
    <section
      id="prices"
      className="relative py-20 overflow-hidden"
      aria-labelledby="prices-heading"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/60 via-white to-white" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="prices-heading"
            className="text-4xl font-bold tracking-tight text-primary-700"
          >
            {t("prices.title")}
          </h2>
          <p className="mt-4 text-base text-gray-600">
            {t("prices.additionalInfo.bedTypes")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2 auto-rows-fr">
          {rooms.map((room) => {
            const accentLabel = t(`prices.roomTypes.${room.type}.namename`);
            const title = t(`rooms.${room.type === "twin" ? "twin" : "semiLuxury"}.title`);
            const description = t(
              `rooms.${room.type === "twin" ? "twin" : "semiLuxury"}.description`
            );
            const basePrice = t(
              `rooms.${room.type === "twin" ? "twin" : "semiLuxury"}.price`
            );

            return (
              <article
                key={room.type}
                className={`relative overflow-hidden rounded-3xl border border-primary-100/60 bg-white/80 backdrop-blur-sm shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  room.highlight ? "ring-1 ring-primary-200" : ""
                }`}
              >
                <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-primary-300/20 blur-3xl" />
                <div className="absolute -left-12 -bottom-16 h-52 w-52 rounded-full bg-primary-200/20 blur-3xl" />

                <div className="relative z-10 flex h-full flex-col p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600 shadow-sm w-fit">
                      {accentLabel}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                    <div className="text-center bg-primary-50/70 rounded-lg px-3 py-2 shadow-sm mt-2">
                      <span className="text-xs uppercase tracking-wider text-gray-500 block">
                        {t("prices.pricePerNight")}
                      </span>
                      <p className="text-lg font-semibold text-primary-700">
                        {basePrice}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-6 space-y-2.5">
                    {room.prices.map((price) => (
                      <div
                        key={`${room.type}-${price.guests}`}
                        className="flex items-center justify-between rounded-xl border border-primary-100/80 bg-white/80 px-3 py-2.5 shadow-sm hover:border-primary-200 transition-colors"
                      >
                        <dt className="text-sm font-medium text-gray-700 flex-1">
                          {price.guests}
                        </dt>
                        <dd className="flex items-baseline flex-shrink-0">
                          <span className="text-base sm:text-lg font-semibold text-primary-700">
                            {formatAmount.format(price.amount)}
                          </span>
                          <span className="ml-1 text-xs font-medium text-gray-500">
                            {t("prices.currency")}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.amenities.map((amenityKey) => {
                      const Icon = amenityIconMap[amenityKey];
                      return (
                        <span
                          key={amenityKey}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary-50/80 px-2.5 py-1 text-xs font-medium text-primary-700 border border-primary-100/50 shadow-sm"
                        >
                          {Icon ? <Icon className="h-3 w-3" aria-hidden="true" /> : null}
                          {t(amenityKey)}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-4 text-center">
                    <a
                      href="https://booking-universitycentre.otelms.com/booking/rooms/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg w-full"
                    >
                      {t("rooms.bookNow")}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {callouts.map(({ icon: Icon, title, accent }, index) => (
            <div
              key={`${title}-${index}`}
              className="relative overflow-hidden rounded-2xl border border-primary-100 bg-white/80 p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex items-center gap-3 text-primary-600">
                <span className="rounded-xl bg-primary-50 p-3">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{title}</p>
              {accent && (
                <p className="mt-3 text-xl font-semibold text-primary-700">
                  {accent}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://booking-universitycentre.otelms.com/booking/rooms/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            {t("booking.title")}
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PriceList;
