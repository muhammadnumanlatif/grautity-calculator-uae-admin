'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDocuments, deleteDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { MenuConfig } from '@gratuity/shared/types';

export default function MenusPage() {
    const [menus, setMenus] = useState<MenuConfig[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMenus();
    }, []);

    const loadMenus = async () => {
        try {
            const data = await getDocuments<MenuConfig>(COLLECTIONS.MENUS);
            setMenus(data);
        } catch (error) {
            console.error('Failed to load menus:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this menu?')) return;

        try {
            await deleteDocument(COLLECTIONS.MENUS, id);
            setMenus(menus.filter(m => m.id !== id));
        } catch (error) {
            console.error('Failed to delete menu:', error);
            alert('Failed to delete menu');
        }
    };

    const toggleActive = async (menu: MenuConfig) => {
        // This would update the menu's isActive status
        console.log('Toggle active:', menu.id);
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">Menu Management</h1>
                    <p className="text-muted small mb-0">Create and manage navigation menus for your site</p>
                </div>
                <Link href="/dashboard/menus/new" className="btn btn-primary">
                    + Create Menu
                </Link>
            </div>

            {menus.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                    <div className="mb-3">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    </div>
                    <h5 className="fw-bold mb-2">No Menus Yet</h5>
                    <p className="text-muted mb-3">Create your first menu to manage site navigation</p>
                    <Link href="/dashboard/menus/new" className="btn btn-primary">
                        Create Your First Menu
                    </Link>
                </div>
            ) : (
                <div className="row g-3">
                    {menus.map((menu) => (
                        <div key={menu.id} className="col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <h5 className="fw-bold mb-1">{menu.name}</h5>
                                            <span className="badge bg-light text-dark small">{menu.location}</span>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={menu.isActive}
                                                onChange={() => toggleActive(menu)}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-muted small mb-3">
                                        {menu.items.length} item{menu.items.length !== 1 ? 's' : ''}
                                    </div>

                                    <div className="d-flex gap-2">
                                        <Link
                                            href={`/dashboard/menus/${menu.id}`}
                                            className="btn btn-sm btn-outline-primary flex-grow-1"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(menu.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
