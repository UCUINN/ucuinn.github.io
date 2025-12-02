import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, MessageSquare, Accessibility, Facebook, Instagram } from 'lucide-react';
import { CONTACT_INFO, MESSENGER_LINKS } from '../config/contact';

// Messenger icons (outline style)
const ViberIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3c4.97 0 9 3.185 9 7.5 0 2.67-1.5 5.03-3.84 6.54l.84 3.96-4.2-2.1c-.6.06-1.2.1-1.8.1-4.97 0-9-3.185-9-7.5S7.03 3 12 3z"/>
    <path d="M9.5 8.5c0-.5.5-1 1-1h3c.5 0 1 .5 1 1v3c0 .5-.5 1-1 1h-3c-.5 0-1-.5-1-1v-3z" strokeLinecap="round"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm0 0a5 5 0 0 0 5 5m0 0a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const messengerIcons: Record<string, React.FC> = {
  Viber: ViberIcon,
  WhatsApp: WhatsAppIcon,
  Telegram: TelegramIcon,
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="contacts" 
      className="py-16 bg-gray-50"
      aria-label={t('contact.title')}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-12">
          {t('contact.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            {/* Phone */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">{t('booking.phone.title')}</p>
              <a 
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-lg font-medium">{CONTACT_INFO.phone}</span>
              </a>
              <p className="text-sm text-gray-500 mt-1 ml-7">#{t('booking.phone.extension')}</p>
              
              {/* Reception info */}
              <div className="flex flex-wrap gap-4 mt-3 ml-7 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {t('contact.receptionHours')}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {t('contact.responseTime')}
                </span>
              </div>

              {/* Messengers */}
              <div className="flex flex-wrap gap-2 mt-4 ml-7">
                {MESSENGER_LINKS.map(({ name, url }) => {
                  const Icon = messengerIcons[name];
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {Icon && <Icon />}
                      {name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">{t('booking.email.title')}</p>
              <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{CONTACT_INFO.email}</span>
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">{t('social.title')}</p>
              <div className="flex gap-3 ml-7">
                <a
                  href={CONTACT_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
                <span className="text-gray-300">·</span>
                <a
                  href={CONTACT_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </div>

            {/* Accessibility */}
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Accessibility className="w-5 h-5 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-600">
                  {t('contact.extraService.textBeforeLink')}{' '}
                  <a
                    href="https://forms.gle/c7hDcvf56s2G1eiQ7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 underline"
                  >
                    {t('contact.extraService.linkText')}
                  </a>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Address */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-medium">{t('contact.address.title')}</p>
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <address className="text-gray-900 not-italic leading-relaxed">
                {t('contact.address.street')}<br />
                {t('contact.address.city')}<br />
                {t('contact.address.country')}, {t('contact.address.postcode')}
              </address>
            </div>
            
            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">{t('social.regards')}</p>
              <p className="text-gray-900 font-medium mt-2">{t('social.team')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('social.signature')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
