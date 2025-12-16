'use client';

import { MapPin, Phone } from 'lucide-react';
import { FadeInView } from '@/components/animations/FadeInView';
import { SlideInView } from '@/components/animations/SlideInView';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ServiceAreas, ContactInfo } from '@/types';

interface ServiceAreasMapProps {
    serviceAreas: ServiceAreas;
    contact: ContactInfo;
}

export function ServiceAreasMap({ serviceAreas, contact }: ServiceAreasMapProps) {
    // Split cities into columns
    const midpoint = Math.ceil(serviceAreas.cities.length / 2);
    const column1 = serviceAreas.cities.slice(0, midpoint);
    const column2 = serviceAreas.cities.slice(midpoint);

    return (
        <section id="service-areas" className="py-16 lg:py-24 bg-primary-900">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Map Side */}
                    <SlideInView direction="left">
                        <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
                            {/* Google Maps Embed */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426164.98729918245!2d-82.50599008254139!3d33.4385199248663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa34194c724742f37%3A0x85437c8ff41dff84!2sMobley%20Plumbing%20and%20Septic%2C%20LLC!5e0!3m2!1sen!2sng!4v1765836274024!5m2!1sen!2sng"
                                className="absolute inset-0 w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mobley Plumbing and Septic Service Area Map"
                            />
                        </div>
                    </SlideInView>

                    {/* Content Side */}
                    <SlideInView direction="right">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                                Proudly Serving {serviceAreas.mainArea}
                            </h2>
                            <p className="text-lg text-primary-200 mb-8">
                                {serviceAreas.description}
                            </p>

                            {/* Cities Grid */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8">
                                <div className="space-y-2">
                                    {column1.map((city) => (
                                        <div
                                            key={city}
                                            className="flex items-center gap-2 text-primary-100"
                                        >
                                            <MapPin size={14} className="text-secondary-400" />
                                            <span>{city}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    {column2.map((city) => (
                                        <div
                                            key={city}
                                            className="flex items-center gap-2 text-primary-100"
                                        >
                                            <MapPin size={14} className="text-secondary-400" />
                                            <span>{city}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
                                <p className="text-primary-200">
                                    Don't see your area?
                                </p>
                                <Button
                                    variant="primary"
                                    leftIcon={<Phone size={18} />}
                                    onClick={() => {
                                        window.location.href = `tel:${contact.phoneRaw}`;
                                    }}
                                >
                                    Call to Confirm
                                </Button>
                            </div>
                        </div>
                    </SlideInView>
                </div>
            </div>
        </section>
    );
}
