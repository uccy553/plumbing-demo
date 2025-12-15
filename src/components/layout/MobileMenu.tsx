'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { ContactInfo, Service } from '@/types';

interface NavLink {
    href: string;
    label: string;
    hasDropdown?: boolean;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    contact: ContactInfo;
    services: Service[];
    navLinks: NavLink[];
}

export function MobileMenu({
    isOpen,
    onClose,
    contact,
    services,
    navLinks,
}: MobileMenuProps) {
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className={cn(
                            'fixed right-0 top-0 h-full w-full max-w-sm',
                            'bg-white shadow-elevated z-50',
                            'flex flex-col'
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                            <span className="font-heading font-bold text-lg text-primary-900">
                                Menu
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={24} className="text-neutral-700" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <nav className="space-y-1">
                                {navLinks.map((link) => (
                                    <div key={link.href}>
                                        {link.hasDropdown ? (
                                            <div className="py-2">
                                                <span className="block px-4 py-2 font-semibold text-primary-900">
                                                    {link.label}
                                                </span>
                                                <div className="pl-4 mt-1 space-y-1 border-l-2 border-neutral-100 ml-4">
                                                    {services.slice(0, 6).map((service) => (
                                                        <Link
                                                            key={service.id}
                                                            href={`/services/${service.id}`}
                                                            onClick={onClose}
                                                            className="block px-4 py-2 text-neutral-600 hover:text-primary-900 hover:bg-primary-50 rounded-lg transition-colors"
                                                        >
                                                            {service.name}
                                                        </Link>
                                                    ))}
                                                    <Link
                                                        href="#services"
                                                        onClick={onClose}
                                                        className="block px-4 py-2 text-secondary-500 font-medium hover:bg-secondary-50 rounded-lg transition-colors"
                                                    >
                                                        View All Services
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={onClose}
                                                className="block px-4 py-3 font-semibold text-primary-900 hover:bg-primary-50 rounded-lg transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Contact Info & CTA */}
                        <div className="p-4 bg-neutral-50 border-t border-neutral-100">
                            <div className="space-y-3 mb-4">
                                <a
                                    href={`tel:${contact.phoneRaw}`}
                                    className="flex items-center gap-3 text-neutral-700 hover:text-primary-900"
                                >
                                    <Phone size={18} />
                                    <span className="font-medium">{contact.phone}</span>
                                </a>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-3 text-neutral-700 hover:text-primary-900"
                                >
                                    <Mail size={18} />
                                    <span>{contact.email}</span>
                                </a>
                                <div className="flex items-start gap-3 text-neutral-600">
                                    <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">
                                        {contact.address.street}, {contact.address.city},{' '}
                                        {contact.address.state} {contact.address.zip}
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="emergency"
                                size="lg"
                                fullWidth
                                leftIcon={<Phone size={20} />}
                                onClick={() => {
                                    window.location.href = `tel:${contact.phoneRaw}`;
                                }}
                            >
                                Call Now - 24/7
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
