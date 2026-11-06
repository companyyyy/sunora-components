export const site = {
  name: "Sunora Components",
  legalName: "Sunora components OÜ",
  /** Brand slogan. Stays in Estonian in every locale. */
  slogan: "Tuleviku alternatiivenergia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sunoracomponents.eu",
  email: "info@sunoracomponents.eu",
  phone: "+3728 167 33 99",
  phoneHref: "tel:+37281673399",
  vatId: "EE102779655",
  address: {
    street: "Kadaka tee 17",
    postalCode: "10913",
    city: "Tallinn",
    country: "Estonia",
  },
} as const;
