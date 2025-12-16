'use client';

import Link from 'next/link';
import {
    ArrowLeft,
    CheckCircle,
    Phone,
    Wrench,
    Droplet,
    Flame,
    Search,
    PipetteIcon,
    Bath,
    Building2,
    ClipboardList
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { FadeInView } from '@/components/animations/FadeInView';
import { SlideInView } from '@/components/animations/SlideInView';
import { cn } from '@/lib/utils';
import type { SiteData, Service } from '@/types';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'wrench-alert': Wrench,
    'drain': Droplet,
    'water-heater': Flame,
    'droplet-search': Search,
    'pipe': PipetteIcon,
    'sink': Bath,
    'building': Building2,
    'checklist': ClipboardList,
};

interface ServicePageClientProps {
    data: SiteData;
    service: Service;
}

export function ServicePageClient({ data, service }: ServicePageClientProps) {
    const Icon = iconMap[service.icon] || Wrench;

    // Get related services (excluding current)
    const relatedServices = data.services
        .filter((s) => s.id !== service.id)
        .slice(0, 3);

    return (
        <>
            <Header
                contact={data.contact}
                services={data.services}
                emergencyBanner={data.emergencyBanner}
                businessInfo={data.businessInfo}
            />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-hero py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        {/* Breadcrumbs */}
                        <FadeInView>
                            <nav className="flex items-center gap-2 text-primary-200 text-sm mb-8">
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                                <span>/</span>
                                <Link href="/#services" className="hover:text-white transition-colors">
                                    Services
                                </Link>
                                <span>/</span>
                                <span className="text-white">{service.name}</span>
                            </nav>
                        </FadeInView>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Content */}
                            <FadeInView>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
                                        <Icon size={32} className="text-secondary-400" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
                                        {service.name}
                                    </h1>
                                </div>

                                <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                                    {service.shortDescription}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={() => {
                                            window.location.href = '#contact-form';
                                        }}
                                    >
                                        Schedule This Service
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        leftIcon={<Phone size={18} />}
                                        onClick={() => {
                                            window.location.href = `tel:${data.contact.phoneRaw}`;
                                        }}
                                        className="border-white text-white hover:bg-white hover:text-primary-900"
                                    >
                                        {data.contact.phone}
                                    </Button>
                                </div>
                            </FadeInView>

                            {/* Features Card */}
                            <SlideInView direction="right">
                                <Card className="bg-white/10 backdrop-blur border border-white/20" hover={false}>
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-heading font-bold text-white mb-4">
                                            Service Highlights
                                        </h3>
                                        <ul className="space-y-3">
                                            {service.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-3 text-primary-100">
                                                    <CheckCircle size={18} className="text-secondary-400 shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </SlideInView>
                        </div>
                    </div>
                </section>

                {/* Detailed Description */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <FadeInView>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-900 mb-6">
                                    About This Service
                                </h2>
                                <div className="prose prose-lg max-w-none text-neutral-600">
                                    <p className="leading-relaxed">{service.fullDescription}</p>
                                </div>
                            </FadeInView>

                            {/* CTA Box */}
                            <FadeInView delay={0.2}>
                                <div className="mt-12 p-8 bg-primary-50 rounded-2xl border-l-4 border-secondary-500">
                                    <h3 className="text-xl font-heading font-bold text-primary-900 mb-2">
                                        Need {service.name}?
                                    </h3>
                                    <p className="text-neutral-600 mb-4">
                                        Our expert technicians are ready to help. Contact us today for fast, reliable service.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href="/#contact-form">
                                            <Button variant="primary" size="md">
                                                Get a Free Quote
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="md"
                                            leftIcon={<Phone size={16} />}
                                            onClick={() => {
                                                window.location.href = `tel:${data.contact.phoneRaw}`;
                                            }}
                                        >
                                            Call Now
                                        </Button>
                                    </div>
                                </div>
                            </FadeInView>
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                <section className="py-16 lg:py-24 bg-neutral-50">
                    <div className="container mx-auto px-4">
                        <FadeInView className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-900 mb-4">
                                Related Services
                            </h2>
                            <p className="text-neutral-600">
                                Explore other services we offer
                            </p>
                        </FadeInView>

                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {relatedServices.map((relatedService) => {
                                const RelatedIcon = iconMap[relatedService.icon] || Wrench;

                                return (
                                    <Link key={relatedService.id} href={`/services/${relatedService.id}`}>
                                        <Card className="h-full group cursor-pointer" padding="lg">
                                            <CardContent>
                                                <div className={cn(
                                                    'w-12 h-12 rounded-xl mb-4',
                                                    'bg-primary-100 text-primary-900',
                                                    'flex items-center justify-center',
                                                    'group-hover:bg-secondary-500 group-hover:text-white',
                                                    'transition-colors duration-300'
                                                )}>
                                                    <RelatedIcon size={24} />
                                                </div>
                                                <h3 className="font-heading font-bold text-lg text-primary-900 mb-2 group-hover:text-secondary-500 transition-colors">
                                                    {relatedService.name}
                                                </h3>
                                                <p className="text-neutral-600 text-sm line-clamp-2">
                                                    {relatedService.shortDescription}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="text-center mt-8">
                            <Link
                                href="/#services"
                                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-secondary-500 transition-colors"
                            >
                                <ArrowLeft size={18} />
                                Back to All Services
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer
                businessInfo={data.businessInfo}
                contact={data.contact}
                services={data.services}
                serviceAreas={data.serviceAreas}
            />

            <FloatingCTA contact={data.contact} />
        </>
    );
}
