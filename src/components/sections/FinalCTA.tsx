'use client';

import { Phone, Shield, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { CallToActions, ContactInfo } from '@/types';

interface FinalCTAProps {
    callToActions: CallToActions;
    contact: ContactInfo;
}

export function FinalCTA({ callToActions, contact }: FinalCTAProps) {
    return (
        <section id="contact" className="py-16 lg:py-24 bg-gradient-hero relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
                <div className="absolute left-0 top-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl -translate-x-1/2" />
                <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl translate-x-1/2" />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
                    >
                        Ready to Solve Your Plumbing Problem?
                    </motion.h2>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto"
                    >
                        Get fast, reliable plumbing service from Tampa's most trusted professionals.
                        Schedule your service today and experience the difference.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Button
                            variant="primary"
                            size="xl"
                            className="w-full sm:w-auto text-lg shadow-elevated"
                            onClick={() => {
                                const contactForm = document.getElementById('contact-form');
                                contactForm?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {callToActions.primary.text}
                        </Button>
                        <Button
                            variant="outline"
                            size="xl"
                            leftIcon={<Phone size={20} />}
                            className="w-full sm:w-auto text-lg border-white text-white hover:bg-white hover:text-primary-900"
                            onClick={() => {
                                window.location.href = `tel:${contact.phoneRaw}`;
                            }}
                        >
                            {contact.phone}
                        </Button>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-6 text-primary-200"
                    >
                        <div className="flex items-center gap-2">
                            <Shield size={20} />
                            <span className="font-medium">Licensed</span>
                        </div>
                        <div className="w-1 h-1 bg-primary-400 rounded-full hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Award size={20} />
                            <span className="font-medium">Insured</span>
                        </div>
                        <div className="w-1 h-1 bg-primary-400 rounded-full hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Clock size={20} />
                            <span className="font-medium">Guaranteed</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
