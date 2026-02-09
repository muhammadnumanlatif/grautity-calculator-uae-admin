'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getDocument, updateDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { MenuConfig, MenuItem } from '@gratuity/shared/types';
import MenuEditor from '@/components/menus/MenuEditor';
import MenuPreview from '@/components/menus/MenuPreview';
import { DEFAULT_MENUS } from '@/lib/menu-defaults';
import toast from 'react-hot-toast';

export default function EditMenuPage() {
    const router = useRouter();
    const params = useParams();
    const menuId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: 'header_main' as MenuConfig['location'],
        isActive: true,
    });
    const [items, setItems] = useState<MenuItem[]>([]);

    const loadMenu = useCallback(async () => {
        try {
            const menu = await getDocument<MenuConfig>(COLLECTIONS.MENUS, menuId);
            if (menu) {
                setFormData({
                    name: menu.name,
                    location: menu.location,
                    isActive: menu.isActive,
                });
                setItems(menu.items);
            }
        } catch (error) {
            console.error('Failed to load menu:', error);
        } finally {
            setLoading(false);
        }
    }, [menuId]);

    useEffect(() => {
        loadMenu();
    }, [loadMenu]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const menuData: Partial<MenuConfig> = {
                ...formData,
                items,
                updatedAt: new Date(),
            };

            await updateDocument(COLLECTIONS.MENUS, menuId, menuData);
            router.push('/dashboard/menus');
        } catch (error) {
            console.error('Failed to update menu:', error);
            alert('Failed to update menu');
        } finally {
            setSaving(false);
        }
    };

    const handleRestoreDefaults = () => {
        const defaultData = DEFAULT_MENUS[formData.location];
        if (!defaultData) {
            toast.error('No default configuration found for this location');
            return;
        }

        if (window.confirm('Are you sure you want to restore this menu to its default state? All unsaved changes will be lost.')) {
            setFormData({
                ...formData,
                name: defaultData.name || formData.name,
            });
            setItems(defaultData.items || []);
            toast.success('Restored to default structure. Don\'t forget to save!');
        }
    };

    if (loading) {
        return (
            <div className="container-fluid py-4">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Edit Menu</h1>
                <p className="text-muted small mb-0">Update your navigation menu</p>
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
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <MenuEditor items={items} onChange={setItems} />
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '20px' }}>
                            <h5 className="fw-bold mb-3">Update</h5>

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
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </button>
                                <hr className="my-2" />
                                <button
                                    type="button"
                                    className="btn btn-light btn-sm text-danger border"
                                    onClick={handleRestoreDefaults}
                                >
                                    Restore to Default
                                </button>
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
