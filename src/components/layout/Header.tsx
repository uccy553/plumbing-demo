'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, ChevronDown, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import type { ContactInfo, Service, EmergencyBanner, BusinessInfo } from '@/types';

interface HeaderProps {
    contact: ContactInfo;
    services: Service[];
    emergencyBanner: EmergencyBanner;
    businessInfo: BusinessInfo;
}

export function Header({ contact, services, emergencyBanner, businessInfo }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#services', label: 'Services', hasDropdown: true },
        { href: '#about', label: 'About' },
        { href: '#service-areas', label: 'Service Areas' },
        { href: '#faq', label: 'FAQ' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Emergency Banner - hidden on mobile */}
            <div
                className="hidden md:block bg-emergency-600 text-white py-2 px-4"
                style={{ backgroundColor: emergencyBanner.backgroundColor }}
            >
                <div className="container mx-auto flex items-center justify-center gap-3 text-sm md:text-base">
                    <Clock size={18} className="animate-pulse" />
                    <span className="font-medium">{emergencyBanner.text}</span>
                    <a
                        href={`tel:${contact.phoneRaw}`}
                        className="font-bold hover:underline flex items-center gap-1"
                    >
                        <Phone size={16} />
                        {emergencyBanner.phone}
                    </a>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    'sticky top-0 z-40 w-full transition-all duration-300',
                    isScrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-md'
                        : 'bg-white'
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/plumbing-logo.svg"
                                alt={businessInfo.name}
                                width={48}
                                height={48}
                                className="w-12 h-12"
                                priority
                            />
                            <div className="hidden sm:block">
                                <span className="font-heading font-bold text-lg text-primary-900">
                                    {businessInfo.shortNameLine1}
                                </span>
                                <span className="block text-xs text-neutral-500 -mt-1">
                                    {businessInfo.shortNameLine2}
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <div key={link.href} className="relative">
                                    {link.hasDropdown ? (
                                        <button
                                            className="flex items-center gap-1 font-medium text-neutral-700 hover:text-primary-900 transition-colors"
                                            onMouseEnter={() => setIsServicesOpen(true)}
                                            onMouseLeave={() => setIsServicesOpen(false)}
                                        >
                                            {link.label}
                                            <ChevronDown size={16} />
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="font-medium text-neutral-700 hover:text-primary-900 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    )}

                                    {/* Services Dropdown */}
                                    {link.hasDropdown && (
                                        <AnimatePresence>
                                            {isServicesOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 pt-2"
                                                    onMouseEnter={() => setIsServicesOpen(true)}
                                                    onMouseLeave={() => setIsServicesOpen(false)}
                                                >
                                                    <div className="bg-white rounded-xl shadow-card-hover p-4 min-w-[240px]">
                                                        {services.slice(0, 8).map((service) => (
                                                            <Link
                                                                key={service.id}
                                                                href={`/services/${service.id}`}
                                                                className="block px-4 py-2 rounded-lg text-neutral-700 hover:bg-primary-50 hover:text-primary-900 transition-colors"
                                                            >
                                                                {service.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* CTAs */}
                        <div className="flex items-center gap-3">
                            {/* Phone - Desktop */}
                            <a
                                href={`tel:${contact.phoneRaw}`}
                                className="hidden md:flex items-center gap-2 text-primary-900 font-semibold hover:text-secondary-500 transition-colors"
                            >
                                <Phone size={18} />
                                <span>{contact.phone}</span>
                            </a>

                            {/* Schedule Button */}
                            <Button
                                variant="primary"
                                size="md"
                                className="hidden sm:inline-flex"
                                onClick={() => {
                                    const element = document.getElementById('contact');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Schedule Service
                            </Button>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu size={24} className="text-primary-900" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                contact={contact}
                services={services}
                navLinks={navLinks}
            />
        </>
    );
}
