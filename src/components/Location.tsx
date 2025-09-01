import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';

const Location = () => {
  const { t, i18n } = useTranslation();
  const entranceImage = i18n.language === 'en' 
    ? "src/img/entracy.webp" 
    : "src/img/entracy_ukr.webp";

  return (
    <>
      <section id="info" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-primary-600 mb-12 text-center">
            {t('info.findUs')}
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-xl  border-gray-100">
                <img loading="lazy"
                  src={entranceImage}
                  alt={t('info.findUs')}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg text-gray-700 bg-gray-50 p-6 rounded-lg border-gray-100">
                {t('info.description.welcome')}{' '}
                <span className="font-bold text-primary-600">UCU Inn</span>{' '}
                — {t('info.description.location')}
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl  border-gray-100">
              <h3 className="font-semibold text-2xl text-gray-800 mb-6">
                {t('info.description.whyChoose')}
              </h3>
              <ul className="space-y-6">
                {['amenities', 'comfort', 'dining', 'activities'].map((item) => (
                  <li key={item} className="flex gap-4">
                    <div className="w-1 flex-shrink-0 bg-primary-600 rounded-full"></div>
                    <div>
                      <p className="font-bold text-primary-600 mb-1">
                        {t(`info.description.${item}.title`)}
                      </p>
                      <p className="text-gray-700">
                        {t(`info.description.${item}.text`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-primary-600 mb-4">
              {t('info.location.title')}
            </h3>
            <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6 text-primary-600" />
              {t('info.location.address')}
            </p>
            <p className="text-base text-gray-600 mt-2">
              {t('info.location.reception')}
            </p>
          </div>

          <div className="w-full aspect-video rounded-xl overflow-hidden border-4 border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5779.116598308234!2d24.021067014566256!3d49.81795401511609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae7f32dff0929%3A0xb5c40308a4d0d108!2z0JPQvtGB0YLRjNC-0LLRliDQutGW0LzQvdCw0YLQuCDQmtC-0LvQtdKR0ZbRg9C80YMg0KPQmtCj!5e0!3m2!1suk!2sua!4v1712334211072!5m2!1suk!2sua"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="UCU INN Location"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;