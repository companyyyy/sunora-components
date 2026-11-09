type Testimonial = {
  /** The partner's own words. Never edit the meaning. */
  quote: string;
  name: string;
  role: string;
  company: string;
  city: string;
};

/**
 * Partner reviews for the home page. The block stays hidden while this list
 * is empty. Add only real reviews from partners who agreed to be quoted:
 *
 *   {
 *     quote: "…",
 *     name: "…",
 *     role: "…",
 *     company: "…",
 *     city: "…",
 *   },
 */
// TODO: Add the reviews the client is collecting.
export const testimonials: readonly Testimonial[] = [];
