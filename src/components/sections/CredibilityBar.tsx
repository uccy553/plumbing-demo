'use client';

import { Shield, Star, Clock, Calendar } from 'lucide-react';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations/FadeInView';
import { cn } from '@/lib/utils';
import type { BusinessInfo } from '@/types';

interface CredibilityBarProps {
    businessInfo: BusinessInfo;
}

const getStats = (state: string) => [
    {
        icon: Shield,
        stat: 'Licensed & Insured',
        stateLabel: `State of ${state === 'TX' ? 'Texas' : state === 'GA' ? 'Georgia' : state === 'FL' ? 'Florida' : state} Licensed`,
    },
    {
        icon: Star,
        stat: '5-Star Rated',
        stateLabel: 'Trusted by Customers',
    },
    {
        icon: Clock,
        stat: '24/7 Emergency',
        stateLabel: 'Always Available',
    },
    {
        icon: Calendar,
        stat: 'Same-Day Service',
        stateLabel: 'Fast Response Times',
    },
];

export function CredibilityBar({ businessInfo }: CredibilityBarProps) {
    // Get state from the license prefix (assuming format like TX1234567)
    const stateFromLicense = businessInfo.license.substring(0, 2);
    const stats = getStats(stateFromLicense);

    // Update license from data
    const updatedStats = stats.map((item) => {
        if (item.stat === 'Licensed & Insured') {
            return {
                ...item,
                description: `License #${businessInfo.license}`,
            };
        }
        return {
            ...item,
            description: item.stateLabel,
        };
    });

    return (
        <section id="credibility" className="bg-primary-900 py-8 lg:py-12">
            <div className="container mx-auto px-4">
                <StaggerContainer
                    staggerDelay={0.1}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {updatedStats.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <StaggerItem key={index}>
                                <div
                                    className={cn(
                                        'flex flex-col items-center text-center',
                                        'p-4 rounded-xl',
                                        'hover:bg-white/5 transition-colors cursor-default'
                                    )}
                                >
                                    <div className="p-3 bg-secondary-500 rounded-xl mb-3">
                                        <Icon size={24} className="text-white" />
                                    </div>
                                    <span className="font-heading font-bold text-white text-lg">
                                        {item.stat}
                                    </span>
                                    <span className="text-primary-200 text-sm mt-1">
                                        {item.description}
                                    </span>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
}
