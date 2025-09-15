import { useTranslation } from 'react-i18next';
import { Bed, Users, Wifi, Coffee, Star, CheckCircle } from 'lucide-react';
import { useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { GlassCard } from './ui';
import rec9 from '../img/rec9pic.webp';
import rec11 from '../img/rec11pic.webp';

const Room = () => {
  const { t } = useTranslation();
  const { ref, visibleItems } = useStaggeredAnimation(2, 200);

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
      image: rec9

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
      image: rec11

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
    <section id="rooms" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="floating absolute top-20 left-10 w-20 h-20 gradient-accent rounded-full blur-xl"></div>
        <div className="floating absolute bottom-20 right-10 w-32 h-32 gradient-warm rounded-full blur-xl" style={{animationDelay: '2s'}}></div>
        <div className="floating absolute top-1/2 left-1/2 w-16 h-16 gradient-neon rounded-full blur-xl" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            {t('rooms.sectionTitle')}
          </h2>
          <div className="w-24 h-1 gradient-accent mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Discover comfort and elegance in our thoughtfully designed rooms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {rooms.map((room, index) => (
            <div
              key={index}
              className={`group transform transition-all duration-700 ${
                visibleItems[index] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <GlassCard className="rounded-2xl overflow-hidden shadow-large hover:shadow-neon transition-all duration-500 bg-white/80 backdrop-blur-lg border border-white/30">
                <div className="relative overflow-hidden">
                  <img
                    src={room.image}
                    alt={t(room.titleKey)}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-white">Premium</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-3xl font-bold text-gray-800 group-hover:text-gradient transition-all duration-300">
                      {t(room.titleKey)}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient">
                        {t(room.priceKey)}
                      </div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {t(room.descriptionKey)}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {room.amenities.map((amenityKey, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700 group/amenity">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover/amenity:scale-110 transition-transform duration-300">
                          {getIcon(amenityKey)}
                        </div>
                        <span className="font-medium">{t(amenityKey)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href="https://booking-universitycentre.otelms.com/booking/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('rooms.bookNow')}
                      className="flex-1 interactive-button gradient-accent text-white px-6 py-4 rounded-xl font-semibold text-center hover:shadow-neon transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>{t('rooms.bookNow')}</span>
                      </div>
                    </a>
                    <button className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-gray-600 hover:text-primary-600 transition-all duration-300 wiggle-on-hover">
                      <Bed className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Room;