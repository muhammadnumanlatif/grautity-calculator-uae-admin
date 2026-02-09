'use client';

import { useState } from 'react';
import { PageBlock } from '@gratuity/shared/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { INITIAL_BLOCKS } from '@/constants/blocks';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlockEditorProps {
    blocks: PageBlock[];
    onChange: (blocks: PageBlock[]) => void;
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
    const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpandedBlocks(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newBlocks = Array.from(blocks);
        const [reorderedBlock] = newBlocks.splice(result.source.index, 1);
        newBlocks.splice(result.destination.index, 0, reorderedBlock);
        onChange(newBlocks);
    };

    const addBlock = (type: PageBlock['type']) => {
        const newBlock = {
            ...INITIAL_BLOCKS[type],
            id: `block_${Date.now()}`
        };
        onChange([...blocks, newBlock]);
        setExpandedBlocks(prev => ({ ...prev, [newBlock.id]: true }));
        toast.success(`Added ${type} block`);
    };

    const removeBlock = (id: string) => {
        if (confirm('Are you sure you want to remove this block?')) {
            onChange(blocks.filter(b => b.id !== id));
        }
    };

    const updateBlockData = (id: string, data: any) => {
        onChange(blocks.map(b => b.id === id ? { ...b, data: { ...b.data, ...data } } : b));
    };

    return (
        <div className="block-editor">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="page-blocks">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="blocks-list mb-4">
                            {blocks.map((block, index) => (
                                <Draggable key={block.id} draggableId={block.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="card mb-3 border-0 shadow-sm rounded-4 overflow-hidden"
                                        >
                                            <div className="card-header bg-white border-bottom-0 py-3 d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div {...provided.dragHandleProps} className="drag-handle text-muted" style={{ cursor: 'grab' }}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" />
                                                            <circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle uppercase ls-1 mr-2" style={{ fontSize: '0.65rem' }}>
                                                            {block.type}
                                                        </span>
                                                        <span className="fw-bold small">{(block.data as any).title || (block.data as any).text || (block.type === 'hero' ? (block.data as any).title : 'Block Content')}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button type="button" className="btn btn-sm btn-light" onClick={() => toggleExpand(block.id)}>
                                                        {expandedBlocks[block.id] ? 'Collapse' : 'Edit'}
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeBlock(block.id)}>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {expandedBlocks[block.id] && (
                                                <div className="card-body bg-light border-top p-4">
                                                    {block.type === 'hero' && (
                                                        <div className="row g-3">
                                                            <div className="col-12">
                                                                <label className="form-label small fw-bold">Title</label>
                                                                <input type="text" className="form-control" value={block.data.title || ''} onChange={e => updateBlockData(block.id, { title: e.target.value })} />
                                                            </div>
                                                            <div className="col-12">
                                                                <label className="form-label small fw-bold">Subtitle</label>
                                                                <textarea className="form-control" rows={2} value={block.data.subtitle || ''} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {block.type === 'rich-text' && (
                                                        <div className="col-12">
                                                            <label className="form-label small fw-bold">Content</label>
                                                            <div className="bg-white rounded">
                                                                <ReactQuill
                                                                    theme="snow"
                                                                    value={block.data.content || ''}
                                                                    onChange={val => updateBlockData(block.id, { content: val })}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {block.type === 'calculator' && (
                                                        <div className="row g-3">
                                                            <div className="col-md-6">
                                                                <label className="form-label small fw-bold">Default Contract Type</label>
                                                                <select className="form-select" value={block.data.defaultContractType || ''} onChange={e => updateBlockData(block.id, { defaultContractType: e.target.value })}>
                                                                    <option value="unlimited">Unlimited</option>
                                                                    <option value="limited">Limited</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="form-label small fw-bold">Title Overlay (Optional)</label>
                                                                <input type="text" className="form-control" value={block.data.title || ''} onChange={e => updateBlockData(block.id, { title: e.target.value })} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {block.type === 'faq' && (
                                                        <div className="faq-editor">
                                                            <label className="form-label small fw-bold">FAQ Items</label>
                                                            {(block.data.items || []).map((faq: any, i: number) => (
                                                                <div key={i} className="mb-3 p-3 border rounded bg-white position-relative">
                                                                    <button type="button" className="btn-close position-absolute top-0 end-0 m-2" style={{ fontSize: '0.6rem' }} onClick={() => {
                                                                        const newItems = [...block.data.items];
                                                                        newItems.splice(i, 1);
                                                                        updateBlockData(block.id, { items: newItems });
                                                                    }}></button>
                                                                    <input type="text" className="form-control form-control-sm mb-2 fw-bold" placeholder="Question" value={faq.question} onChange={e => {
                                                                        const newItems = [...block.data.items];
                                                                        newItems[i].question = e.target.value;
                                                                        updateBlockData(block.id, { items: newItems });
                                                                    }} />
                                                                    <textarea className="form-control form-control-sm" rows={2} placeholder="Answer" value={faq.answer} onChange={e => {
                                                                        const newItems = [...block.data.items];
                                                                        newItems[i].answer = e.target.value;
                                                                        updateBlockData(block.id, { items: newItems });
                                                                    }} />
                                                                </div>
                                                            ))}
                                                            <button type="button" className="btn btn-sm btn-outline-secondary w-100" onClick={() => {
                                                                const newItems = [...(block.data.items || []), { question: '', answer: '' }];
                                                                updateBlockData(block.id, { items: newItems });
                                                            }}>+ Add FAQ</button>
                                                        </div>
                                                    )}

                                                    {block.type === 'table' && (
                                                        <div className="table-editor">
                                                            <div className="mb-3">
                                                                <label className="form-label small fw-bold">Headers (comma separated)</label>
                                                                <input type="text" className="form-control" value={block.data.headers?.join(', ') || ''} onChange={e => updateBlockData(block.id, { headers: e.target.value.split(',').map(s => s.trim()) })} />
                                                            </div>
                                                            <label className="form-label small fw-bold">Rows</label>
                                                            {(block.data.rows || []).map((row: any, i: number) => (
                                                                <div key={i} className="d-flex gap-2 mb-2 align-items-center">
                                                                    <span className="text-muted small">Row {i + 1}</span>
                                                                    {row.cells.map((cell: string, ci: number) => (
                                                                        <input key={ci} type="text" className="form-control form-control-sm" value={cell} onChange={e => {
                                                                            const newRows = [...block.data.rows];
                                                                            newRows[i].cells[ci] = e.target.value;
                                                                            updateBlockData(block.id, { rows: newRows });
                                                                        }} />
                                                                    ))}
                                                                    <button type="button" className="btn btn-sm btn-text text-danger" onClick={() => {
                                                                        const newRows = [...block.data.rows];
                                                                        newRows.splice(i, 1);
                                                                        updateBlockData(block.id, { rows: newRows });
                                                                    }}>×</button>
                                                                </div>
                                                            ))}
                                                            <button type="button" className="btn btn-sm btn-outline-secondary w-100" onClick={() => {
                                                                const colCount = block.data.headers?.length || 2;
                                                                const newRows = [...(block.data.rows || []), { cells: Array(colCount).fill('') }];
                                                                updateBlockData(block.id, { rows: newRows });
                                                            }}>+ Add Row</button>
                                                        </div>
                                                    )}

                                                    {block.type === 'cta' && (
                                                        <div className="cta-editor row g-3">
                                                            <div className="col-12">
                                                                <label className="form-label small fw-bold">Title</label>
                                                                <input type="text" className="form-control" value={block.data.title || ''} onChange={e => updateBlockData(block.id, { title: e.target.value })} />
                                                            </div>
                                                            <div className="col-12">
                                                                <label className="form-label small fw-bold">Button Label</label>
                                                                <input type="text" className="form-control mb-2" value={block.data.buttons?.[0]?.label || ''} onChange={e => {
                                                                    const newBtns = [...(block.data.buttons || [])];
                                                                    if (!newBtns[0]) newBtns[0] = { label: '', url: '', variant: 'primary' };
                                                                    newBtns[0].label = e.target.value;
                                                                    updateBlockData(block.id, { buttons: newBtns });
                                                                }} />
                                                                <label className="form-label small fw-bold">Button URL</label>
                                                                <input type="text" className="form-control" value={block.data.buttons?.[0]?.url || ''} onChange={e => {
                                                                    const newBtns = [...(block.data.buttons || [])];
                                                                    if (!newBtns[0]) newBtns[0] = { label: '', url: '', variant: 'primary' };
                                                                    newBtns[0].url = e.target.value;
                                                                    updateBlockData(block.id, { buttons: newBtns });
                                                                }} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Additional block type editors would go here */}
                                                    {!['hero', 'rich-text', 'calculator', 'faq', 'table', 'cta'].includes(block.type) && (
                                                        <div className="alert alert-warning py-2 small mb-0">
                                                            Editor for <strong>{block.type}</strong> is under development.
                                                            <div className="mt-2">
                                                                <label className="form-label x-small fw-bold">Raw JSON Data</label>
                                                                <textarea className="form-control form-control-sm font-monospace" rows={5} value={JSON.stringify(block.data, null, 2)} onChange={e => {
                                                                    try { updateBlockData(block.id, JSON.parse(e.target.value)); } catch (e) { }
                                                                }} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="add-block-zone bg-white p-4 rounded-4 border-dashed border-2 text-center">
                <h6 className="fw-bold mb-3">Add Content Block</h6>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={() => addBlock('hero')}>+ Hero</button>
                    <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={() => addBlock('rich-text')}>+ Text</button>
                    <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={() => addBlock('calculator')}>+ Calculator</button>
                    <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={() => addBlock('faq')}>+ FAQ</button>
                    <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={() => addBlock('table')}>+ Table</button>
                    <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={() => addBlock('cta')}>+ CTA</button>
                    <button type="button" className="btn btn-sm btn-outline-primary px-3" onClick={() => addBlock('cards')}>+ Cards</button>
                </div>
            </div>

            <style jsx>{`
                .drag-handle { cursor: grab; }
                .border-dashed { border-style: dashed !important; border-color: #dee2e6 !important; }
                .ls-1 { letter-spacing: 0.05rem; }
                .uppercase { text-transform: uppercase; }
                .x-small { font-size: 0.7rem; }
            `}</style>
        </div>
    );
}
