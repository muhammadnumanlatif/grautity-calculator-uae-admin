'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GratuityResult,
    GratuityInput,
} from '@gratuity/shared/types';
import {
    formatCurrency,
    projectGratuity,
} from '@gratuity/shared/utils';
import { getLatestRates } from '@/lib/currency';

interface CalculatorExpertFeaturesProps {
    input: GratuityInput;
    result: GratuityResult;
}

export default function CalculatorExpertFeatures({
    input,
    result,
}: CalculatorExpertFeaturesProps) {
    const [projectionYears, setProjectionYears] = useState(3);
    const [showProjection, setShowProjection] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('AED');
    const [liveRates, setLiveRates] = useState<Record<string, number>>({});
    const [isLoadingRates, setIsLoadingRates] = useState(false);

    const CURRENCIES = {
        AED: { symbol: 'AED', name: 'UAE Dirham' },
        USD: { symbol: '$', name: 'US Dollar' },
        INR: { symbol: '₹', name: 'Indian Rupee' },
        PKR: { symbol: '₨', name: 'Pakistani Rupee' },
        PHP: { symbol: '₱', name: 'Philippine Peso' },
        GBP: { symbol: '£', name: 'British Pound' },
        EUR: { symbol: '€', name: 'Euro' },
    };

    // Fetch live rates on mount
    useEffect(() => {
        const fetchRates = async () => {
            setIsLoadingRates(true);
            const rates = await getLatestRates('aed');
            setLiveRates(rates);
            setIsLoadingRates(false);
        };
        fetchRates();
    }, []);

    const formatWithCurrency = (amount: number) => {
        const currencyInfo = CURRENCIES[selectedCurrency as keyof typeof CURRENCIES];
        const rate = (selectedCurrency === 'AED') ? 1 : (liveRates[selectedCurrency.toLowerCase()] || 1);
        const convertedAmount = amount * rate;

        if (selectedCurrency === 'AED') {
            return formatCurrency(amount);
        }

        // Use Intl.NumberFormat but handle custom symbols if needed
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurrency === 'PKR' ? 'USD' : selectedCurrency, // PKR often needs USD fallback for formatting
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(convertedAmount)
                .replace('$', currencyInfo.symbol)
                .replace('PKR', currencyInfo.symbol)
                .replace('AED', 'AED ');
        } catch (e) {
            // Fallback manual formatting
            return `${currencyInfo.symbol}${Math.round(convertedAmount).toLocaleString()}`;
        }
    };

    // Calculate projected result
    const projectedResult = useMemo(() => {
        return projectGratuity(input, projectionYears);
    }, [input, projectionYears]);

    // Chart data for breakdown
    const breakdownData = useMemo(() => {
        const total = result.totalGratuity;
        if (total === 0) return [];

        return result.breakdown.map((item, index) => ({
            name: item.period,
            value: item.amount,
            percentage: (item.amount / total) * 100,
            color: index === 0 ? '#0066cc' : '#c9a227',
        }));
    }, [result]);

    return (
        <div className="expert-features mt-4">
            {/* Visual Breakdown Chart */}
            <div className="feature-card mb-4">
                <h5 className="feature-title mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                        <path d="M22 12A10 10 0 0 0 12 2v10z" />
                    </svg>
                    Interactive Contribution Breakdown
                </h5>

                <div className="chart-container">
                    <div className="svg-chart-wrapper">
                        <svg viewBox="0 0 36 36" className="circular-chart" fill="none">
                            <circle cx="18" cy="18" r="15.9155" fill="#ffffff" />
                            <path className="circle-bg"
                                fill="none"
                                stroke="#f0f2f5"
                                strokeWidth="3.2"
                                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            {breakdownData.reduce((acc, item, i) => {
                                let offset = 0;
                                for (let j = 0; j < i; j++) {
                                    offset += (breakdownData[j].value / result.totalGratuity) * 100;
                                }
                                const dashArray = `${item.percentage} ${100 - item.percentage}`;

                                acc.push(
                                    <motion.path
                                        key={item.name}
                                        initial={{ strokeDasharray: '0 100' }}
                                        animate={{ strokeDasharray: dashArray }}
                                        transition={{ duration: 1, delay: i * 0.2 }}
                                        className="circle"
                                        fill="none"
                                        stroke={item.color}
                                        strokeWidth="3.8"
                                        strokeDasharray={dashArray}
                                        strokeDashoffset={-offset}
                                        strokeLinecap="round"
                                        d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                );
                                return acc;
                            }, [] as any)}
                        </svg>
                        <div className="chart-center">
                            <span className="total-label">TOTAL (EST.)</span>
                            <span className="total-amount">{formatWithCurrency(result.totalGratuity)}</span>
                        </div>
                    </div>

                    <div className="chart-legend">
                        <div className="currency-selector-mini mb-3">
                            <label className="small text-muted d-block mb-1">Convert to:</label>
                            <select
                                className="form-select form-select-sm"
                                value={selectedCurrency}
                                onChange={(e) => setSelectedCurrency(e.target.value)}
                                disabled={isLoadingRates}
                            >
                                {Object.entries(CURRENCIES).map(([code, info]) => (
                                    <option key={code} value={code}>
                                        {isLoadingRates && code !== 'AED' ? 'Loading...' : `${code} - ${info.name}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {breakdownData.map((item) => (
                            <div key={item.name} className="legend-item">
                                <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                                <span className="legend-name">{item.name}</span>
                                <span className="legend-value">{item.percentage.toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Future Wealth Projection */}
            <div className="feature-card mb-4 bg-expert-gradient text-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="feature-title mb-0 text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                        </svg>
                        Stay & Earn More (Projection)
                    </h5>
                    <button
                        className="btn btn-sm btn-glass"
                        onClick={() => setShowProjection(!showProjection)}
                    >
                        {showProjection ? 'Hide' : 'Show Projections'}
                    </button>
                </div>

                <AnimatePresence>
                    {showProjection && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="projection-controls"
                        >
                            <p className="small opacity-75 mb-3">
                                Slide to see how much your gratuity grows if you continue your service.
                            </p>

                            <div className="slider-wrapper mb-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="small fw-bold">Additional Years: {projectionYears}</span>
                                    <span className="small fw-bold text-secondary-light">+{formatWithCurrency(projectedResult.totalGratuity - result.totalGratuity)} Growth</span>
                                </div>
                                <input
                                    type="range"
                                    className="form-range custom-slider"
                                    min="1"
                                    max="10"
                                    step="1"
                                    value={projectionYears}
                                    onChange={(e) => setProjectionYears(parseInt(e.target.value))}
                                />
                                <div className="d-flex justify-content-between mt-1">
                                    <span className="small opacity-50">1 Year</span>
                                    <span className="small opacity-50">10 Years</span>
                                </div>
                            </div>

                            <div className="projected-summary p-3 rounded bg-white-10">
                                <div className="row align-items-center">
                                    <div className="col-8">
                                        <span className="d-block small opacity-75">Projected Gratuity in {projectionYears} Years</span>
                                        <span className="h4 mb-0 fw-bold">{formatWithCurrency(projectedResult.totalGratuity)}</span>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div className="growth-badge">
                                            {((projectedResult.totalGratuity / result.totalGratuity - 1) * 100).toFixed(0)}% Growth
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center py-2" onClick={() => window.print()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Report (PDF)
                </button>
                <button className="btn btn-secondary text-white px-3" onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: 'My UAE Gratuity Calculation',
                            text: `My estimated gratuity is ${formatCurrency(result.totalGratuity)}. Calculate yours at GratuityCalculator.ae`,
                            url: window.location.href
                        });
                    }
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
        .feature-card {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid #e9ecef;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .bg-expert-gradient {
          background: linear-gradient(135deg, #004d99 0%, #002b55 100%);
          border: none;
        }

        .feature-title {
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
        }

        .chart-container {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .svg-chart-wrapper {
          width: 150px;
          height: 150px;
          position: relative;
        }

        .circular-chart {
          display: block;
          max-width: 100%;
          max-height: 100%;
        }

        .circle-bg {
          fill: none;
          stroke: #eee;
          stroke-width: 3.8;
        }

        .circle {
          fill: none;
          stroke-width: 3.8;
          stroke-linecap: round;
        }

        .chart-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
        }

        .total-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #6c757d;
        }

        .total-amount {
          display: block;
          font-weight: 800;
          font-size: 1rem;
          color: #003366;
          line-height: 1.2;
        }

        .chart-legend {
          flex: 1;
        }

        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          margin-right: 8px;
        }

        .legend-name {
          flex: 1;
          color: #495057;
        }

        .legend-value {
          font-weight: 700;
          color: #212529;
        }

        .btn-glass {
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(4px);
        }

        .btn-glass:hover {
          background: rgba(255,255,255,0.2);
          color: white;
        }

        .custom-slider {
          height: 6px;
          background: rgba(255,255,255,0.2);
        }

        .custom-slider::-webkit-slider-thumb {
          background: #c9a227;
          border: 2px solid white;
        }

        .bg-white-10 {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .growth-badge {
          display: inline-block;
          background: #198754;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        @media (max-width: 576px) {
          .chart-container {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .svg-chart-wrapper {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
        </div>
    );
}
