export interface Room {
  type: string;
  priceOneGuest: number;
  priceTwoGuests: number;
  priceThreeGuests?: number;
}

export interface Contact {
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
}
