'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { MenuConfig, MenuItem } from '@gratuity/shared/types';
import MenuEditor from '@/components/menus/MenuEditor';
import MenuPreview from '@/components/menus/MenuPreview';

export default function NewMenuPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: 'header_main' as MenuConfig['location'],
        isActive: true,
    });
    const [items, setItems] = useState<MenuItem[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const menuData: Omit<MenuConfig, 'id'> = {
                ...formData,
                items,
                updatedAt: new Date(),
            };

            await createDocument(COLLECTIONS.MENUS, menuData);
            router.push('/dashboard/menus');
        } catch (error) {
            console.error('Failed to create menu:', error);
            alert('Failed to create menu');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Create New Menu</h1>
                <p className="text-muted small mb-0">Build a custom navigation menu</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                            <h5 className="fw-bold mb-3">Menu Details</h5>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Menu Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Main Navigation"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Location</label>
                                <select
                                    className="form-select"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
                                    required
                                >
                                    <option value="header_main">Header - Main Navigation</option>
                                    <option value="header_top">Header - Top Bar</option>
                                    <option value="footer_col_1">Footer - Column 1</option>
                                    <option value="footer_col_2">Footer - Column 2</option>
                                    <option value="footer_col_3">Footer - Column 3</option>
                                    <option value="footer_col_4">Footer - Column 4</option>
                                    <option value="mobile_main">Mobile - Main Menu</option>
                                    <option value="mobile_bottom_nav">Mobile - Bottom Navigation</option>
                                </select>
                                <small className="text-muted">Choose where this menu will appear on your site</small>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <MenuEditor items={items} onChange={setItems} />
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '20px' }}>
                            <h5 className="fw-bold mb-3">Publish</h5>

                            <div className="form-check form-switch mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="isActive">
                                    Active
                                </label>
                            </div>

                            <div className="d-grid gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving || !formData.name}
                                >
                                    {saving ? 'Creating...' : 'Create Menu'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </button>
                            </div>

                            <hr className="my-3" />

                            <div className="small text-muted">
                                <p className="mb-2"><strong>Tips:</strong></p>
                                <ul className="ps-3 mb-0">
                                    <li>Drag items to reorder</li>
                                    <li>Use Mega Menus for complex navigation</li>
                                    <li>Keep mobile menus simple</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-3">
                            <MenuPreview items={items} location={formData.location} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
