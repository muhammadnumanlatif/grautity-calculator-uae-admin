'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDocuments, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { Location } from '@gratuity/shared/types';

export default function LocationsManager() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [emirateFilter, setEmirateFilter] = useState('all');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await getDocuments<Location>(COLLECTIONS.LOCATIONS);
                setLocations(data);
            } catch (err) {
                console.error('Failed to fetch locations:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    const filteredLocations = locations.filter(loc => {
        const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loc.slug.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEmirate = emirateFilter === 'all' || loc.emirate === emirateFilter;
        return matchesSearch && matchesEmirate;
    });

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">Location Landing Pages</h1>
                    <p className="text-muted small mb-0">Manage SEO context for Emirates, Areas, and Free Zones</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary">Bulk Import</button>
                    <Link href="/dashboard/locations/new" className="btn btn-primary">Add Location</Link>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white py-3 border-bottom border-light">
                    <div className="row g-2">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select form-select-sm bg-light border-0"
                                value={emirateFilter}
                                onChange={(e) => setEmirateFilter(e.target.value)}
                            >
                                <option value="all">All Emirates</option>
                                <option value="dubai">Dubai</option>
                                <option value="abu-dhabi">Abu Dhabi</option>
                                <option value="sharjah">Sharjah</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="table-responsive" style={{ maxHeight: '600px' }}>
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light sticky-top">
                            <tr>
                                <th className="px-4">Name</th>
                                <th>Emirate</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>SEO Score</th>
                                <th className="px-4 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-5">Loading locations...</td></tr>
                            ) : filteredLocations.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-5 text-muted">No locations found.</td></tr>
                            ) : (
                                filteredLocations.map((loc) => (
                                    <tr key={loc.id}>
                                        <td className="px-4">
                                            <div className="fw-bold">{loc.name}</div>
                                            <code className="x-small text-muted">/{loc.emirate}/{loc.slug}</code>
                                        </td>
                                        <td><span className="text-capitalize">{loc.emirate.replace('-', ' ')}</span></td>
                                        <td><span className="badge bg-light text-dark border">{loc.type}</span></td>
                                        <td>
                                            <span className={`badge ${loc.status === 'published' ? 'bg-success' : 'bg-secondary'}`}>
                                                {loc.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="small fw-bold">{loc.seo?.seoScore || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 text-end">
                                            <Link href={`/dashboard/locations/edit/${loc.id}`} className="btn btn-sm btn-link text-primary text-decoration-none">Edit</Link>
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
