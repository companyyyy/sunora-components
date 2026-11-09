type Testimonial = {
  /** The partner's own words. Never edit the meaning. */
  quote: string;
  /** Left out when the partner prefers not to be named. */
  name?: string;
  role: string;
  city: string;
};

/**
 * Partner reviews for the home page. The block stays hidden while this list
 * is empty. Add only reviews supplied by the client from real partners.
 */
export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Working with this distributor has been a great experience. They offer a wide range of energy storage solutions and inverters, competitive pricing, and professional support. Their team is responsive and always ready to help us find the right products for our projects.",
    role: "Solar Energy Installer",
    city: "Tallinn, Estonia",
  },
  {
    quote:
      "We value this partnership for its reliability, product availability, and excellent communication. The variety of inverters and battery systems makes it easy to meet different customer needs. A dependable partner for growing our renewable energy business.",
    role: "Managing Director",
    city: "Tartu, Estonia",
  },
  {
    quote:
      "An excellent wholesale partner with a strong selection of inverters, batteries, and energy storage equipment. We appreciate the consistent product quality, flexible cooperation, and fast order processing. Their team understands the needs of the renewable energy market.",
    role: "Wholesale Partner",
    city: "Pärnu, Estonia",
  },
  {
    quote:
      "We have been very satisfied with the cooperation. From product selection to technical assistance, everything is handled professionally. Their wide range of energy solutions helps us deliver reliable systems tailored to our customers' needs.",
    role: "Project Manager",
    city: "Tallinn, Estonia",
  },
];
