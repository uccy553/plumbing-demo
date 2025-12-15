'use client';

import { motion, type Variants } from 'framer-motion';
import { Phone, ChevronDown, Shield, Clock, DollarSign, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { HeroSection as HeroSectionType, ContactInfo } from '@/types';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    shield: Shield,
    clock: Clock,
    dollar: DollarSign,
    location: MapPin,
};

interface HeroSectionProps {
    hero: HeroSectionType;
    contact: ContactInfo;
}

export function HeroSection({ hero, contact }: HeroSectionProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        },
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero.webp')" }}
            />

            {/* Dark Overlay - entire section */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Decorative Overlay Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary-500 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
                    >
                        {hero.headline}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl lg:text-2xl text-primary-100 mb-10 max-w-2xl mx-auto"
                    >
                        {hero.subheadline}
                    </motion.p>

                    {/* Trust Badges */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
                    >
                        {hero.badges.map((badge, index) => {
                            const IconComponent = iconMap[badge.icon] || Shield;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="flex items-center gap-2 text-white/90"
                                >
                                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <IconComponent size={20} />
                                    </div>
                                    <span className="text-sm md:text-base font-medium">
                                        {badge.text}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            variant="primary"
                            size="xl"
                            onClick={() => {
                                const element = document.getElementById('contact');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto text-lg shadow-elevated"
                        >
                            {hero.ctaPrimary}
                        </Button>
                        <Button
                            variant="outline"
                            size="xl"
                            leftIcon={<Phone size={20} />}
                            onClick={() => {
                                window.location.href = `tel:${contact.phoneRaw}`;
                            }}
                            className="w-full sm:w-auto text-lg border-white text-white hover:bg-white hover:text-primary-900"
                        >
                            {hero.ctaSecondary}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white/60 cursor-pointer"
                    onClick={() => {
                        const element = document.getElementById('credibility');
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <ChevronDown size={32} />
                </motion.div>
            </motion.div>
        </section>
    );
}
