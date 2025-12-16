'use client';

import {
    ShieldCheck,
    Receipt,
    Clock,
    Award,
    UserCheck,
    MapPin
} from 'lucide-react';
import { SlideInView } from '@/components/animations/SlideInView';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations/FadeInView';
import { cn } from '@/lib/utils';
import type { WhyChooseUsItem, ServiceAreas } from '@/types';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'shield-check': ShieldCheck,
    'receipt': Receipt,
    'clock-fast': Clock,
    'award': Award,
    'user-check': UserCheck,
    'map-pin': MapPin,
};

interface WhyChooseUsProps {
    items: WhyChooseUsItem[];
    businessName?: string;
    serviceAreas: ServiceAreas;
}

export function WhyChooseUs({ items, businessName = 'Omega Plumbing', serviceAreas }: WhyChooseUsProps) {
    return (
        <section id="why-choose-us" className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <SlideInView direction="left" className="lg:col-span-2">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-900 mb-6 leading-tight">
                            Why {serviceAreas.cities[0]} Trusts {businessName.split(' ')[0]} {businessName.split(' ')[1]}
                        </h2>
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                            When you call us, you can expect honest communication, quality
                            workmanship, and a team that genuinely cares about solving your
                            plumbing problems right the first time.
                        </p>
                        <div className="p-6 bg-primary-50 rounded-2xl border-l-4 border-secondary-500">
                            <p className="text-primary-900 font-medium italic">
                                &ldquo;We treat every customer&apos;s home like it&apos;s our own.&rdquo;
                            </p>
                            <p className="text-sm text-neutral-600 mt-2">
                                — The {businessName} Team
                            </p>
                        </div>
                    </SlideInView>

                    {/* Right Column - Grid */}
                    <StaggerContainer
                        staggerDelay={0.1}
                        className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
                    >
                        {items.map((item, index) => {
                            const Icon = iconMap[item.icon] || ShieldCheck;

                            return (
                                <StaggerItem key={index}>
                                    <div
                                        className={cn(
                                            'p-5 rounded-xl bg-neutral-50',
                                            'hover:bg-white hover:shadow-card',
                                            'transition-all duration-300',
                                            'group cursor-default'
                                        )}
                                    >
                                        {/* Icon */}
                                        <div
                                            className={cn(
                                                'w-12 h-12 rounded-lg mb-4',
                                                'bg-primary-900 text-white',
                                                'flex items-center justify-center',
                                                'group-hover:bg-secondary-500',
                                                'transition-colors duration-300'
                                            )}
                                        >
                                            <Icon size={24} />
                                        </div>

                                        {/* Stat */}
                                        <div className="text-2xl font-heading font-bold text-secondary-500 mb-1">
                                            {item.stat}
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-heading font-semibold text-primary-900 mb-2">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
}
