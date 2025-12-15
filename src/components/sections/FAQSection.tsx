'use client';

import { useState } from 'react';
import { FadeInView } from '@/components/animations/FadeInView';
import { Accordion } from '@/components/ui/Accordion';
import { cn } from '@/lib/utils';
import type { FAQ } from '@/types';

interface FAQSectionProps {
    faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Get unique categories
    const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

    // Filter FAQs by category
    const filteredFaqs = selectedCategory
        ? faqs.filter((faq) => faq.category === selectedCategory)
        : faqs;

    // Convert to accordion items format
    const accordionItems = filteredFaqs.map((faq, index) => ({
        id: `faq-${index}`,
        title: faq.question,
        content: faq.answer,
    }));

    return (
        <section id="faq" className="py-16 lg:py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <FadeInView className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Find answers to common questions about our plumbing services, pricing, and policies.
                    </p>
                </FadeInView>

                {/* Category Filters */}
                <FadeInView delay={0.1} className="flex flex-wrap justify-center gap-3 mb-10">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                            'px-4 py-2 rounded-full text-sm font-medium transition-all',
                            selectedCategory === null
                                ? 'bg-primary-900 text-white'
                                : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-900 border border-neutral-200'
                        )}
                    >
                        All Questions
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                                selectedCategory === category
                                    ? 'bg-primary-900 text-white'
                                    : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-900 border border-neutral-200'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </FadeInView>

                {/* FAQ Accordion */}
                <FadeInView delay={0.2}>
                    <div className="max-w-3xl mx-auto">
                        <Accordion items={accordionItems} />
                    </div>
                </FadeInView>

                {/* Contact CTA */}
                <FadeInView delay={0.3} className="text-center mt-12">
                    <p className="text-neutral-600 mb-4">
                        Can't find what you're looking for?
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-secondary-500 font-semibold hover:text-secondary-600 transition-colors"
                    >
                        Contact us for more information →
                    </a>
                </FadeInView>
            </div>
        </section>
    );
}
