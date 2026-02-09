'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Page, BlogPost, ContentStatus } from '@gratuity/shared/types';

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { suggestMETATags, generateFAQSchema, suggestInternalLinks } from '@/app/dashboard/seo/actions';
import { toast } from 'react-hot-toast';
import { FAQItem, InternalLink } from '@gratuity/shared/types';
import { useEffect } from 'react';
import { getDocuments, COLLECTIONS } from '@gratuity/firebase-config/firestore';

const contentSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    slug: z.string().min(2, 'Slug is required'),
    content: z.string().min(10, 'Content is too short'),
    status: z.enum(['draft', 'published', 'scheduled', 'archived']),
    metaTitle: z.string().max(70).optional(),
    metaDescription: z.string().max(160).optional(),
    focusKeyword: z.string().optional(),
});

type ContentFormData = z.infer<typeof contentSchema>;

interface ContentEditorProps {
    initialData?: Partial<Page | BlogPost>;
    type: 'page' | 'blog';
    onSave: (data: any) => Promise<void>;
}

export default function ContentEditor({ initialData, type, onSave }: ContentEditorProps) {
    const [activeTab, setActiveTab] = useState('content');
    const [isSaving, setIsSaving] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [generatedFaqs, setGeneratedFaqs] = useState<FAQItem[]>([]);
    const [linkSuggestions, setLinkSuggestions] = useState<InternalLink[]>([]);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContentFormData>({
        resolver: zodResolver(contentSchema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            content: initialData?.content || '',
            status: (initialData?.status as ContentStatus) || 'draft',
            metaTitle: initialData?.seo?.metaTitle || '',
            metaDescription: initialData?.seo?.metaDescription || '',
            focusKeyword: initialData?.seo?.focusKeyword || '',
        },
    });

    const contentValue = watch('content');
    const titleValue = watch('title');

    const handleAiOptimize = async () => {
        if (!titleValue || !contentValue) {
            toast.error('Please enter a title and content first.');
            return;
        }

        setIsAiLoading(true);
        try {
            const suggestions = await suggestMETATags(titleValue, contentValue);
            setValue('metaTitle', suggestions.metaTitle);
            setValue('metaDescription', suggestions.metaDescription);
            setValue('focusKeyword', suggestions.focusKeyword);
            toast.success('SEO Tags optimized by AI!');
        } catch (err) {
            toast.error('AI Suggestion failed.');
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleAiFaqs = async () => {
        if (!titleValue || !contentValue) return;
        setIsAiLoading(true);
        try {
            const faqs = await generateFAQSchema(titleValue, contentValue);
            setGeneratedFaqs(faqs);
            toast.success('AI FAQs generated!');
        } catch (err) {
            toast.error('AI FAQ generation failed.');
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleSmartLinks = async () => {
        if (!contentValue) return;
        setIsAiLoading(true);
        try {
            const allPages = await getDocuments(COLLECTIONS.PAGES);
            const suggestions = await suggestInternalLinks(contentValue, allPages as any);
            setLinkSuggestions(suggestions);
            if (suggestions.length === 0) toast('No internal links suggestable for this content.');
            else toast.success(`${suggestions.length} internal links suggested!`);
        } catch (err) {
            toast.error('Smart Linker failed.');
        } finally {
            setIsAiLoading(false);
        }
    };

    const onFormSubmit = async (data: ContentFormData) => {
        setIsSaving(true);
        try {
            await onSave(data);
        } catch (err) {
            console.error('Editor Error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="content-editor h-100 d-flex flex-column">
            <div className="editor-toolbar bg-white border-bottom py-2 px-4 d-flex justify-content-between align-items-center">
                <ul className="nav nav-pills small fw-bold">
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${activeTab === 'content' ? 'active' : ''}`}
                            onClick={() => setActiveTab('content')}
                        >
                            Content
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${activeTab === 'seo' ? 'active' : ''}`}
                            onClick={() => setActiveTab('seo')}
                        >
                            SEO / Metadata
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            Settings
                        </button>
                    </li>
                </ul>
                <div className="d-flex gap-2">
                    <select className="form-select form-select-sm" {...register('status')}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                    </select>
                    <button type="submit" className="btn btn-primary btn-sm px-4" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="editor-body flex-grow-1 overflow-auto bg-light p-4">
                <div className="container-fluid">
                    {activeTab === 'content' && (
                        <div className="editor-content-pane mx-auto" style={{ maxWidth: '900px' }}>
                            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                                <input
                                    type="text"
                                    className="form-control form-control-lg border-0 fw-bold fs-2 mb-2 p-0 shadow-none"
                                    placeholder="Enter page title..."
                                    {...register('title')}
                                />
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <span className="text-muted small">URL: gratuitycalculator.ae/</span>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm border-0 bg-light w-auto p-1 px-2"
                                        {...register('slug')}
                                    />
                                </div>

                                <div className="quill-wrapper" style={{ height: '500px' }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={contentValue}
                                        onChange={(val) => setValue('content', val)}
                                        style={{ height: '450px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'seo' && (
                        <div className="seo-pane mx-auto" style={{ maxWidth: '700px' }}>
                            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="fw-bold mb-0 text-primary">Google Search Preview</h5>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
                                        onClick={handleAiOptimize}
                                        disabled={isAiLoading}
                                    >
                                        {isAiLoading ? (
                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                            </svg>
                                        )}
                                        AI Auto-Optimize
                                    </button>
                                </div>
                                <div className="google-preview p-3 border rounded bg-white mb-4">
                                    <div className="text-primary fs-5 mb-1 text-truncate">
                                        {watch('metaTitle') || watch('title') || 'Page Title'}
                                    </div>
                                    <div className="text-success small mb-1">
                                        gratuitycalculator.ae/{watch('slug')}
                                    </div>
                                    <div className="text-muted small lh-sm">
                                        {watch('metaDescription') || 'Please enter a meta description to see how this page will appear in Google search results.'}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold small">SEO Title</label>
                                    <input type="text" className="form-control" {...register('metaTitle')} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold small">Meta Description</label>
                                    <textarea className="form-control" rows={3} {...register('metaDescription')} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold small">Focus Keyword</label>
                                    <input type="text" className="form-control" {...register('focusKeyword')} />
                                </div>
                            </div>

                            <div className="card border-0 shadow-sm p-4 rounded-4 mt-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-bold mb-0">AI Suggested FAQs</h5>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light border"
                                        onClick={handleAiFaqs}
                                        disabled={isAiLoading}
                                    >
                                        Regenerate
                                    </button>
                                </div>

                                {generatedFaqs.length === 0 ? (
                                    <div className="text-center py-4 bg-light rounded-3 border border-dashed text-muted small">
                                        No FAQs generated yet.
                                        <button type="button" className="btn btn-link btn-sm text-decoration-none" onClick={handleAiFaqs}>
                                            Generate with AI
                                        </button>
                                    </div>
                                ) : (
                                    <div className="faq-list">
                                        {generatedFaqs.map((faq, i) => (
                                            <div key={i} className="faq-item p-3 border rounded-3 mb-2 bg-white">
                                                <div className="fw-bold small mb-1">Q: {faq.question}</div>
                                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>A: {faq.answer}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="settings-pane mx-auto" style={{ maxWidth: '700px' }}>
                            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                                <h5 className="fw-bold mb-3">Smart Linker</h5>
                                <p className="text-muted small">Automatically find relevant pages to link to within this content.</p>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary d-flex align-items-center gap-2 mb-3"
                                    onClick={handleSmartLinks}
                                    disabled={isAiLoading}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                    Scan for Internal Links
                                </button>

                                {linkSuggestions.length > 0 && (
                                    <div className="list-group list-group-flush">
                                        {linkSuggestions.map((link, i) => (
                                            <div key={i} className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center">
                                                <div>
                                                    <div className="fw-bold small">{link.anchor}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>/{link.url}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-light"
                                                    onClick={() => toast('Copy code: <a href="/' + link.url + '">' + link.anchor + '</a>')}
                                                >
                                                    Copy Link
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="card border-0 shadow-sm p-4 rounded-4">
                                <h5 className="fw-bold mb-3">Publication Details</h5>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Author</label>
                                    <select className="form-select bg-light border-0">
                                        <option>Admin User</option>
                                        <option>Ahmed Hannan (Expert) </option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Publish Date</label>
                                    <input type="date" className="form-control bg-light border-0" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .editor-content-pane input:focus { outline: none; }
        .google-preview { border-left: 4px solid #4285f4 !important; }
      `}</style>
        </form>
    );
}
