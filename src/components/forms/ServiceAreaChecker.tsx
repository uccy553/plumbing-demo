'use client';

import { useState } from 'react';
import { MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ServiceAreaCheckerProps {
    zipCodes: string[];
    phone: string;
    phoneRaw: string;
}

export function ServiceAreaChecker({ zipCodes, phone, phoneRaw }: ServiceAreaCheckerProps) {
    const [zipCode, setZipCode] = useState('');
    const [result, setResult] = useState<'none' | 'yes' | 'no'>('none');

    const handleCheck = () => {
        if (zipCode.length < 5) return;

        const isServiced = zipCodes.includes(zipCode);
        setResult(isServiced ? 'yes' : 'no');
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-card">
            <h3 className="font-heading font-bold text-lg text-primary-900 mb-4">
                Check If We Service Your Area
            </h3>

            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                        type="text"
                        placeholder="Enter ZIP Code"
                        value={zipCode}
                        onChange={(e) => {
                            setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5));
                            setResult('none');
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                        className={cn(
                            'w-full pl-10 pr-4 py-3 rounded-lg',
                            'border border-neutral-200',
                            'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
                            'transition-all duration-200'
                        )}
                        maxLength={5}
                    />
                </div>
                <Button variant="primary" onClick={handleCheck}>
                    Check
                </Button>
            </div>

            {/* Results */}
            {result === 'yes' && (
                <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle size={24} />
                    <div>
                        <p className="font-semibold">Great news!</p>
                        <p className="text-sm">We service your area. Call us to schedule your appointment!</p>
                    </div>
                </div>
            )}

            {result === 'no' && (
                <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-700 rounded-lg">
                    <XCircle size={24} />
                    <div>
                        <p className="font-semibold">Not in our standard area</p>
                        <p className="text-sm">
                            Call us at{' '}
                            <a href={`tel:${phoneRaw}`} className="underline font-medium">
                                {phone}
                            </a>{' '}
                            to confirm service availability.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
