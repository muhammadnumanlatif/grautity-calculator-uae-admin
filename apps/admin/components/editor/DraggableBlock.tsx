'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableBlockProps {
    type: string;
    label: string;
    icon?: React.ReactNode;
}

export default function DraggableBlock({ type, label, icon }: DraggableBlockProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${type}`,
        data: { type, isNew: true },
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="list-group-item list-group-item-action curser-move d-flex align-items-center gap-2"
        >
            {icon}
            <span>{label}</span>
        </div>
    );
}
