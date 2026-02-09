'use client';

import { useState } from 'react';
import { MenuItem } from '@gratuity/shared/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface MenuEditorProps {
    items: MenuItem[];
    onChange: (items: MenuItem[]) => void;
}

export default function MenuEditor({ items, onChange }: MenuEditorProps) {
    const [localItems, setLocalItems] = useState<MenuItem[]>(items);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const newItems = Array.from(localItems);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setLocalItems(newItems);
        onChange(newItems);
    };

    const addMenuItem = () => {
        const newItem: MenuItem = {
            id: Date.now().toString(),
            label: 'New Link',
            url: '/',
            type: 'link',
            target: '_self',
        };
        const newItems = [...localItems, newItem];
        setLocalItems(newItems);
        onChange(newItems);
    };

    const updateItem = (id: string, updates: Partial<MenuItem>) => {
        const newItems = localItems.map(item =>
            item.id === id ? { ...item, ...updates } : item
        );
        setLocalItems(newItems);
        onChange(newItems);
    };

    const deleteItem = (id: string) => {
        const newItems = localItems.filter(item => item.id !== id);
        setLocalItems(newItems);
        onChange(newItems);
    };

    const addChildItem = (parentId: string) => {
        const newChild: MenuItem = {
            id: `${parentId}_child_${Date.now()}`,
            label: 'New Child Link',
            url: '/',
            type: 'link',
            target: '_self',
        };

        const newItems = localItems.map(item => {
            if (item.id === parentId) {
                return {
                    ...item,
                    children: [...(item.children || []), newChild]
                };
            }
            return item;
        });

        setLocalItems(newItems);
        onChange(newItems);
    };

    const updateChildItem = (parentId: string, childId: string, updates: Partial<MenuItem>) => {
        const newItems = localItems.map(item => {
            if (item.id === parentId && item.children) {
                return {
                    ...item,
                    children: item.children.map(child =>
                        child.id === childId ? { ...child, ...updates } : child
                    )
                };
            }
            return item;
        });

        setLocalItems(newItems);
        onChange(newItems);
    };

    const deleteChildItem = (parentId: string, childId: string) => {
        const newItems = localItems.map(item => {
            if (item.id === parentId && item.children) {
                return {
                    ...item,
                    children: item.children.filter(child => child.id !== childId)
                };
            }
            return item;
        });

        setLocalItems(newItems);
        onChange(newItems);
    };

    return (
        <div className="menu-editor">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Menu Structure</h5>
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={addMenuItem}>
                    + Add Item
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="menu-items">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="menu-list">
                            {localItems.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="card mb-2 p-3 border shadow-sm"
                                        >
                                            <div className="d-flex gap-2 align-items-center mb-2">
                                                <span className="text-muted">☰</span>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={item.label}
                                                    onChange={(e) => updateItem(item.id, { label: e.target.value })}
                                                    placeholder="Label"
                                                />
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={item.type}
                                                    onChange={(e) => updateItem(item.id, { type: e.target.value as any })}
                                                    style={{ width: '120px' }}
                                                >
                                                    <option value="link">Link</option>
                                                    <option value="dropdown">Dropdown</option>
                                                    <option value="mega_menu">Mega Menu</option>
                                                    <option value="button">Button</option>
                                                </select>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-text text-danger"
                                                    onClick={() => deleteItem(item.id)}
                                                >
                                                    ×
                                                </button>
                                            </div>

                                            {/* Details based on type */}
                                            <div className="row g-2 ps-4">
                                                {item.type !== 'dropdown' && item.type !== 'mega_menu' && (
                                                    <div className="col-md-8">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            value={item.url || ''}
                                                            onChange={(e) => updateItem(item.id, { url: e.target.value })}
                                                            placeholder="URL (e.g., /about)"
                                                        />
                                                    </div>
                                                )}

                                                {item.type === 'mega_menu' && (
                                                    <div className="col-md-12">
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={item.megaMenuContext || ''}
                                                            onChange={(e) => updateItem(item.id, { megaMenuContext: e.target.value as any })}
                                                        >
                                                            <option value="">Select Mega Menu Layout...</option>
                                                            <option value="emirates_grid">Emirates Grid</option>
                                                            <option value="calculators_list">Calculators List</option>
                                                            <option value="services_columns">Services Columns</option>
                                                        </select>
                                                    </div>
                                                )}

                                                <div className="col-md-4">
                                                    <div className="form-check form-switch mt-1">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`target-${item.id}`}
                                                            checked={item.target === '_blank'}
                                                            onChange={(e) => updateItem(item.id, { target: e.target.checked ? '_blank' : '_self' })}
                                                        />
                                                        <label className="form-check-label small" htmlFor={`target-${item.id}`}>
                                                            New Tab
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Nested children for dropdown */}
                                            {item.type === 'dropdown' && (
                                                <div className="mt-2 ps-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary mb-2"
                                                        onClick={() => addChildItem(item.id)}
                                                    >
                                                        + Add Child Item
                                                    </button>
                                                    {item.children && item.children.length > 0 && (
                                                        <div className="border-start ps-3">
                                                            {item.children.map((child) => (
                                                                <div key={child.id} className="card mb-2 p-2 bg-light">
                                                                    <div className="d-flex gap-2 align-items-center">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-sm"
                                                                            value={child.label}
                                                                            onChange={(e) => updateChildItem(item.id, child.id, { label: e.target.value })}
                                                                            placeholder="Child Label"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-sm"
                                                                            value={child.url || ''}
                                                                            onChange={(e) => updateChildItem(item.id, child.id, { url: e.target.value })}
                                                                            placeholder="URL"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-text text-danger"
                                                                            onClick={() => deleteChildItem(item.id, child.id)}
                                                                        >
                                                                            ×
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
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

            {localItems.length === 0 && (
                <div className="text-center py-4 text-muted bg-light rounded">
                    No items yet. Click "Add Item" to start building your menu.
                </div>
            )}
        </div>
    );
}
