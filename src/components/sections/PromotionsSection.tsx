'use client';

import { Tag, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations/FadeInView';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Promotion } from '@/types';

interface PromotionsSectionProps {
    promotions: Promotion[];
}

export function PromotionsSection({ promotions }: PromotionsSectionProps) {
    // Filter active promotions
    const activePromotions = promotions.filter((promo) => {
        if (!promo.active) return false;
        if (promo.expiration) {
            return new Date(promo.expiration) > new Date();
        }
        return true;
    });

    if (activePromotions.length === 0) return null;

    return (
        <section id="promotions" className="py-16 lg:py-24 bg-neutral-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <FadeInView className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-900 mb-4">
                        Special Offers
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Take advantage of our current promotions and save on your next plumbing service.
                    </p>
                </FadeInView>

                {/* Promotions Grid */}
                <StaggerContainer
                    staggerDelay={0.1}
                    className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto"
                >
                    {activePromotions.map((promo) => (
                        <StaggerItem key={promo.id} className="w-full sm:w-80">
                            <PromotionCard promo={promo} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

interface PromotionCardProps {
    promo: Promotion;
}

function PromotionCard({ promo }: PromotionCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(promo.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <Card
            className={cn(
                'h-full relative overflow-hidden',
                'border-2 border-dashed border-secondary-300',
                'hover:border-secondary-500 hover:rotate-0',
                'transform rotate-1 transition-all duration-300'
            )}
            padding="lg"
            hover={false}
        >
            {/* Badge Ribbon */}
            <div className="absolute -right-12 top-6 rotate-45 bg-secondary-500 text-white text-xs font-bold py-1 px-12">
                SAVE
            </div>

            <CardContent className="flex flex-col h-full">
                {/* Icon */}
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                    <Tag size={24} className="text-secondary-600" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-primary-900 mb-2">
                    {promo.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 mb-4 flex-1">
                    {promo.description}
                </p>

                {/* Promo Code */}
                <div className="mb-4">
                    <div
                        onClick={handleCopyCode}
                        className={cn(
                            'flex items-center justify-between gap-2',
                            'px-4 py-3 rounded-lg',
                            'bg-primary-50 border-2 border-dashed border-primary-200',
                            'cursor-pointer group',
                            'hover:border-primary-400 transition-colors'
                        )}
                    >
                        <code className="font-mono font-bold text-lg text-primary-900">
                            {promo.code}
                        </code>
                        <button
                            className="text-primary-500 group-hover:text-primary-700"
                            aria-label="Copy code"
                        >
                            {copied ? (
                                <Check size={18} className="text-green-500" />
                            ) : (
                                <Copy size={18} />
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2 text-center">
                        Click to copy code
                    </p>
                </div>

                {/* Terms */}
                <p className="text-xs text-neutral-500 leading-relaxed">
                    {promo.terms}
                </p>

                {/* Expiration */}
                {promo.expiration && (
                    <p className="text-xs text-secondary-600 font-medium mt-2">
                        Expires: {new Date(promo.expiration).toLocaleDateString()}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
