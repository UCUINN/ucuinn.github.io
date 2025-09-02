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
      className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white"
      aria-label={t('contact.title')}
    >
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-600 mb-12 text-center tracking-tight">
          {t('contact.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-12">
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
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
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

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-primary-600 tracking-tight leading-tight">
              {t('contact.address.title')}
            </h3>
            <address className="text-lg text-gray-800 not-italic leading-relaxed font-medium">
              {t('contact.address.street')}<br />
              {t('contact.address.city')}<br />
              {t('contact.address.country')}, {t('contact.address.postcode')}
            </address>
            <div className="mt-8 text-gray-800">
              <p className="text-lg font-medium">{t('social.regards')}</p>
              <p className="mt-8 text-primary-600 text-xl font-bold tracking-tight leading-snug">
                {t('social.team')}
              </p>
              <p className="text-primary-600 font-semibold mt-3">{t('social.signature')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
