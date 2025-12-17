'use client';

import { Quote, Star } from 'lucide-react';
import { FadeInView } from '@/components/animations/FadeInView';
import { Carousel } from '@/components/ui/Carousel';
import { Card, CardContent } from '@/components/ui/Card';
import { StarRating } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { formatDate, calculateAverageRating } from '@/lib/utils';
import type { Testimonial, ServiceAreas } from '@/types';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    serviceAreas: ServiceAreas;
}

export function TestimonialsSection({ testimonials, serviceAreas }: TestimonialsSectionProps) {
    const avgRating = calculateAverageRating(testimonials.map((t) => t.rating));

    return (
        <section id="testimonials" className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <FadeInView className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <StarRating rating={Math.round(avgRating)} size="lg" />
                        <span className="text-xl font-bold text-primary-900">{avgRating}</span>
                        <span className="text-neutral-500">
                            ({testimonials.length} reviews)
                        </span>
                    </div>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Don't just take our word for it — hear from {serviceAreas.cities[0]} homeowners who trusted us with their plumbing needs.
                    </p>
                </FadeInView>

                {/* Testimonials Carousel */}
                <div className="max-w-7xl mx-auto px-8 pb-4 overflow-hidden">
                    <Carousel
                        autoPlay
                        autoPlayInterval={6000}
                        showDots
                        showArrows
                    >
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

interface TestimonialCardProps {
    testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <Card className="h-full bg-gradient-to-br from-white to-neutral-50" padding="none" hover={false}>
            <CardContent className="flex flex-col h-full p-5 lg:p-6">
                {/* Header with Quote and Rating */}
                <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <Quote
                            size={20}
                            className="text-secondary-500 transform -scale-x-100"
                        />
                    </div>
                    <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-neutral-700 text-base leading-relaxed flex-1 mb-5">
                    "{testimonial.text}"
                </blockquote>

                {/* Author Info - Redesigned with more space */}
                <div className="bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-bold text-base shadow-md">
                            {testimonial.avatar}
                        </div>

                        {/* Name and Location */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-bold text-base text-primary-900">
                                {testimonial.name}
                            </h4>
                            <p className="text-neutral-500 text-xs">
                                {testimonial.location}
                            </p>
                        </div>

                        {/* Service Badge - Inline with author */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-50 text-secondary-700 text-xs font-medium rounded-md">
                            <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full"></span>
                            {testimonial.service}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
