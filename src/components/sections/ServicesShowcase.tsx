'use client';

import Link from 'next/link';
import { ArrowRight, Wrench, Droplet, Flame, Search, PipetteIcon, Bath, Building2, ClipboardList } from 'lucide-react';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations/FadeInView';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

// Icon mapping for service icons
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

interface ServicesShowcaseProps {
    services: Service[];
}

export function ServicesShowcase({ services }: ServicesShowcaseProps) {
    const displayServices = services.slice(0, 8);

    return (
        <section id="services" className="py-16 lg:py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <FadeInView className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-900 mb-4">
                        Comprehensive Plumbing Services
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        From emergency repairs to preventive maintenance, we handle all your residential and commercial plumbing needs.
                    </p>
                </FadeInView>

                {/* Services Grid */}
                <StaggerContainer
                    staggerDelay={0.08}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {displayServices.map((service) => {
                        const Icon = iconMap[service.icon] || Wrench;

                        return (
                            <StaggerItem key={service.id}>
                                <Link href={`/services/${service.id}`}>
                                    <Card
                                        className="h-full group cursor-pointer"
                                        padding="lg"
                                        hover
                                    >
                                        <CardContent>
                                            {/* Icon */}
                                            <div
                                                className={cn(
                                                    'w-14 h-14 rounded-xl mb-4',
                                                    'bg-primary-100 text-primary-900',
                                                    'flex items-center justify-center',
                                                    'group-hover:bg-secondary-500 group-hover:text-white',
                                                    'transition-colors duration-300'
                                                )}
                                            >
                                                <Icon size={28} />
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-heading font-bold text-lg text-primary-900 mb-2 group-hover:text-secondary-500 transition-colors">
                                                {service.name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                                {service.shortDescription}
                                            </p>

                                            {/* Learn More Link */}
                                            <span className="inline-flex items-center gap-2 text-secondary-500 font-medium text-sm group-hover:gap-3 transition-all">
                                                Learn More
                                                <ArrowRight size={16} />
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

                {/* View All Services */}
                {services.length > 8 && (
                    <FadeInView delay={0.5} className="text-center mt-10">
                        <Link
                            href="#services"
                            className="inline-flex items-center gap-2 text-primary-900 font-semibold hover:text-secondary-500 transition-colors"
                        >
                            View All Services
                            <ArrowRight size={18} />
                        </Link>
                    </FadeInView>
                )}
            </div>
        </section>
    );
}
