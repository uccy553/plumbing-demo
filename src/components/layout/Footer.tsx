import Link from 'next/link';
import Image from 'next/image';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Facebook,
    Instagram,
    Linkedin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BusinessInfo, ContactInfo, Service, ServiceAreas } from '@/types';

interface FooterProps {
    businessInfo: BusinessInfo;
    contact: ContactInfo;
    services: Service[];
    serviceAreas: ServiceAreas;
}

export function Footer({
    businessInfo,
    contact,
    services,
    serviceAreas,
}: FooterProps) {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: '#services', label: 'Services' },
        { href: '#about', label: 'About Us' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#service-areas', label: 'Service Areas' },
        { href: '#faq', label: 'FAQ' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <footer className="bg-primary-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/plumbing-logo.svg"
                                alt={businessInfo.name}
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                            <div>
                                <span className="font-heading font-bold text-lg">
                                    {businessInfo.shortNameLine1}
                                </span>
                                <span className="block text-xs text-primary-200 -mt-1">
                                    {businessInfo.shortNameLine2}
                                </span>
                            </div>
                        </div>
                        <p className="text-primary-200 text-sm mb-4">
                            {businessInfo.description}
                        </p>
                        <p className="text-sm text-primary-300">
                            License #{businessInfo.license}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 mt-4">
                            {contact.social.facebook && (
                                <a
                                    href={contact.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-300 hover:text-white transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={20} />
                                </a>
                            )}
                            {contact.social.instagram && (
                                <a
                                    href={contact.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-300 hover:text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={20} />
                                </a>
                            )}
                            {contact.social.linkedin && (
                                <a
                                    href={contact.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-300 hover:text-white transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-primary-200 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4">Services</h3>
                        <ul className="space-y-2">
                            {services.slice(0, 6).map((service) => (
                                <li key={service.id}>
                                    <Link
                                        href={`/services/${service.id}`}
                                        className="text-primary-200 hover:text-white transition-colors"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={`tel:${contact.phoneRaw}`}
                                    className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors"
                                >
                                    <Phone size={16} />
                                    <span>{contact.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors"
                                >
                                    <Mail size={16} />
                                    <span className="break-all">{contact.email}</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-primary-200">
                                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                                <span>
                                    {contact.address.street}
                                    <br />
                                    {contact.address.city}, {contact.address.state}{' '}
                                    {contact.address.zip}
                                </span>
                            </li>
                            <li className="flex items-start gap-2 text-primary-200">
                                <Clock size={16} className="flex-shrink-0 mt-0.5" />
                                <span>
                                    Mon-Fri: {contact.hours.monday}
                                    <br />
                                    Sat: {contact.hours.saturday}
                                    <br />
                                    <span className="text-secondary-400 font-semibold">
                                        {contact.hours.emergency}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Service Areas */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4">Service Areas</h3>
                        <ul className="space-y-1 text-sm">
                            {serviceAreas.cities.slice(0, 8).map((city) => (
                                <li key={city} className="text-primary-200">
                                    {city}
                                </li>
                            ))}
                            <li className="pt-2">
                                <Link
                                    href="#service-areas"
                                    className="text-secondary-400 hover:text-secondary-300 font-medium transition-colors"
                                >
                                    View all areas →
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-300">
                        <p>
                            © {currentYear} {businessInfo.name}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <span>|</span>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
