'use client';

import { Phone, Truck, ClipboardList, Wrench, CheckCircle } from 'lucide-react';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations/FadeInView';
import { cn } from '@/lib/utils';
import type { ProcessStep } from '@/types';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    phone: Phone,
    truck: Truck,
    clipboard: ClipboardList,
    wrench: Wrench,
    'check-circle': CheckCircle,
};

interface ProcessSectionProps {
    steps: ProcessStep[];
}

export function ProcessSection({ steps }: ProcessSectionProps) {
    return (
        <section id="process" className="py-16 lg:py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <FadeInView className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        From your first call to a job well done, we make the process simple and stress-free.
                    </p>
                </FadeInView>

                {/* Process Steps - Desktop Timeline */}
                <div className="hidden lg:block relative">
                    {/* Connecting Line */}
                    <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

                    <StaggerContainer
                        staggerDelay={0.15}
                        className="grid grid-cols-5 gap-4"
                    >
                        {steps.map((step, index) => {
                            const Icon = iconMap[step.icon] || CheckCircle;

                            return (
                                <StaggerItem key={step.step}>
                                    <div className="relative flex flex-col items-center text-center">
                                        {/* Step Number & Icon */}
                                        <div className="relative z-10 mb-6">
                                            <div
                                                className={cn(
                                                    'w-16 h-16 rounded-full',
                                                    'bg-primary-900 text-white',
                                                    'flex items-center justify-center',
                                                    'shadow-lg',
                                                    'group-hover:bg-secondary-500 transition-colors'
                                                )}
                                            >
                                                <Icon size={28} />
                                            </div>
                                            <span className="absolute -top-2 -right-2 w-7 h-7 bg-secondary-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">
                                                {step.step}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <h3 className="font-heading font-bold text-lg text-primary-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>

                {/* Process Steps - Mobile/Tablet Vertical */}
                <div className="lg:hidden">
                    <StaggerContainer staggerDelay={0.1} className="space-y-8">
                        {steps.map((step, index) => {
                            const Icon = iconMap[step.icon] || CheckCircle;
                            const isLast = index === steps.length - 1;

                            return (
                                <StaggerItem key={step.step}>
                                    <div className="relative flex gap-4">
                                        {/* Timeline Node */}
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={cn(
                                                    'w-14 h-14 rounded-full shrink-0',
                                                    'bg-primary-900 text-white',
                                                    'flex items-center justify-center',
                                                    'shadow-lg relative'
                                                )}
                                            >
                                                <Icon size={24} />
                                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                                                    {step.step}
                                                </span>
                                            </div>
                                            {/* Connecting Line */}
                                            {!isLast && (
                                                <div className="w-0.5 h-full bg-primary-200 mt-2" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <h3 className="font-heading font-bold text-lg text-primary-900 mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-neutral-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
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
