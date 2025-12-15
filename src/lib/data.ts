import { promises as fs } from 'fs';
import path from 'path';
import type {
    SiteData,
    BusinessInfo,
    ContactInfo,
    HeroSection,
    EmergencyBanner,
    Service,
    WhyChooseUsItem,
    ServiceAreas,
    Testimonial,
    AboutSection,
    ProcessStep,
    Promotion,
    FAQ,
    SEOData,
    CallToActions,
} from '@/types';
import { validateSiteData } from './validation';

// Cache for data
let cachedData: SiteData | null = null;

/**
 * Load and validate data from data.json
 */
export async function getData(): Promise<SiteData> {
    if (cachedData) {
        return cachedData;
    }

    try {
        const filePath = path.join(process.cwd(), 'data.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const rawData = JSON.parse(fileContent);

        // Validate data against schema
        const validatedData = validateSiteData(rawData);
        cachedData = validatedData;

        return validatedData;
    } catch (error) {
        console.error('Error loading data.json:', error);
        throw new Error('Failed to load site data');
    }
}

/**
 * Get business information
 */
export async function getBusinessInfo(): Promise<BusinessInfo> {
    const data = await getData();
    return data.businessInfo;
}

/**
 * Get contact information
 */
export async function getContactInfo(): Promise<ContactInfo> {
    const data = await getData();
    return data.contact;
}

/**
 * Get hero section data
 */
export async function getHeroData(): Promise<HeroSection> {
    const data = await getData();
    return data.hero;
}

/**
 * Get emergency banner data
 */
export async function getEmergencyBanner(): Promise<EmergencyBanner> {
    const data = await getData();
    return data.emergencyBanner;
}

/**
 * Get all services
 */
export async function getServices(): Promise<Service[]> {
    const data = await getData();
    return data.services;
}

/**
 * Get a single service by ID
 */
export async function getServiceById(id: string): Promise<Service | undefined> {
    const services = await getServices();
    return services.find((service) => service.id === id);
}

/**
 * Get why choose us items
 */
export async function getWhyChooseUs(): Promise<WhyChooseUsItem[]> {
    const data = await getData();
    return data.whyChooseUs;
}

/**
 * Get service areas
 */
export async function getServiceAreas(): Promise<ServiceAreas> {
    const data = await getData();
    return data.serviceAreas;
}

/**
 * Get all testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
    const data = await getData();
    return data.testimonials;
}

/**
 * Get about section data
 */
export async function getAboutData(): Promise<AboutSection> {
    const data = await getData();
    return data.about;
}

/**
 * Get process steps
 */
export async function getProcessSteps(): Promise<ProcessStep[]> {
    const data = await getData();
    return data.process;
}

/**
 * Get all promotions
 */
export async function getPromotions(): Promise<Promotion[]> {
    const data = await getData();
    return data.promotions;
}

/**
 * Get active promotions only
 */
export async function getActivePromotions(): Promise<Promotion[]> {
    const promotions = await getPromotions();
    const now = new Date();

    return promotions.filter((promo) => {
        if (!promo.active) return false;
        if (promo.expiration) {
            return new Date(promo.expiration) > now;
        }
        return true;
    });
}

/**
 * Get all FAQs
 */
export async function getFAQs(): Promise<FAQ[]> {
    const data = await getData();
    return data.faq;
}

/**
 * Get FAQs grouped by category
 */
export async function getFAQsByCategory(): Promise<Record<string, FAQ[]>> {
    const faqs = await getFAQs();

    return faqs.reduce((acc, faq) => {
        if (!acc[faq.category]) {
            acc[faq.category] = [];
        }
        acc[faq.category].push(faq);
        return acc;
    }, {} as Record<string, FAQ[]>);
}

/**
 * Get SEO data
 */
export async function getSEOData(): Promise<SEOData> {
    const data = await getData();
    return data.seo;
}

/**
 * Get call to actions
 */
export async function getCallToActions(): Promise<CallToActions> {
    const data = await getData();
    return data.callToActions;
}

/**
 * Check if a zip code is in service area
 */
export async function isZipCodeServiced(zipCode: string): Promise<boolean> {
    const serviceAreas = await getServiceAreas();
    return serviceAreas.zipCodes.includes(zipCode);
}
