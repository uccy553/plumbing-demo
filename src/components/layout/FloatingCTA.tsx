'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContactInfo } from '@/types';

interface FloatingCTAProps {
    contact: ContactInfo;
}

export function FloatingCTA({ contact }: FloatingCTAProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past hero section (roughly viewport height)
            setIsVisible(window.scrollY > window.innerHeight * 0.5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
                >
                    {/* Expanded Options */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-3"
                            >
                                <a
                                    href="#contact"
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-3',
                                        'bg-white rounded-full shadow-card-hover',
                                        'text-primary-900 font-medium',
                                        'hover:shadow-elevated transition-shadow'
                                    )}
                                    onClick={() => setIsExpanded(false)}
                                >
                                    <MessageSquare size={20} />
                                    <span className="whitespace-nowrap">Get a Quote</span>
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Button */}
                    <div className="relative">
                        {/* Pulse animation ring */}
                        <span className="absolute inset-0 animate-ping bg-secondary-500 rounded-full opacity-30" />

                        <button
                            onMouseEnter={() => setIsExpanded(true)}
                            onMouseLeave={() => setIsExpanded(false)}
                            onClick={() => {
                                window.location.href = `tel:${contact.phoneRaw}`;
                            }}
                            className={cn(
                                'relative flex items-center gap-3',
                                'px-5 py-4 rounded-full',
                                'bg-secondary-500 hover:bg-secondary-600',
                                'text-white font-bold',
                                'shadow-card-hover hover:shadow-elevated',
                                'transition-all duration-200'
                            )}
                            aria-label="Call now"
                        >
                            <Phone size={24} className="animate-pulse" />
                            <span className="hidden sm:inline whitespace-nowrap">
                                {contact.phone}
                            </span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
