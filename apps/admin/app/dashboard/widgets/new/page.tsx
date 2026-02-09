'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Widget } from '@gratuity/shared/types';
import WidgetEditor from '@/components/widgets/WidgetEditor';
import { toast } from 'react-hot-toast';

export default function NewWidgetPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSave = async (widgetData: Partial<Widget>) => {
        setLoading(true);
        try {
            await addDocument(COLLECTIONS.WIDGETS, {
                ...widgetData,
                updatedAt: new Date()
            } as any);
            toast.success('Widget created successfully');
            router.push('/dashboard/widgets');
        } catch (err) {
            console.error('Failed to create widget:', err);
            toast.error('Failed to create widget');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Create New Widget</h1>
                <p className="text-muted small mb-0">Add a new reusable component to your site</p>
            </div>

            <WidgetEditor
                widget={{
                    type: 'mini_calculator',
                    isActive: true,
                    order: 0,
                    config: {}
                }}
                onSave={handleSave}
                loading={loading}
            />
        </div>
    );
}
