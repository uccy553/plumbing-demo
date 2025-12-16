'use client';

import Image from 'next/image';
import { CheckCircle, Shield, Award, Users, FileCheck, UserCheck } from 'lucide-react';
import { FadeInView } from '@/components/animations/FadeInView';
import { SlideInView } from '@/components/animations/SlideInView';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { AboutSection as AboutSectionType, BusinessInfo, ServiceAreas, ContactInfo } from '@/types';

const getStateName = (stateCode: string): string => {
    const stateNames: Record<string, string> = {
        'TX': 'Texas',
        'FL': 'Florida',
        'GA': 'Georgia',
        'CA': 'California',
        'NY': 'New York',
        'AZ': 'Arizona',
        'CO': 'Colorado',
        'NC': 'North Carolina',
        'SC': 'South Carolina',
        'TN': 'Tennessee',
        'AL': 'Alabama',
        'LA': 'Louisiana',
    };
    return stateNames[stateCode] || stateCode;
};

const getCertificationIcon = (cert: string) => {
    if (cert.toLowerCase().includes('licensed')) return FileCheck;
    if (cert.toLowerCase().includes('insured') || cert.toLowerCase().includes('bonded')) return Shield;
    if (cert.toLowerCase().includes('epa') || cert.toLowerCase().includes('certified')) return Award;
    if (cert.toLowerCase().includes('osha') || cert.toLowerCase().includes('safety')) return Users;
    if (cert.toLowerCase().includes('background')) return UserCheck;
    return Shield;
};

interface AboutSectionProps {
    about: AboutSectionType;
    businessInfo: BusinessInfo;
    serviceAreas: ServiceAreas;
    contact: ContactInfo;
}

export function AboutSection({ about, businessInfo, serviceAreas, contact }: AboutSectionProps) {
    // Split story into paragraphs
    const storyParagraphs = about.story.split('\n\n');

    return (
        <section id="about" className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content Side */}
                    <SlideInView direction="left">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-900 mb-6">
                                {about.headline}
                            </h2>

                            {/* Story */}
                            <div className="space-y-4 mb-8">
                                {storyParagraphs.map((paragraph, index) => (
                                    <p key={index} className="text-neutral-600 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Mission Statement */}
                            <div className="p-6 bg-secondary-50 rounded-2xl border-l-4 border-secondary-500 mb-8">
                                <h3 className="font-heading font-bold text-primary-900 mb-2">
                                    Our Mission
                                </h3>
                                <p className="text-neutral-700 italic">
                                    {about.mission}
                                </p>
                            </div>

                            {/* Values */}
                            <div>
                                <h3 className="font-heading font-bold text-primary-900 mb-4">
                                    Our Values
                                </h3>
                                <ul className="space-y-2">
                                    {about.values.map((value, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-neutral-600"
                                        >
                                            <CheckCircle
                                                size={20}
                                                className="text-secondary-500 shrink-0 mt-0.5"
                                            />
                                            <span>{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </SlideInView>

                    {/* Certifications & Info Side */}
                    <SlideInView direction="right">
                        <div className="space-y-8">
                            {/* Team Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-card">
                                <Image
                                    src="/images/team.jpg"
                                    alt={`${businessInfo.name} Team`}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center">
                                            <Users size={24} className="text-white" />
                                        </div>
                                        <div className="text-white">
                                            <h3 className="font-heading font-bold text-lg">
                                                {about.team.size}
                                            </h3>
                                            <p className="text-white/80 text-sm">
                                                Serving {serviceAreas.mainArea}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Certifications Grid */}
                            <div>
                                <h3 className="font-heading font-bold text-primary-900 mb-4">
                                    Certifications & Credentials
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {about.certifications.map((cert, index) => {
                                        const Icon = getCertificationIcon(cert);
                                        return (
                                            <div
                                                key={index}
                                                className={cn(
                                                    'flex items-center gap-3 p-4 rounded-xl',
                                                    'bg-neutral-50 hover:bg-primary-50',
                                                    'transition-colors'
                                                )}
                                            >
                                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                                                    <Icon size={20} className="text-primary-900" />
                                                </div>
                                                <span className="text-sm font-medium text-primary-900">
                                                    {cert}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* License Badge */}
                            <div className="text-center p-6 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200">
                                <Shield size={32} className="text-primary-900 mx-auto mb-2" />
                                <p className="text-sm text-neutral-600">
                                    State of {getStateName(contact.address.state)} Licensed
                                </p>
                                <p className="font-heading font-bold text-2xl text-primary-900">
                                    #{businessInfo.license}
                                </p>
                                <p className="text-sm text-neutral-500 mt-1">
                                    Est. {businessInfo.established}
                                </p>
                            </div>
                        </div>
                    </SlideInView>
                </div>
            </div>
        </section>
    );
}
