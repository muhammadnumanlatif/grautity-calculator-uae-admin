'use client';

import React, { useState } from 'react';
import { PageBlock } from '@gratuity/shared';

interface BlockSettingsProps {
    id: string;
    block: PageBlock;
    onUpdate: (id: string, updatedBlock: PageBlock) => void;
    onClose: () => void;
}

export default function BlockSettingsModal({ id, block, onUpdate, onClose }: BlockSettingsProps) {
    const [data, setData] = useState<any>(block.data || {});

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const parsed = JSON.parse(e.target.value);
            setData(parsed);
        } catch (err) {
            // Allow invalid JSON while typing
        }
    };

    const handleSave = () => {
        onUpdate(id, { ...block, data });
        onClose();
    };

    return (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex={-1}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-capitalize">Edit {block.type} Block</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/* 
                In a full version, we would have specific form fields for each block type. 
                For MVP, we use a JSON editor + specific critical fields.
             */}
                        <div className="mb-3">
                            <label className="form-label">Block Configuration (JSON)</label>
                            <textarea
                                className="form-control font-monospace smaller"
                                rows={10}
                                defaultValue={JSON.stringify(data, null, 2)}
                                onChange={handleJsonChange}
                            ></textarea>
                            <div className="form-text">Directly edit the JSON configuration for this block.</div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Update Block</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
