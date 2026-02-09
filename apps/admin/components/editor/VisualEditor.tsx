'use client';

import React, { useState } from 'react';
import { PageBlock } from '@gratuity/shared';
// Drag and Drop
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, DragOverEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Components
import DraggableBlock from './DraggableBlock';
import DroppableBlock from './DroppableBlock';
import BlockSettingsModal from './BlockSettingsModal';
import { INITIAL_BLOCKS } from '@/constants/blocks';

interface VisualEditorProps {
    initialBlocks: PageBlock[];
    onBlocksChange: (blocks: PageBlock[]) => void;
}

export default function VisualEditor({ initialBlocks = [], onBlocksChange }: VisualEditorProps) {
    const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [editingBlock, setEditingBlock] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setBlocks((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over?.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                onBlocksChange(newItems);
                return newItems;
            });
        }

        setActiveId(null);
    };

    const handleAddBlock = (type: PageBlock['type']) => {
        const initialData = INITIAL_BLOCKS[type] ? JSON.parse(JSON.stringify(INITIAL_BLOCKS[type].data)) : {};

        const newBlock: PageBlock = {
            id: `block-${Date.now()}`,
            type: type,
            data: initialData
        } as any;

        const newItems = [...blocks, newBlock];
        setBlocks(newItems);
        onBlocksChange(newItems);
    };

    const handleUpdateBlock = (id: string, updatedBlock: PageBlock) => {
        const newItems = blocks.map(b => (b.id === id ? updatedBlock : b));
        setBlocks(newItems);
        onBlocksChange(newItems);
    };

    const handleDeleteBlock = (id: string) => {
        const newItems = blocks.filter(b => b.id !== id);
        setBlocks(newItems);
        onBlocksChange(newItems);
    };

    return (
        <div className="d-flex h-100 border">
            {/* Sidebar */}
            <div className="bg-white border-end" style={{ width: '280px', overflowY: 'auto' }}>
                <div className="p-3">
                    <h6 className="text-secondary text-uppercase small fw-bold mb-3">Add Components</h6>
                    <div className="d-grid gap-2">
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('hero')}>Hero Section</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('calculator')}>Gratuity Calculator</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('rich-text')}>Rich Text</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('heading')}>Heading</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('paragraph')}>Paragraph</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('image')}>Image</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('video')}>Video</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('link')}>Link/Button</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('cards')}>Cards Grid</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('table')}>Table</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('faq')}>FAQ Section</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('cta')}>Call to Action</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('separator')}>Separator</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('table-of-contents')}>Table of Contents</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('html')}>Custom HTML</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('shortcode')}>Shortcode</button>
                        <button className="btn btn-outline-secondary btn-sm text-start" onClick={() => handleAddBlock('interlink')}>Internal Linking</button>
                    </div>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-grow-1 bg-light p-4 position-relative" style={{ overflowY: 'auto' }}>
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                        {blocks.length === 0 ? (
                            <div className="text-center py-5 text-muted border border-dashed rounded bg-white">
                                <p className="mb-0">Your page is empty.</p>
                                <small>Click components on the left to add them here.</small>
                            </div>
                        ) : (
                            <div className="max-w-700 mx-auto" style={{ maxWidth: '800px' }}>
                                {blocks.map((block) => (
                                    <DroppableBlock
                                        key={block.id}
                                        id={block.id}
                                        block={block}
                                        onEdit={(id) => setEditingBlock(id)}
                                        onDelete={handleDeleteBlock}
                                    />
                                ))}
                            </div>
                        )}
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? <div className="card p-3 shadow-lg">{activeId}</div> : null}
                    </DragOverlay>
                </DndContext>
            </div>

            {/* Settings Modal */}
            {editingBlock && (
                <BlockSettingsModal
                    id={editingBlock}
                    block={blocks.find(b => b.id === editingBlock)!}
                    onUpdate={handleUpdateBlock}
                    onClose={() => setEditingBlock(null)}
                />
            )}
        </div>
    );
}
