'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
    id: string;
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    className?: string;
}

export function Accordion({
    items,
    allowMultiple = false,
    className,
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems((prev) =>
                prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id]
            );
        } else {
            setOpenItems((prev) =>
                prev.includes(id) ? [] : [id]
            );
        }
    };

    return (
        <div className={cn('space-y-3', className)}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id);

                return (
                    <div
                        key={item.id}
                        className={cn(
                            'bg-white rounded-xl border border-neutral-200',
                            'transition-shadow duration-200',
                            isOpen && 'shadow-card'
                        )}
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className={cn(
                                'w-full flex items-center justify-between',
                                'p-5 text-left',
                                'font-heading font-semibold text-primary-900',
                                'hover:bg-neutral-50 transition-colors',
                                'rounded-xl'
                            )}
                            aria-expanded={isOpen}
                        >
                            <span className="pr-4">{item.title}</span>
                            <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                            >
                                <ChevronDown size={20} className="text-primary-600" />
                            </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 text-neutral-600 leading-relaxed">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

// Single accordion item for controlled usage
interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
}

export function AccordionItem({
    title,
    children,
    isOpen = false,
    onToggle,
    className,
}: AccordionItemProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-xl border border-neutral-200',
                'transition-shadow duration-200',
                isOpen && 'shadow-card',
                className
            )}
        >
            <button
                onClick={onToggle}
                className={cn(
                    'w-full flex items-center justify-between',
                    'p-5 text-left',
                    'font-heading font-semibold text-primary-900',
                    'hover:bg-neutral-50 transition-colors',
                    'rounded-xl'
                )}
                aria-expanded={isOpen}
            >
                <span className="pr-4">{title}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown size={20} className="text-primary-600" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 text-neutral-600 leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
