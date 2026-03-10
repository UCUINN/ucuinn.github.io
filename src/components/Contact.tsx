import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, MessageSquare, Accessibility } from 'lucide-react';
import { FaViber, FaWhatsapp, FaTelegram, FaFacebook, FaInstagram } from 'react-icons/fa';
import { CONTACT_INFO, MESSENGER_LINKS } from '../config/contact';

const messengerIcons: Record<string, React.FC<{className?: string}>> = {
  Viber: FaViber,
  WhatsApp: FaWhatsapp,
  Telegram: FaTelegram,
};

const Contact = () => {
  const { t } = useTranslation();

  const brandColors: Record<string, string> = {
    Viber: '#7360F2',
    WhatsApp: '#25D366',
    Telegram: '#0088CC',
  };

  return (
    <section 
      id="contacts" 
      className="py-24 bg-[#f5f5f7]"
      aria-label={t('contact.title')}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center tracking-tight">
          {t('contact.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {/* Card — Phone & Messengers */}
          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.12em] font-semibold mb-4">{t('booking.phone.title')}</p>
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="group flex items-center gap-3"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50">
                <Phone className="w-4 h-4 text-blue-500" />
              </span>
              <span className="text-xl font-semibold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">{CONTACT_INFO.phone}</span>
            </a>
            <p className="text-sm text-gray-400 mt-1 ml-11">#{t('booking.phone.extension')}</p>
            
            <div className="flex flex-col gap-1 mt-3 ml-11 text-[13px] text-gray-500">
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-300" />
                {t('contact.receptionHours')}
              </span>
              <span className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-gray-300" />
                {t('contact.responseTime')}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {MESSENGER_LINKS.map(({ name, url }) => {
                const Icon = messengerIcons[name];
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-gray-600 bg-gray-100 rounded-full transition-all duration-200 hover:text-white hover:shadow-md active:scale-95"
                    style={{ '--brand-color': brandColors[name] } as React.CSSProperties}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = brandColors[name])}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; }}
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Card — Address */}
          <div className="bg-white rounded-2xl p-7 shadow-sm flex flex-col">
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.12em] font-semibold mb-4">{t('contact.address.title')}</p>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 shrink-0">
                <MapPin className="w-4 h-4 text-red-400" />
              </span>
              <address className="text-gray-900 not-italic leading-relaxed font-medium">
                {t('contact.address.street')}<br />
                {t('contact.address.city')}<br />
                {t('contact.address.country')}, {t('contact.address.postcode')}
              </address>
            </div>
            
            <div className="mt-auto pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 leading-relaxed">{t('social.regards')}</p>
              <p className="text-gray-900 font-semibold mt-1">{t('social.team')}</p>
              <p className="text-[13px] text-gray-400 mt-0.5">{t('social.signature')}</p>
            </div>
          </div>

          {/* Card — Email */}
          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.12em] font-semibold mb-4">{t('booking.email.title')}</p>
            <a 
              href={`mailto:${CONTACT_INFO.email}`}
              className="group flex items-center gap-3"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
                <Mail className="w-4 h-4 text-red-400" />
              </span>
              <span className="font-semibold text-gray-900 group-hover:text-red-500 transition-colors">{CONTACT_INFO.email}</span>
            </a>
          </div>

          {/* Card — Social */}
          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.12em] font-semibold mb-4">{t('social.title')}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-gray-600 bg-gray-100 rounded-full transition-all duration-200 hover:text-white hover:shadow-md active:scale-95"
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1877F2')}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; }}
              >
                <FaFacebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-gray-600 bg-gray-100 rounded-full transition-all duration-200 hover:text-white hover:shadow-md active:scale-95"
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E4405F')}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; }}
              >
                <FaInstagram className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Accessibility — full width, subtle */}
        <div className="mt-6 bg-white rounded-2xl px-7 py-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 shrink-0">
              <Accessibility className="w-4 h-4 text-gray-400" />
            </span>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              {t('contact.extraService.textBeforeLink')}{' '}
              <a
                href="https://forms.gle/c7hDcvf56s2G1eiQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 font-medium underline underline-offset-2 decoration-gray-300 hover:decoration-gray-900 transition-colors"
              >
                {t('contact.extraService.linkText')}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
