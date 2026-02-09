'use client';

import { useState } from 'react';
import { Widget } from '@gratuity/shared/types';

interface WidgetEditorProps {
    widget: Partial<Widget>;
    onSave: (widget: Partial<Widget>) => void;
    loading?: boolean;
}

export default function WidgetEditor({ widget: initialWidget, onSave, loading }: WidgetEditorProps) {
    const [widget, setWidget] = useState<Partial<Widget>>(initialWidget);

    const handleChange = (field: keyof Widget, value: any) => {
        setWidget(prev => ({ ...prev, [field]: value }));
    };

    const handleConfigChange = (key: string, value: any) => {
        setWidget(prev => ({
            ...prev,
            config: { ...prev.config, [key]: value }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(widget);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                        <h5 className="fw-bold mb-4">Basic Information</h5>
                        <div className="mb-3">
                            <label className="form-label small fw-bold uppercase ls-1">Widget Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={widget.title || ''}
                                onChange={e => handleChange('title', e.target.value)}
                                placeholder="e.g. Sidebar Calculator"
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label small fw-bold uppercase ls-1">Widget Type</label>
                                <select
                                    className="form-select"
                                    value={widget.type || 'mini_calculator'}
                                    onChange={e => handleChange('type', e.target.value)}
                                    required
                                >
                                    <option value="mini_calculator">Mini Calculator</option>
                                    <option value="newsletter_box">Newsletter Box</option>
                                    <option value="recent_posts">Recent Posts</option>
                                    <option value="social_proof">Social Proof</option>
                                    <option value="custom_html">Custom HTML</option>
                                    <option value="cta_banner">CTA Banner</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label small fw-bold uppercase ls-1">Display Order</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={widget.order || 0}
                                    onChange={e => handleChange('order', parseInt(e.target.value))}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-check form-switch mt-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="activeSwitch"
                                checked={widget.isActive}
                                onChange={e => handleChange('isActive', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="activeSwitch">Widget is Active</label>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-4">Configuration</h5>

                        {widget.type === 'custom_html' && (
                            <div className="mb-3">
                                <label className="form-label small fw-bold uppercase ls-1">HTML Content</label>
                                <textarea
                                    className="form-control"
                                    rows={10}
                                    style={{ fontFamily: 'monospace' }}
                                    value={widget.config?.html || ''}
                                    onChange={e => handleConfigChange('html', e.target.value)}
                                    placeholder="<div class='custom-widget'>...</div>"
                                ></textarea>
                            </div>
                        )}

                        {widget.type === 'cta_banner' && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold uppercase ls-1">Button Text</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={widget.config?.buttonText || ''}
                                        onChange={e => handleConfigChange('buttonText', e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold uppercase ls-1">Button Link</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={widget.config?.buttonLink || ''}
                                        onChange={e => handleConfigChange('buttonLink', e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold uppercase ls-1">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={widget.config?.description || ''}
                                        onChange={e => handleConfigChange('description', e.target.value)}
                                    ></textarea>
                                </div>
                            </>
                        )}

                        {widget.type === 'mini_calculator' && (
                            <div className="alert alert-info py-2 small">
                                The Mini Calculator widget uses default settings. You can optionally override the title above.
                            </div>
                        )}

                        {(!widget.type || !['custom_html', 'cta_banner', 'mini_calculator'].includes(widget.type)) && (
                            <p className="text-muted small">Specialized configuration for this widget type will be added soon.</p>
                        )}
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '2rem' }}>
                        <h6 className="fw-bold mb-3">Publishing</h6>
                        <p className="text-muted small mb-4">
                            Changes will be saved to Firestore and reflected on the site immediately.
                        </p>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                            disabled={loading}
                        >
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            {widget.id ? 'Update Widget' : 'Create Widget'}
                        </button>
                        <hr className="my-4" />
                        <button type="button" className="btn btn-outline-danger w-100" onClick={() => window.history.back()}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ls-1 { letter-spacing: 0.05rem; }
                .uppercase { text-transform: uppercase; }
            `}</style>
        </form>
    );
}
