import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone, Accessibility } from 'lucide-react';
import { cn } from '../utils/ui';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navigationItems = [
    { href: '#info', label: t('nav.info') },
    { href: '#contacts', label: t('nav.contacts') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#prices', label: t('nav.prices') },
    { href: '#location', label: t('nav.location') },
    {
      href: 'https://booking-universitycentre.otelms.com/booking/rooms/',
      target: '_blank',
      rel: 'noopener noreferrer',
      label: t('nav.book'),
      isHighlighted: true,
    },
  ];

  const logoImage = i18n.language === 'en'
    ? 'src/img/logo_en.svg'
    : 'src/img/logo_ua.svg';

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <nav className="flex justify-between items-center py-3">
          {/* Logo */}
          <a href="#" className="relative group">
            <img
              src={logoImage}
              alt="UCU INN Logo"
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className={cn(
                  'px-3 lg:px-4 py-2 text-gray-700 text-sm font-medium rounded-lg transition-all duration-300',
                  item.isHighlighted
                    ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-md transform hover:-translate-y-0.5'
                    : 'hover:text-primary-600 hover:bg-primary-50'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Language & Phone */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 bg-gray-50 p-1 rounded-lg">
              <button
                onClick={() => changeLanguage('en')}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300',
                  i18n.language === 'en'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                )}
              >
                🇺🇸 EN
              </button>
              <button
                onClick={() => changeLanguage('ua')}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300',
                  i18n.language === 'ua'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                )}
              >
                🇺🇦 UA
              </button>
            </div>

            {/* Contact Phone */}
            <a
              href="tel:+380967567206"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300 hover:scale-105"
            >
              <div className="bg-primary-50 p-2 rounded-full">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">096-75-67-206</span>
            </a>

            {/* Accessibility Link */}
            <a
              href="https://forms.gle/CaMuKHii8wsFkQZy9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-all duration-300 hover:scale-110"
              title="Accessibility Service"
            >
              <div className="bg-blue-100 p-3 rounded-full border-2 border-blue-200 shadow-sm hover:shadow-md hover:bg-blue-200 transition-all duration-300">
                <Accessibility className="w-5 h-5 text-blue-700" />
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-100">
          <div className="px-4 py-6 space-y-3">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className={cn(
                  'block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300',
                  item.isHighlighted
                    ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:shadow-lg'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Contact */}
            <a
              href="tel:+380967567206"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="bg-primary-50 p-2 rounded-full">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-medium">096-75-67-206</span>
            </a>

            {/* Mobile Accessibility Link */}
            <a
              href="https://forms.gle/CaMuKHii8wsFkQZy9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-blue-100 rounded-xl transition-all duration-300 border border-blue-200 bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
              title="Accessibility Service"
            >
              <div className="bg-blue-100 p-3 rounded-full border-2 border-blue-200 shadow-sm">
                <Accessibility className="w-6 h-6 text-blue-700" />
              </div>
              <span className="font-semibold text-blue-700">Accessibility Service</span>
            </a>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-around pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  changeLanguage('en');
                  setIsMenuOpen(false);
                }}
                className={cn(
                  'px-6 py-2.5 rounded-xl text-base font-medium transition-all duration-300',
                  i18n.language === 'en'
                    ? 'bg-primary-50 text-primary-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => {
                  changeLanguage('ua');
                  setIsMenuOpen(false);
                }}
                className={cn(
                  'px-6 py-2.5 rounded-xl text-base font-medium transition-all duration-300',
                  i18n.language === 'ua'
                    ? 'bg-primary-50 text-primary-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                🇺🇦 Українська
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
