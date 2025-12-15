'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
    children: React.ReactNode[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    className?: string;
    slideClassName?: string;
}

export function Carousel({
    children,
    autoPlay = true,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = true,
    className,
    slideClassName,
}: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Auto-play
    useEffect(() => {
        if (!autoPlay || !emblaApi || isPaused) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, emblaApi, isPaused]);

    return (
        <div
            className={cn('relative overflow-hidden', className)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Viewport */}
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className={cn(
                                'flex-[0_0_100%] min-w-0',
                                'md:flex-[0_0_50%] lg:flex-[0_0_33.333%]',
                                'px-3',
                                slideClassName
                            )}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            {showArrows && (
                <>
                    <button
                        onClick={scrollPrev}
                        className={cn(
                            'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4',
                            'p-2 rounded-full',
                            'bg-white shadow-card hover:shadow-card-hover',
                            'text-primary-900 hover:text-secondary-500',
                            'transition-all duration-200',
                            'hidden md:flex items-center justify-center'
                        )}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className={cn(
                            'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4',
                            'p-2 rounded-full',
                            'bg-white shadow-card hover:shadow-card-hover',
                            'text-primary-900 hover:text-secondary-500',
                            'transition-all duration-200',
                            'hidden md:flex items-center justify-center'
                        )}
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Dots */}
            {showDots && (
                <div className="flex justify-center gap-2 mt-6">
                    {children.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                'w-2.5 h-2.5 rounded-full transition-all duration-200',
                                selectedIndex === index
                                    ? 'bg-secondary-500 w-8'
                                    : 'bg-neutral-300 hover:bg-neutral-400'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
