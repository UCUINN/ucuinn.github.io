import { useTranslation } from 'react-i18next';
import { Bed, Users, Wifi, Coffee } from 'lucide-react';

const Room = () => {
  const { t } = useTranslation();

  const rooms = [
    {
      titleKey: "rooms.twin.title",
      descriptionKey: "rooms.twin.description",
      priceKey: "rooms.twin.price",
      amenities: [
        "rooms.amenities.twoPersons",
        "rooms.amenities.wifi",
        "rooms.amenities.bathroom"
      ],
      image: "src/img/rec9pic.webp"
    },
    {
      titleKey: "rooms.semiLuxury.title",
      descriptionKey: "rooms.semiLuxury.description",
      priceKey: "rooms.semiLuxury.price",
      amenities: [
        "rooms.amenities.fourPersons",
        "rooms.amenities.wifi",
        "rooms.amenities.bathroom"
      ],
      image: "src/img/rec11pic.webp"
    }
  ];

  const getIcon = (amenityKey: string) => {
    switch (amenityKey) {
      case "rooms.amenities.twoPersons":
        return <Users className="w-4 h-4" />;
      case "rooms.amenities.fourPersons":
        return <Users className="w-4 h-4" />;
      case "rooms.amenities.wifi":
        return <Wifi className="w-4 h-4" />;
      case "rooms.amenities.breakfast":
        return <Coffee className="w-4 h-4" />;
      case "rooms.amenities.bathroom":
        return <Bed className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary-600">
          {t('rooms.sectionTitle')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {rooms.map((room, index) => (
            <div 
              key={index} 
              style={{ backgroundColor: '#f8fafc' }}
              className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={room.image}
                alt={t(room.titleKey)}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {t(room.titleKey)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t(room.descriptionKey)}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  {room.amenities.map((amenityKey, i) => (
                    <div key={i} className="flex items-center gap-1 text-gray-600">
                      {getIcon(amenityKey)}
                      <span className="text-sm">{t(amenityKey)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary-600">
                    {t(room.priceKey)}
                  </span>
                  <a href="https://booking-universitycentre.otelms.com/booking/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300">
                  ✓ {t('rooms.bookNow')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Room;