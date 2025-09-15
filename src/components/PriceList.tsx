import React from "react";
import { useTranslation } from "react-i18next";
import { Info, Sparkles, Star } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { GlassCard } from "./ui";

interface RoomPriceInfo {
  type: string;
  prices: {
    guests: string;
    amount: number;
  }[];
}

const PriceList = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const rooms: RoomPriceInfo[] = [
    {
      type: "twin",
      prices: [
        { guests: t("prices.oneGuest"), amount: 1500 },
        { guests: t("prices.twoGuests"), amount: 1800 },
      ],
    },
    {
      type: "suite",
      prices: [
        { guests: t("prices.oneGuest"), amount: 1800 },
        { guests: t("prices.twoGuests"), amount: 2100 },
        { guests: t("prices.threeGuests"), amount: 2400 },
      ],
    },
  ];

  return (
    <section id="prices" className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="floating absolute top-16 right-20 w-24 h-24 gradient-neon rounded-full blur-xl"></div>
        <div className="floating absolute bottom-16 left-20 w-20 h-20 gradient-warm rounded-full blur-xl" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <div className={`text-center mb-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h2 className="text-5xl font-bold text-gradient">
              {t("prices.title")}
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="w-32 h-1 gradient-accent mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience luxury at competitive rates</p>
        </div>

        <GlassCard className={`rounded-2xl shadow-large border border-white/30 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Mobile version */}
          <div className="block md:hidden">
            {rooms.map((room) => (
              <div key={room.type} className="p-6 border-b border-white/20 last:border-b-0">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <div className="font-semibold text-xl text-gradient">
                    {t(`prices.roomTypes.${room.type}.name`)}
                  </div>
                </div>
                <div className="font-bold text-lg mb-4 text-gray-700">
                  {t(`prices.roomTypes.${room.type}.namename`)}
                </div>
                <div className="space-y-2">
                  {room.prices.map((price, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 glass-card rounded-lg hover:shadow-medium transition-all duration-300"
                    >
                      <span className="text-gray-700 font-medium">{price.guests}</span>
                      <div className="text-right">
                        <span className="font-bold text-xl text-gradient">
                          {price.amount}
                        </span>
                        <span className="text-gray-600 ml-1 text-sm">
                          {t("prices.currency")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop version */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="gradient-accent text-white p-6 text-center rounded-tl-xl border-0 w-1/2">
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-5 h-5" />
                      {t("prices.roomType")}
                    </div>
                  </th>
                  <th className="gradient-accent text-white p-6 text-center border-0 w-1/4">
                    {t("prices.guestsCount")}
                  </th>
                  <th className="gradient-accent text-white p-6 text-center rounded-tr-xl border-0 w-1/4">
                    {t("prices.pricePerNight")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <React.Fragment key={room.type}>
                    {room.prices.map((price, priceIndex) => (
                      <tr
                        key={`${room.type}-${priceIndex}`}
                        className="border-b border-gray-200"
                      >
                        {priceIndex === 0 && (
                          <td
                            rowSpan={room.prices.length}
                            className="p-4 border align-middle text-center"
                          >
                            {t(`prices.roomTypes.${room.type}.name`)}
                            <div className="font-bold text-center text-lg mb-13 text-primary-600">
                              {t(`prices.roomTypes.${room.type}.namename`)}
                            </div>
                          </td>
                        )}
                        <td className="p-4 text-center border">
                          {price.guests}
                        </td>
                        <td className="p-4 text-center border">
                          <span className="font-medium">{price.amount}</span>
                          <span className="text-gray-600 ml-1">
                            {t("prices.currency")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-4 sm:px-6 py-4 text-gray-700">
            <div className="flex gap-4 items-start">
              <Info className="w-10 h-6 flex-shrink-0 text-primary-400 mt-1" />
              <div className="space-y-2 text-base">
                <p>
                  {t("prices.additionalInfo.breakfast")}{' '}
                  <span className="font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                    300 {t("prices.currency")}
                  </span>
                </p>
                <p>
                  {t("prices.additionalInfo.amenities")}{' '}
                  <span className="font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                    {t("prices.additionalInfo.amenitiesdetailed")}
                  </span>
                </p>
                <p>
                  {t("prices.additionalInfo.wifi")}{' '}
                  <span className="font-mono font-bold text-primary-600 bg-primary-100 px-3 py-1.5 rounded-md shadow-sm">
                    {t("prices.additionalInfo.wifiname")}
                  </span>
                </p>
                <p>{t("prices.additionalInfo.bedTypes")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-12 text-center transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a
            href="https://booking-universitycentre.otelms.com/booking/rooms/"
            target="_blank"
            className="interactive-button gradient-accent text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-large hover:shadow-neon transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5" />
            {t("booking.title")}
            <Sparkles className="w-5 h-5" />
          </a>
        </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default PriceList;