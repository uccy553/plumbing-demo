'use client';

import { Phone, AlertTriangle, Clock, Droplets, Flame, CircleOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ContactInfo } from '@/types';

const emergencyTypes = [
    { icon: Droplets, label: 'Burst Pipes' },
    { icon: Flame, label: 'No Hot Water' },
    { icon: CircleOff, label: 'Sewer Backup' },
    { icon: AlertTriangle, label: 'Major Leaks' },
];

interface EmergencyHighlightProps {
    contact: ContactInfo;
}

export function EmergencyHighlight({ contact }: EmergencyHighlightProps) {
    return (
        <section id="emergency" className="relative py-16 lg:py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-emergency" />

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Alert Icon */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-6"
                    >
                        <AlertTriangle size={40} className="text-white" />
                    </motion.div>

                    {/* Headline */}
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
                        PLUMBING EMERGENCY?
                    </h2>

                    {/* Subtext */}
                    <div className="flex items-center justify-center gap-2 text-white/90 mb-8">
                        <Clock size={20} />
                        <span className="text-lg font-medium">
                            We Answer 24/7/365 — Average Response Time: 60 Minutes
                        </span>
                    </div>

                    {/* Emergency Types */}
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        {emergencyTypes.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white"
                                >
                                    <Icon size={18} />
                                    <span className="font-medium">{item.label}</span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Phone Number - Large Display */}
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <a
                            href={`tel:${contact.phoneRaw}`}
                            className={cn(
                                'inline-flex items-center gap-4',
                                'text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white',
                                'hover:text-white/90 transition-colors'
                            )}
                        >
                            <motion.span
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            >
                                <Phone size={48} />
                            </motion.span>
                            {contact.phone}
                        </a>
                    </motion.div>

                    {/* CTA Button */}
                    <Button
                        variant="secondary"
                        size="xl"
                        leftIcon={<Phone size={24} />}
                        onClick={() => {
                            window.location.href = `tel:${contact.phoneRaw}`;
                        }}
                        className="bg-white text-emergency-600 hover:bg-white/90 text-lg px-10"
                    >
                        Call Now for Emergency Service
                    </Button>
                </div>
            </div>
        </section>
    );
}
