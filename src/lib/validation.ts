import { z } from 'zod';

// Address Schema
export const AddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
});

// Business Hours Schema
export const BusinessHoursSchema = z.object({
    monday: z.string(),
    tuesday: z.string(),
    wednesday: z.string(),
    thursday: z.string(),
    friday: z.string(),
    saturday: z.string(),
    sunday: z.string(),
    emergency: z.string(),
});

// Social Links Schema
export const SocialLinksSchema = z.object({
    facebook: z.string(),
    instagram: z.string(),
    linkedin: z.string(),
});

// Business Info Schema
export const BusinessInfoSchema = z.object({
    name: z.string(),
    shortNameLine1: z.string(),
    shortNameLine2: z.string(),
    tagline: z.string(),
    description: z.string(),
    established: z.string(),
    license: z.string(),
    insured: z.boolean(),
    emergency24_7: z.boolean(),
});

// Contact Info Schema
export const ContactInfoSchema = z.object({
    phone: z.string(),
    phoneRaw: z.string(),
    email: z.string().email(),
    address: AddressSchema,
    hours: BusinessHoursSchema,
    social: SocialLinksSchema,
});

// Hero Badge Schema
export const HeroBadgeSchema = z.object({
    text: z.string(),
    icon: z.string(),
});

// Hero Section Schema
export const HeroSectionSchema = z.object({
    headline: z.string(),
    subheadline: z.string(),
    ctaPrimary: z.string(),
    ctaSecondary: z.string(),
    backgroundImage: z.string(),
    badges: z.array(HeroBadgeSchema),
});

// Emergency Banner Schema
export const EmergencyBannerSchema = z.object({
    text: z.string(),
    phone: z.string(),
    backgroundColor: z.string(),
});

// Service Schema
export const ServiceSchema = z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    shortDescription: z.string(),
    fullDescription: z.string(),
    features: z.array(z.string()),
    image: z.string(),
});

// Why Choose Us Item Schema
export const WhyChooseUsItemSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    stat: z.string(),
});

// Service Areas Schema
export const ServiceAreasSchema = z.object({
    mainArea: z.string(),
    description: z.string(),
    cities: z.array(z.string()),
    zipCodes: z.array(z.string()),
});

// Testimonial Schema
export const TestimonialSchema = z.object({
    id: z.number(),
    name: z.string(),
    location: z.string(),
    rating: z.number().min(1).max(5),
    date: z.string(),
    text: z.string(),
    service: z.string(),
    avatar: z.string(),
});

// Team Info Schema
export const TeamInfoSchema = z.object({
    description: z.string(),
    size: z.string(),
});

// About Section Schema
export const AboutSectionSchema = z.object({
    headline: z.string(),
    story: z.string(),
    mission: z.string(),
    values: z.array(z.string()),
    certifications: z.array(z.string()),
    team: TeamInfoSchema,
});

// Process Step Schema
export const ProcessStepSchema = z.object({
    step: z.number(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
});

// Promotion Schema
export const PromotionSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    code: z.string(),
    terms: z.string(),
    expiration: z.string().nullable(),
    active: z.boolean(),
});

// FAQ Schema
export const FAQSchema = z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
});

// SEO Meta Schema
export const SEOMetaSchema = z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
});

// Geo Coordinates Schema
export const GeoCoordinatesSchema = z.object({
    '@type': z.string(),
    latitude: z.string(),
    longitude: z.string(),
});

// Postal Address Schema (for Schema.org)
export const PostalAddressSchema = z.object({
    '@type': z.string(),
    streetAddress: z.string(),
    addressLocality: z.string(),
    addressRegion: z.string(),
    postalCode: z.string(),
    addressCountry: z.string(),
});

// Opening Hours Specification Schema
export const OpeningHoursSpecificationSchema = z.object({
    '@type': z.string(),
    dayOfWeek: z.union([z.string(), z.array(z.string())]),
    opens: z.string(),
    closes: z.string(),
});

// Schema.org Schema
export const SchemaOrgSchema = z.object({
    '@context': z.string(),
    '@type': z.string(),
    name: z.string(),
    image: z.string(),
    telephone: z.string(),
    email: z.string(),
    address: PostalAddressSchema,
    geo: GeoCoordinatesSchema,
    priceRange: z.string(),
    openingHoursSpecification: z.array(OpeningHoursSpecificationSchema),
    areaServed: z.string(),
});

// SEO Data Schema
export const SEODataSchema = z.object({
    meta: SEOMetaSchema,
    schema: SchemaOrgSchema,
});

// Call to Action Schema
export const CallToActionSchema = z.object({
    text: z.string(),
    action: z.string(),
});

// Call to Actions Schema
export const CallToActionsSchema = z.object({
    primary: CallToActionSchema,
    secondary: CallToActionSchema,
    emergency: CallToActionSchema,
});

// Complete Site Data Schema
export const SiteDataSchema = z.object({
    businessInfo: BusinessInfoSchema,
    contact: ContactInfoSchema,
    hero: HeroSectionSchema,
    emergencyBanner: EmergencyBannerSchema,
    services: z.array(ServiceSchema),
    whyChooseUs: z.array(WhyChooseUsItemSchema),
    serviceAreas: ServiceAreasSchema,
    testimonials: z.array(TestimonialSchema),
    about: AboutSectionSchema,
    process: z.array(ProcessStepSchema),
    promotions: z.array(PromotionSchema),
    faq: z.array(FAQSchema),
    seo: SEODataSchema,
    callToActions: CallToActionsSchema,
});

// Type inference
export type ValidatedSiteData = z.infer<typeof SiteDataSchema>;

/**
 * Validate site data against schema
 */
export function validateSiteData(data: unknown): ValidatedSiteData {
    return SiteDataSchema.parse(data);
}

/**
 * Safe validation with error handling
 */
export function safeParseSiteData(data: unknown): { success: true; data: ValidatedSiteData } | { success: false; error: z.ZodError } {
    const result = SiteDataSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error };
}
