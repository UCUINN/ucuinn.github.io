import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, Facebook, Instagram, MessageCircle, Accessibility } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CONTACT_INFO, MESSENGER_LINKS } from '../config/contact';

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  ariaLabel?: string;
}

const SocialLink = memo(({ href, icon: Icon, children, ariaLabel }: SocialLinkProps) => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || `${children} link`}
      className="flex items-center gap-3 text-gray-800 hover:text-primary-600 bg-primary-50 px-4 py-2 rounded-full transition-transform transform hover:scale-105"
      onClick={(e) => {
        try {
          if (!href) {
            e.preventDefault();
            setIsError(true);
          }
        } catch {
          e.preventDefault();
          setIsError(true);
        }
      }}
    >
      <Icon size={20} aria-hidden="true" />
      <span className="font-medium text-sm tracking-wide leading-6">{children}</span>
    </a>
  );
});

SocialLink.displayName = 'SocialLink';

interface ContactSectionProps {
  title: string;
  children: React.ReactNode;
}

const ContactSection = ({ title, children }: ContactSectionProps) => (
  <div className="space-y-4" role="region" aria-label={title}>
    <h3 className="font-bold text-lg md:text-xl text-gray-900 tracking-tight leading-tight">
      {title}
    </h3>
    {children}
  </div>
);

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="contacts" 
      className="relative py-20 overflow-hidden"
      aria-label={t('contact.title')}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-primary-100/40 to-white" />
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary-300/30 blur-3xl" />
      <div className="absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-700">
            {t('contact.title')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <ContactSection title={t('booking.phone.title')}>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-4 text-gray-800 hover:text-primary-600 transition-transform transform hover:scale-105"
                aria-label={t('booking.phone.call')}
              >
                <div className="bg-primary-100 p-2 rounded-full">
                  <Phone className="text-primary-600 h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-lg font-semibold tracking-wide">{CONTACT_INFO.phone}</span>
              </a>
              <div className="text-gray-500 text-sm font-medium" aria-label={t('booking.phone.extension')}>
                #{t('booking.phone.extension')}
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {MESSENGER_LINKS.map(({ name, url }) => (
                  <SocialLink 
                    key={name} 
              href={url} 
                    icon={MessageCircle}
                    ariaLabel={`${t('contact.messenger.contact')} ${name}`}
                  >
                    {name}
                  </SocialLink>
                ))}
              </div>
            </ContactSection>

            <ContactSection title={t('booking.email.title')}>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 text-gray-800 hover:text-primary-600 transition-transform transform hover:scale-105"
                aria-label={t('booking.email.send')}
              >
                <div className="bg-primary-100 p-2 rounded-full">
                  <Mail className="text-primary-600 h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-base font-medium tracking-wide leading-5">
                  {CONTACT_INFO.email}
                </span>
              </a>
            </ContactSection>

            <ContactSection title={t('social.title')}>
              <div className="flex flex-wrap gap-4">
                <SocialLink href={CONTACT_INFO.facebook} icon={Facebook} ariaLabel={t('social.facebook')}>
                  Facebook
                </SocialLink>
                <SocialLink href={CONTACT_INFO.instagram} icon={Instagram} ariaLabel={t('social.instagram')}>
                  Instagram
                </SocialLink>
              </div>
            </ContactSection>
            <div className="p-6 bg-cream border border-primary-100/50 rounded-2xl shadow-sm flex items-center backdrop-blur-sm">
              <div className="flex items-center gap-3 w-full">
                <div className="bg-blue-100 p-3 rounded-full border-2 border-blue-200 shadow-sm">
                  <Accessibility className="w-5 h-5 text-blue-700" />
                </div>
                <p className="text-gray-800">
                  {t('contact.extraService.textBeforeLink')}{' '}
                  <a
                    href="https://forms.gle/c7hDcvf56s2G1eiQ7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 underline font-semibold"
                  >
                    {t('contact.extraService.linkText')}
                  </a>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-primary-100/50 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 tracking-tight">
              {t('contact.address.title')}
            </h3>
            <address className="text-base text-gray-700 not-italic leading-relaxed font-medium">
              {t('contact.address.street')}<br />
              {t('contact.address.city')}<br />
              {t('contact.address.country')}, {t('contact.address.postcode')}
            </address>
            <div className="mt-8 text-gray-700">
              <p className="text-base font-medium">{t('social.regards')}</p>
              <p className="mt-6 text-primary-700 text-lg font-bold tracking-tight">
                {t('social.team')}
              </p>
              <p className="text-primary-700 font-semibold mt-2">{t('social.signature')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
