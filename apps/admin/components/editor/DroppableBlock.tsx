'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageBlock } from '@gratuity/shared';

interface DroppableBlockProps {
    id: string;
    block: PageBlock;
    onEdit: (id: string, block: PageBlock) => void;
    onDelete: (id: string) => void;
}

export default function DroppableBlock({ id, block, onEdit, onDelete }: DroppableBlockProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        minHeight: '80px',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="card mb-3 position-relative group"
        >
            <div
                className="card-header d-flex justify-content-between align-items-center bg-light"
                {...attributes}
                {...listeners}
                style={{ cursor: 'grab' }}
            >
                <span className="badge bg-secondary text-capitalize">{block.type}</span>
                <div className="btn-group btn-group-sm">
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(id);
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div
                className="card-body"
                onClick={() => onEdit(id, block)}
                style={{ cursor: 'pointer' }}
            >
                <div className="text-truncate">
                    {renderBlockPreview(block)}
                </div>
            </div>
        </div>
    );
}

function renderBlockPreview(block: PageBlock) {
    switch (block.type) {
        case 'hero':
            return <h5 className="text-muted">{block.data.title || 'Hero Title'}</h5>;
        case 'calculator':
            return <div className="alert alert-info py-2 m-0">Calculator Component</div>;
        case 'rich-text':
            // Strip HTML for preview
            const text = block.data.content?.replace(/<[^>]*>?/gm, '') || 'Empty text block';
            return <p className="mb-0 text-muted small">{text.substring(0, 100)}...</p>;
        case 'faq':
            return <div className="text-muted">{block.data.items?.length || 0} FAQ Items</div>;
        default:
            return <span className="text-muted fst-italic">Configure {block.type} block</span>;
    }
}
