'use client';

import { Quote, Star } from 'lucide-react';
import { FadeInView } from '@/components/animations/FadeInView';
import { Carousel } from '@/components/ui/Carousel';
import { Card, CardContent } from '@/components/ui/Card';
import { StarRating } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { formatDate, calculateAverageRating } from '@/lib/utils';
import type { Testimonial } from '@/types';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    const avgRating = calculateAverageRating(testimonials.map((t) => t.rating));

    return (
        <section id="testimonials" className="py-16 lg:py-24 bg-white overflow-hidden">
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
                        Don't just take our word for it — hear from Tampa homeowners who trusted us with their plumbing needs.
                    </p>
                </FadeInView>

                {/* Testimonials Carousel */}
                <div className="max-w-6xl mx-auto px-8">
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
        <Card className="h-full" padding="lg" hover={false}>
            <CardContent className="flex flex-col h-full">
                {/* Quote Icon */}
                <Quote
                    size={32}
                    className="text-secondary-200 mb-4 transform -scale-x-100"
                />

                {/* Rating */}
                <StarRating rating={testimonial.rating} className="mb-4" />

                {/* Testimonial Text */}
                <p className="text-neutral-700 leading-relaxed flex-1 mb-6 italic">
                    "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-900 flex items-center justify-center font-bold text-lg shrink-0">
                        {testimonial.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="font-heading font-semibold text-primary-900">
                            {testimonial.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                            {testimonial.location}
                        </div>
                    </div>

                    {/* Service Badge */}
                    <div className="hidden sm:block">
                        <span className="inline-block px-3 py-1 bg-primary-50 text-primary-900 text-xs font-medium rounded-full">
                            {testimonial.service}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
