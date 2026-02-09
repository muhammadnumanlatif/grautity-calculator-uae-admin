'use client';

import { useState, useEffect } from 'react';
import { getDocuments, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { User } from '@gratuity/shared/types';
import { toast } from 'react-hot-toast';

export default function UsersManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getDocuments<User>(COLLECTIONS.USERS);
                setUsers(data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
                toast.error('Failed to load user database');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">User Management</h1>
                    <p className="text-muted small mb-0">Manage administrative access and roles.</p>
                </div>
                <button className="btn btn-primary d-flex align-items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" y1="8" x2="19" y2="14" />
                        <line x1="16" y1="11" x2="22" y2="11" />
                    </svg>
                    Invite Admin
                </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white py-3">
                    <div className="row">
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control bg-light border-0"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="px-4">User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th className="px-4 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-5">Loading users...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-5 text-muted">No users found.</td></tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="avatar bg-primary-subtle text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                                    {user.displayName?.[0] || user.email[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{user.displayName || 'No Name Set'}</div>
                                                    <div className="text-muted small">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill ${user.role === 'admin' ? 'bg-danger-subtle text-danger' : 'bg-primary-subtle text-primary'}`}>
                                                {user.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td><span className="badge bg-success">Active</span></td>
                                        <td className="small text-muted">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 text-end">
                                            <button className="btn btn-sm btn-outline-secondary me-2">Edit</button>
                                            <button className="btn btn-sm btn-link text-danger text-decoration-none">Revoke</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
