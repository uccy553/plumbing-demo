'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FadeInView } from '@/components/animations/FadeInView';
import { SlideInView } from '@/components/animations/SlideInView';
import { ContactForm } from '@/components/forms/ContactForm';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { ContactInfo, Service } from '@/types';

interface ContactSectionProps {
    contact: ContactInfo;
    services: Service[];
}

export function ContactSection({ contact, services }: ContactSectionProps) {
    return (
        <section id="contact-form" className="py-16 lg:py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <SlideInView direction="left">
                        <Card className="overflow-hidden" padding="none" hover={false}>
                            <div className="bg-primary-900 text-white p-6">
                                <h2 className="text-2xl font-heading font-bold">
                                    Schedule Your Service
                                </h2>
                                <p className="text-primary-200 mt-1">
                                    Fill out the form and we'll get back to you within 2 hours.
                                </p>
                            </div>
                            <CardContent className="p-6 lg:p-8">
                                <ContactForm services={services} />
                            </CardContent>
                        </Card>
                    </SlideInView>

                    {/* Contact Info */}
                    <SlideInView direction="right">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-900 mb-4">
                                    Get In Touch
                                </h2>
                                <p className="text-neutral-600 mb-8">
                                    Have a question or need immediate assistance? Our team is here to help 24/7.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-4">
                                {/* Phone */}
                                <a
                                    href={`tel:${contact.phoneRaw}`}
                                    className={cn(
                                        'flex items-center gap-4 p-5 rounded-xl',
                                        'bg-white border border-neutral-100',
                                        'hover:border-primary-200 hover:shadow-card',
                                        'transition-all duration-200 group'
                                    )}
                                >
                                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary-500 transition-colors">
                                        <Phone size={22} className="text-secondary-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-500 text-sm">Call Us</p>
                                        <p className="font-heading font-bold text-xl text-primary-900">
                                            {contact.phone}
                                        </p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href={`mailto:${contact.email}`}
                                    className={cn(
                                        'flex items-center gap-4 p-5 rounded-xl',
                                        'bg-white border border-neutral-100',
                                        'hover:border-primary-200 hover:shadow-card',
                                        'transition-all duration-200 group'
                                    )}
                                >
                                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent-500 transition-colors">
                                        <Mail size={22} className="text-accent-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-500 text-sm">Email Us</p>
                                        <p className="font-heading font-bold text-lg text-primary-900">
                                            {contact.email}
                                        </p>
                                    </div>
                                </a>

                                {/* Address */}
                                <div
                                    className={cn(
                                        'flex items-center gap-4 p-5 rounded-xl',
                                        'bg-white border border-neutral-100'
                                    )}
                                >
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin size={22} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-500 text-sm">Location</p>
                                        <p className="font-medium text-primary-900">
                                            {contact.address.street}
                                        </p>
                                        <p className="text-neutral-600 text-sm">
                                            {contact.address.city}, {contact.address.state} {contact.address.zip}
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div
                                    className={cn(
                                        'flex items-start gap-4 p-5 rounded-xl',
                                        'bg-white border border-neutral-100'
                                    )}
                                >
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                                        <Clock size={22} className="text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-neutral-500 text-sm mb-2">Business Hours</p>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                            <span className="text-neutral-600">Monday - Friday:</span>
                                            <span className="text-primary-900 font-medium">{contact.hours.monday}</span>
                                            <span className="text-neutral-600">Saturday:</span>
                                            <span className="text-primary-900 font-medium">{contact.hours.saturday}</span>
                                            <span className="text-neutral-600">Sunday:</span>
                                            <span className="text-primary-900 font-medium">{contact.hours.sunday}</span>
                                        </div>
                                        <p className="mt-3 text-sm font-semibold text-secondary-500">
                                            🚨 {contact.hours.emergency}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlideInView>
                </div>
            </div>
        </section>
    );
}
