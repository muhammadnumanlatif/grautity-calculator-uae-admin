'use client';

import { useState, useEffect } from 'react';
import { getDocument, setDocument, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { SiteSettings } from '@gratuity/shared/types';
import { toast } from 'react-hot-toast';

export default function SettingsPage() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'general' | 'social' | 'footer'>('general');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // We use a fixed ID 'global' for site-wide settings
                const data = await getDocument<SiteSettings>(COLLECTIONS.SITE_SETTINGS, 'global');
                if (data) {
                    setSettings(data);
                } else {
                    // Initialize with defaults if not found
                    const defaults: SiteSettings = {
                        general: {
                            siteName: 'Gratuity Calculator UAE',
                            siteDescription: 'Expert gratuity calculation for UAE employees.',
                            contactEmail: 'info@gratuitycalculator.ae',
                        },
                        socialLinks: {},
                        footer: {
                            copyrightText: `© ${new Date().getFullYear()} Gratuity Calculator UAE. All rights reserved.`,
                        },
                        updatedAt: new Date()
                    };
                    setSettings(defaults);
                }
            } catch (err) {
                console.error('Failed to fetch settings:', err);
                toast.error('Failed to load settings');
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (section: keyof SiteSettings, field: string, value: string) => {
        if (!settings) return;
        setSettings({
            ...settings,
            [section]: {
                ...(settings[section] as any),
                [field]: value
            }
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;

        setSaving(true);
        try {
            await setDocument(COLLECTIONS.SITE_SETTINGS, 'global', {
                ...settings,
                updatedAt: new Date()
            });
            toast.success('Settings saved successfully!');
        } catch (err) {
            console.error('Save error:', err);
            toast.error('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Site Settings</h1>
                <p className="text-muted small">Configure global website parameters and social links.</p>
            </div>

            <div className="row g-4">
                <div className="col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="list-group list-group-flush">
                            <button
                                className={`list-group-item list-group-item-action py-3 px-4 border-0 ${activeTab === 'general' ? 'active bg-primary text-white' : ''}`}
                                onClick={() => setActiveTab('general')}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-5">⚙️</span>
                                    <div className="fw-bold small">General Info</div>
                                </div>
                            </button>
                            <button
                                className={`list-group-item list-group-item-action py-3 px-4 border-0 ${activeTab === 'social' ? 'active bg-primary text-white' : ''}`}
                                onClick={() => setActiveTab('social')}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-5">🌐</span>
                                    <div className="fw-bold small">Social Links</div>
                                </div>
                            </button>
                            <button
                                className={`list-group-item list-group-item-action py-3 px-4 border-0 ${activeTab === 'footer' ? 'active bg-primary text-white' : ''}`}
                                onClick={() => setActiveTab('footer')}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fs-5">📑</span>
                                    <div className="fw-bold small">Footer Config</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-9">
                    <form onSubmit={handleSave} className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
                        {activeTab === 'general' && (
                            <div className="fade-in">
                                <h5 className="fw-bold mb-4 border-bottom pb-2">General Information</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted uppercase">Site Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settings?.general.siteName || ''}
                                            onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted uppercase">Tagline</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settings?.general.tagline || ''}
                                            onChange={(e) => handleChange('general', 'tagline', e.target.value)}
                                            placeholder="e.g., Simple, Fast, Accurate"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted uppercase">Contact Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={settings?.general.contactEmail || ''}
                                            onChange={(e) => handleChange('general', 'contactEmail', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-muted uppercase">Site Description</label>
                                        <textarea
                                            className="form-control"
                                            rows={2}
                                            value={settings?.general.siteDescription || ''}
                                            onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted uppercase">Contact Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settings?.general.contactPhone || ''}
                                            onChange={(e) => handleChange('general', 'contactPhone', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-muted uppercase">Office Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settings?.general.address || ''}
                                            onChange={(e) => handleChange('general', 'address', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 border-top pt-3 mt-3">
                                        <h6 className="fw-bold mb-3">Branding & Assets</h6>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-muted uppercase">Logo URL</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">🖼️</span>
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        value={settings?.general.logoUrl || ''}
                                                        onChange={(e) => handleChange('general', 'logoUrl', e.target.value)}
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-muted uppercase">Dark Mode Logo URL</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">🌙</span>
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        value={settings?.general.logoDarkUrl || ''}
                                                        onChange={(e) => handleChange('general', 'logoDarkUrl', e.target.value)}
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-muted uppercase">Favicon URL (32x32)</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">🌐</span>
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        value={settings?.general.faviconUrl || ''}
                                                        onChange={(e) => handleChange('general', 'faviconUrl', e.target.value)}
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-muted uppercase">Apple Touch Icon (180x180)</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">📱</span>
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        value={settings?.general.appleTouchIcon || ''}
                                                        onChange={(e) => handleChange('general', 'appleTouchIcon', e.target.value)}
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'social' && (
                            <div className="fade-in">
                                <h5 className="fw-bold mb-4 border-bottom pb-2">Social Media Presense</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted uppercase">Facebook URL</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="https://facebook.com/..."
                                            value={settings?.socialLinks.facebook || ''}
                                            onChange={(e) => handleChange('socialLinks', 'facebook', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted uppercase">Twitter / X URL</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="https://x.com/..."
                                            value={settings?.socialLinks.twitter || ''}
                                            onChange={(e) => handleChange('socialLinks', 'twitter', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted uppercase">LinkedIn URL</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="https://linkedin.com/company/..."
                                            value={settings?.socialLinks.linkedin || ''}
                                            onChange={(e) => handleChange('socialLinks', 'linkedin', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted uppercase">Instagram URL</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="https://instagram.com/..."
                                            value={settings?.socialLinks.instagram || ''}
                                            onChange={(e) => handleChange('socialLinks', 'instagram', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'footer' && (
                            <div className="fade-in">
                                <h5 className="fw-bold mb-4 border-bottom pb-2">Footer Customization</h5>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-muted uppercase">Copyright Text</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settings?.footer.copyrightText || ''}
                                            onChange={(e) => handleChange('footer', 'copyrightText', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-muted uppercase">Disclaimer / Legal Notice</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            value={settings?.footer.disclaimer || ''}
                                            onChange={(e) => handleChange('footer', 'disclaimer', e.target.value)}
                                            placeholder="The calculation provided is for information purposes only..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-5 pt-4 border-top d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-light px-4">Discard Changes</button>
                            <button type="submit" className="btn btn-primary px-5 fw-bold shadow-sm" disabled={saving}>
                                {saving ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .fade-in {
                    animation: fadeIn 0.3s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .uppercase { text-transform: uppercase; letter-spacing: 0.5px; }
            `}</style>
        </div>
    );
}
