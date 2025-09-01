export interface ContactInfo {
  phone: string;
  email: string;
  extension: string;
  facebook: string;
  instagram: string;
}

export interface MessengerLink {
  name: string;
  url: string;
}

export const CONTACT_INFO: ContactInfo = {
  phone: '+380967567206',
  email: 'ucucenter@gmail.com',
  extension: '35-12',
  facebook: 'https://www.facebook.com/ucuinn.guestrooms/',
  instagram: 'https://instagram.com/guestroomsucu/',
};

export const MESSENGER_LINKS: MessengerLink[] = [
  { name: 'Viber', url: 'viber://chat?number=380967567206' },
  { name: 'WhatsApp', url: 'https://api.whatsapp.com/send/?phone=380967567206' },
  { name: 'Telegram', url: 'tg://resolve?domain=contact&phone=+380967567206' },
];
