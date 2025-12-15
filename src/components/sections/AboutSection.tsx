'use client';

import { CheckCircle, Shield, Award, Users, FileCheck, UserCheck } from 'lucide-react';
import { FadeInView } from '@/components/animations/FadeInView';
import { SlideInView } from '@/components/animations/SlideInView';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { AboutSection as AboutSectionType, BusinessInfo } from '@/types';

const certificationIcons: Record<string, typeof Shield> = {
    'State of Florida Licensed Plumbing Contractor': FileCheck,
    'Fully Insured & Bonded': Shield,
    'EPA Lead-Safe Certified': Award,
    'OSHA Safety Trained': Users,
    'Background Checked Technicians': UserCheck,
};

interface AboutSectionProps {
    about: AboutSectionType;
    businessInfo: BusinessInfo;
}

export function AboutSection({ about, businessInfo }: AboutSectionProps) {
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
                            {/* Team Info */}
                            <div className="bg-primary-900 text-white rounded-2xl p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-secondary-500 rounded-xl flex items-center justify-center">
                                        <Users size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-xl">
                                            {about.team.size}
                                        </h3>
                                        <p className="text-primary-200 text-sm">
                                            Serving Tampa Bay
                                        </p>
                                    </div>
                                </div>
                                <p className="text-primary-100 leading-relaxed">
                                    {about.team.description}
                                </p>
                            </div>

                            {/* Certifications Grid */}
                            <div>
                                <h3 className="font-heading font-bold text-primary-900 mb-4">
                                    Certifications & Credentials
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {about.certifications.map((cert, index) => {
                                        const Icon = certificationIcons[cert] || Shield;
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
                                    State of Florida Licensed
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
