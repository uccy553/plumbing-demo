'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

const quickQuoteSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().min(10, 'Valid phone is required'),
    service: z.string().min(1, 'Please select a service'),
});

type QuickQuoteData = z.infer<typeof quickQuoteSchema>;

interface QuickQuoteFormProps {
    services: Service[];
    onSuccess?: () => void;
}

export function QuickQuoteForm({ services, onSuccess }: QuickQuoteFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<QuickQuoteData>({
        resolver: zodResolver(quickQuoteSchema),
    });

    const onSubmit = async (data: QuickQuoteData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    email: 'quick-quote@placeholder.com',
                    message: `Quick quote request for ${data.service}`,
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                reset();
                onSuccess?.();
            }
        } catch {
            // Handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClassName = cn(
        'w-full px-4 py-3 rounded-lg',
        'border border-neutral-200',
        'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
        'transition-all duration-200',
        'placeholder:text-neutral-400'
    );

    if (isSuccess) {
        return (
            <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">
                    Thanks! We'll call you shortly.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-sm text-green-600 underline mt-2"
                >
                    Submit another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    type="text"
                    placeholder="Your Name"
                    className={cn(inputClassName, errors.name && 'border-emergency-500')}
                    {...register('name')}
                />
            </div>

            <div>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    className={cn(inputClassName, errors.phone && 'border-emergency-500')}
                    {...register('phone')}
                />
            </div>

            <div>
                <select
                    className={cn(inputClassName, errors.service && 'border-emergency-500')}
                    {...register('service')}
                >
                    <option value="">Select Service...</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                rightIcon={<Send size={16} />}
            >
                Get Free Quote
            </Button>
        </form>
    );
}
