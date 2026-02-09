'use client';

import { useState, useEffect } from 'react';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { getDocuments, COLLECTIONS } from '@gratuity/firebase-config/firestore';
import { CalculationLog } from '@gratuity/shared/types';

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCalculations: 0,
        monthlyGrowth: '+12.5%',
        avgGratuity: 'AED 45,200',
        activeUsers: '1,240'
    });

    // Mock data for charts
    const timelineData = [
        { date: 'Jan 01', volume: 450, unique: 380 },
        { date: 'Jan 05', volume: 520, unique: 410 },
        { date: 'Jan 10', volume: 480, unique: 390 },
        { date: 'Jan 15', volume: 610, unique: 500 },
        { date: 'Jan 20', volume: 720, unique: 580 },
        { date: 'Jan 25', volume: 850, unique: 690 },
        { date: 'Jan 30', volume: 980, unique: 810 },
    ];

    const distributionData = [
        { name: 'Unlimited', value: 65, color: '#0066cc' },
        { name: 'Limited', value: 35, color: '#00d2ff' },
    ];

    const locationData = [
        { name: 'Dubai', count: 1200 },
        { name: 'Abu Dhabi', count: 850 },
        { name: 'Sharjah', count: 420 },
        { name: 'DIFC', count: 310 },
        { name: 'ADGM', count: 180 },
    ];

    useEffect(() => {
        const fetchRealData = async () => {
            try {
                const logs = await getDocuments<CalculationLog>(COLLECTIONS.CALCULATIONS);
                if (logs.length > 0) {
                    setStats(prev => ({
                        ...prev,
                        totalCalculations: logs.length
                    }));
                } else {
                    setStats(prev => ({
                        ...prev,
                        totalCalculations: 24500 // Mock for demo
                    }));
                }
            } catch (err) {
                console.error('Analytics fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRealData();
    }, []);

    if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h3 fw-bold mb-1">Performance Analytics</h1>
                    <p className="text-muted small mb-0">Deep dive into user behavior and calculation trends.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm">Export Report</button>
                    <button className="btn btn-primary btn-sm">Last 30 Days</button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Calculations', value: stats.totalCalculations.toLocaleString(), trend: '+15%', icon: '📈' },
                    { label: 'Monthly Growth', value: stats.monthlyGrowth, trend: '+2.4%', icon: '🚀' },
                    { label: 'Avg. Gratuity Value', value: stats.avgGratuity, trend: '-AED 500', icon: '💰' },
                    { label: 'Estimated Reach', value: stats.activeUsers, trend: '+402', icon: '👥' },
                ].map((stat, i) => (
                    <div key={i} className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted x-small uppercase fw-bold">{stat.label}</span>
                                <span className="small text-success fw-bold">{stat.trend}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fs-3">{stat.icon}</span>
                                <span className="h3 mb-0 fw-bold">{stat.value}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                {/* Volume Chart */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">Engagement Timeline</h5>
                            <div className="d-flex gap-3 small">
                                <div className="d-flex align-items-center gap-1">
                                    <span className="dot bg-primary"></span> Total Volume
                                </div>
                                <div className="d-flex align-items-center gap-1">
                                    <span className="dot" style={{ backgroundColor: '#00d2ff' }}></span> Unique Users
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: 350 }}>
                            <ResponsiveContainer>
                                <AreaChart data={timelineData}>
                                    <defs>
                                        <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0066cc" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#0066cc" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="volume" stroke="#0066cc" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
                                    <Area type="monotone" dataKey="unique" stroke="#00d2ff" strokeWidth={3} fillOpacity={0} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Contract Distribution */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                        <h5 className="fw-bold mb-4">Contract Type split</h5>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-3">
                            {distributionData.map((item, i) => (
                                <div key={i} className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="dot" style={{ backgroundColor: item.color }}></span>
                                        <span className="small fw-bold">{item.name}</span>
                                    </div>
                                    <span className="small text-muted">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Location Popularity */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-4">Top Regions by Calculation</h5>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={locationData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fw: 'bold' }} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#0066cc" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Device Breakdown (Mock) */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-4">Device & Browser</h5>
                        <div className="row g-3">
                            {[
                                { label: 'Mobile (iOS/Android)', value: '72%', icon: '📱', color: 'bg-primary' },
                                { label: 'Desktop (Chrome/Safari)', value: '25%', icon: '💻', color: 'bg-info' },
                                { label: 'Tablet', value: '3%', icon: '📟', color: 'bg-secondary' },
                            ].map((device, i) => (
                                <div key={i} className="col-12">
                                    <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <span className="fs-4">{device.icon}</span>
                                            <div>
                                                <div className="fw-bold small">{device.label}</div>
                                                <div className="progress mt-1" style={{ height: 4, width: 150 }}>
                                                    <div className={`progress-bar ${device.color}`} style={{ width: device.value }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="fw-bold">{device.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .x-small { font-size: 0.7rem; }
                .uppercase { text-transform: uppercase; }
                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    display: inline-block;
                }
            `}</style>
        </div>
    );
}
