import React from "react";
import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";

interface RoomPriceInfo {
  type: string;
  prices: {
    guests: string;
    amount: number;
  }[];
}

const PriceList = () => {
  const { t } = useTranslation();

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
        { guests: t("prices.twoGuests"), amount: 2200 },
        { guests: t("prices.threeGuests"), amount: 2500 },
      ],
    },
  ];

  return (
    <section id="prices" className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary-600 mb-6">
          {t("prices.title")}
        </h2>

        <div className="bg-[#fafaf2] rounded-lg shadow-md">
          {/* Mobile version */}
          <div className="block md:hidden">
            {rooms.map((room) => (
              <div key={room.type} className="p-4 border-b">
                <div className="font-medium text-lg mb-3 text-primary-600">
                  {t(`prices.roomTypes.${room.type}.name`)}
                </div>
                <div className="font-bold text-lg mb-3 text-primary-600">
                  {t(`prices.roomTypes.${room.type}.namename`)}
                </div>
                <div className="space-y-2">
                  {room.prices.map((price, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{price.guests}</span>
                      <span className="font-medium">
                        {price.amount} {t("prices.currency")}
                      </span>
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
                  <th className="bg-primary-600 text-white p-4 text-center border border-primary-600 w-1/2">
                    {t("prices.roomType")}
                  </th>
                  <th className="bg-primary-600 text-white p-4 text-center border border-primary-600 w-1/4">
                    {t("prices.guestsCount")}
                  </th>
                  <th className="bg-primary-600 text-white p-4 text-center border border-primary-600 w-1/4">
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

        <div className="mt-8 text-center">
          <a
            href="#book"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            {t("booking.title")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PriceList;