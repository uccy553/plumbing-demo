// Business Information
export interface BusinessInfo {
    name: string;
    tagline: string;
    description: string;
    established: string;
    license: string;
    insured: boolean;
    emergency24_7: boolean;
}

// Contact Information
export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface BusinessHours {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    emergency: string;
}

export interface SocialLinks {
    facebook: string;
    instagram: string;
    linkedin: string;
}

export interface ContactInfo {
    phone: string;
    phoneRaw: string;
    email: string;
    address: Address;
    hours: BusinessHours;
    social: SocialLinks;
}

// Hero Section
export interface HeroBadge {
    text: string;
    icon: string;
}

export interface HeroSection {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    backgroundImage: string;
    badges: HeroBadge[];
}

// Emergency Banner
export interface EmergencyBanner {
    text: string;
    phone: string;
    backgroundColor: string;
}

// Services
export interface Service {
    id: string;
    name: string;
    icon: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    image: string;
}

// Why Choose Us
export interface WhyChooseUsItem {
    title: string;
    description: string;
    icon: string;
    stat: string;
}

// Service Areas
export interface ServiceAreas {
    mainArea: string;
    description: string;
    cities: string[];
    zipCodes: string[];
}

// Testimonials
export interface Testimonial {
    id: number;
    name: string;
    location: string;
    rating: number;
    date: string;
    text: string;
    service: string;
    avatar: string;
}

// About Section
export interface TeamInfo {
    description: string;
    size: string;
}

export interface AboutSection {
    headline: string;
    story: string;
    mission: string;
    values: string[];
    certifications: string[];
    team: TeamInfo;
}

// Process Steps
export interface ProcessStep {
    step: number;
    title: string;
    description: string;
    icon: string;
}

// Promotions
export interface Promotion {
    id: string;
    title: string;
    description: string;
    code: string;
    terms: string;
    expiration: string | null;
    active: boolean;
}

// FAQ
export interface FAQ {
    question: string;
    answer: string;
    category: string;
}

// SEO
export interface SEOMeta {
    title: string;
    description: string;
    keywords: string;
}

export interface GeoCoordinates {
    '@type': string;
    latitude: string;
    longitude: string;
}

export interface PostalAddress {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
}

export interface OpeningHoursSpecification {
    '@type': string;
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
}

export interface SchemaOrg {
    '@context': string;
    '@type': string;
    name: string;
    image: string;
    telephone: string;
    email: string;
    address: PostalAddress;
    geo: GeoCoordinates;
    priceRange: string;
    openingHoursSpecification: OpeningHoursSpecification[];
    areaServed: string;
}

export interface SEOData {
    meta: SEOMeta;
    schema: SchemaOrg;
}

// Call to Actions
export interface CallToAction {
    text: string;
    action: string;
}

export interface CallToActions {
    primary: CallToAction;
    secondary: CallToAction;
    emergency: CallToAction;
}

// Complete Data Structure
export interface SiteData {
    businessInfo: BusinessInfo;
    contact: ContactInfo;
    hero: HeroSection;
    emergencyBanner: EmergencyBanner;
    services: Service[];
    whyChooseUs: WhyChooseUsItem[];
    serviceAreas: ServiceAreas;
    testimonials: Testimonial[];
    about: AboutSection;
    process: ProcessStep[];
    promotions: Promotion[];
    faq: FAQ[];
    seo: SEOData;
    callToActions: CallToActions;
}

// Icon mapping type for Lucide
export type IconName =
    | 'shield'
    | 'clock'
    | 'dollar'
    | 'location'
    | 'wrench-alert'
    | 'drain'
    | 'water-heater'
    | 'droplet-search'
    | 'pipe'
    | 'sink'
    | 'building'
    | 'checklist'
    | 'shield-check'
    | 'receipt'
    | 'clock-fast'
    | 'award'
    | 'user-check'
    | 'map-pin'
    | 'phone'
    | 'truck'
    | 'clipboard'
    | 'wrench'
    | 'check-circle';
