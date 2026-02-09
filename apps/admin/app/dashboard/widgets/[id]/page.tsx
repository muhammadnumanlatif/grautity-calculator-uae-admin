'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getDocument, updateDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Widget } from '@gratuity/shared/types';
import WidgetEditor from '@/components/widgets/WidgetEditor';
import { toast } from 'react-hot-toast';

export default function EditWidgetPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const [widget, setWidget] = useState<Widget | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchWidget = async () => {
            try {
                const data = await getDocument<Widget>(COLLECTIONS.WIDGETS, id);
                if (data) {
                    setWidget(data);
                } else {
                    toast.error('Widget not found');
                    router.push('/dashboard/widgets');
                }
            } catch (err) {
                console.error('Failed to fetch widget:', err);
                toast.error('Failed to load widget');
            } finally {
                setLoading(false);
            }
        };
        fetchWidget();
    }, [id, router]);

    const handleSave = async (widgetData: Partial<Widget>) => {
        setSaving(true);
        try {
            await updateDocument(COLLECTIONS.WIDGETS, id, widgetData);
            toast.success('Widget updated successfully');
            router.push('/dashboard/widgets');
        } catch (err) {
            console.error('Failed to update widget:', err);
            toast.error('Failed to update widget');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="container-fluid py-5 text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Loading widget data...</p>
            </div>
        );
    }

    if (!widget) return null;

    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Edit Widget</h1>
                <p className="text-muted small mb-0">Update widget: {widget.title}</p>
            </div>

            <WidgetEditor
                widget={widget}
                onSave={handleSave}
                loading={saving}
            />
        </div>
    );
}
