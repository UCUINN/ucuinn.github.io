import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import faq from '../utils/faq_data.json';

type FaqItem = { q: string; a: string; category: 'booking_payment' | 'rooms_amenities' | 'onsite_services' | 'house_rules' };
type FaqData = { ua: FaqItem[]; en: FaqItem[] };

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
      clipRule="evenodd"
    />
  </svg>
);

const renderAnswer = (answer: string) => {
  const lines = answer.split('\n');

  // Patterns
  const urlWithProto = /https?:\/\/[^\s]+/i;
  const urlDomainOnly = /(?:www\.)?[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(?:\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?/i;
  const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i;
  // Phone: sequences like "+380 63 265 93 92" or "+1 (234) 567-8901"
  const phonePattern = /\+?\d[\d\s().-]{6,}\d/; // at least 8 digits incl spaces

  const combined = new RegExp(
    `(${urlWithProto.source})|(${emailPattern.source})|(${phonePattern.source})|(${urlDomainOnly.source})`,
    'gi'
  );

  const linkClass = 'text-blue-600 hover:underline';

  const linkify = (text: string) => {
    const nodes: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = combined.exec(text)) !== null) {
      const m = match[0];
      const start = match.index;
      const end = start + m.length;
      if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

      // Determine type
      const isUrlWithProto = urlWithProto.test(m);
      const isEmail = emailPattern.test(m);
      const isPhone = phonePattern.test(m);
      const isDomainOnly = !isUrlWithProto && !isEmail && !isPhone && urlDomainOnly.test(m);

      if (isUrlWithProto || isDomainOnly) {
        const href = isUrlWithProto ? m : `https://${m}`;
        nodes.push(
          <a key={`${start}-url`} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {m}
          </a>
        );
      } else if (isEmail) {
        nodes.push(
          <a key={`${start}-email`} href={`mailto:${m}`} className={linkClass}>
            {m}
          </a>
        );
      } else if (isPhone) {
        const tel = m.replace(/[\s().-]+/g, '');
        nodes.push(
          <a key={`${start}-tel`} href={`tel:${tel}`} className={linkClass}>
            {m}
          </a>
        );
      } else {
        nodes.push(m);
      }
      lastIndex = end;
    }
    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
  };

  return lines.map((line, idx) => (
    <div key={idx}>{linkify(line)}</div>
  ));
};

function FAQ() {
  const { t, i18n } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const langKey = useMemo(() => (i18n.language?.startsWith('en') ? 'en' : 'ua'), [i18n.language]) as keyof FaqData;
  const items = (faq as FaqData)[langKey] || [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q));
  }, [items, query]);

  const categoryOrder: FaqItem['category'][] = [
    'booking_payment',
    'rooms_amenities',
    'onsite_services',
    'house_rules',
  ];

  return (
    <section id="faq" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-primary-50/30 to-white" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-700">
            {t('faq.title', langKey === 'en' ? { defaultValue: 'F.A.Q' } : { defaultValue: 'F.A.Q' })}
          </h2>
          <p className="mt-4 text-base text-gray-700 font-medium">
            {t(
              'faq.subtitle',
              langKey === 'en'
                ? { defaultValue: 'Answers to common questions about UCU INN' }
                : { defaultValue: 'Відповіді на поширені запитання про UCU INN' }
            )}
          </p>
        </div>

        <div className="mb-8">
          <label htmlFor="faq-search" className="sr-only">
            {t('faq.searchLabel', langKey === 'en' ? { defaultValue: 'Search FAQ' } : { defaultValue: 'Пошук по FAQ' })}
          </label>
          <div className="relative">
            <input
              id="faq-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-primary-100/50 bg-white/90 backdrop-blur-sm px-4 py-3 pr-10 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
              placeholder={t(
                'faq.searchPlaceholder',
                langKey === 'en' ? { defaultValue: 'Type to filter questions...' } : { defaultValue: 'Введіть запит для фільтру...' }
              )}
            />
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a7 7 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM14 9a5 5 0 11-10 0 5 5 0 0110 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {categoryOrder.map((catKey) => {
          const group = filtered.filter((it) => it.category === catKey);
          if (group.length === 0) return null;
          return (
            <div key={catKey} className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-primary-700 mb-4">
                {t(`faq.categories.${catKey}`)}
              </h3>
              <div className="divide-y divide-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-primary-100/50">
                {group.map((item) => {
                  const open = openId === item.q;
                  return (
                    <div key={item.q} className="group">
                      <button
                        onClick={() => setOpenId(open ? null : item.q)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-primary-50/60 transition-colors"
                        aria-expanded={open}
                      >
                        <span className="text-base md:text-lg font-semibold text-gray-900">
                          {item.q}
                        </span>
                        <span className="text-primary-600 group-hover:text-primary-700">
                          <Chevron open={open} />
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="px-5 pb-5 pt-0 text-gray-700 leading-relaxed">
                          {renderAnswer(item.a)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="mt-4 text-center text-gray-500">
            {t(
              'faq.noResults',
              langKey === 'en' ? { defaultValue: 'No results. Try another query.' } : { defaultValue: 'Нічого не знайдено. Спробуйте змінити запит.' }
            )}
          </p>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          {t(
            'faq.note',
            langKey === 'en'
              ? { defaultValue: 'Didn’t find an answer? Contact us — we’re happy to help.' }
              : { defaultValue: 'Не знайшли відповіді? Напишіть нам — із радістю допоможемо.' }
          )}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
