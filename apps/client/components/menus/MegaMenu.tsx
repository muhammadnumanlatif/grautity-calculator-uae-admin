import Link from 'next/link';
import { UAE_EMIRATES, DUBAI_AREAS, ABU_DHABI_AREAS, SHARJAH_AREAS } from '@gratuity/shared';

interface MegaMenuProps {
    context?: string;
    onClose?: () => void;
}

export function MegaMenu({ context, onClose }: MegaMenuProps) {
    if (context === 'emirates_grid') {
        return <EmiratesGrid onClose={onClose} />;
    }

    if (context === 'calculators_list') {
        return <CalculatorsList onClose={onClose} />;
    }

    if (context === 'services_columns') {
        return <ServicesColumns onClose={onClose} />;
    }

    return <div className="p-4 text-muted text-center">Select a layout to see content</div>;
}

function EmiratesGrid({ onClose }: { onClose?: () => void }) {
    const emirates = Object.entries(UAE_EMIRATES);

    return (
        <div className="container-fluid p-4">
            <div className="row g-4">
                {emirates.map(([key, emirate]) => (
                    <div key={key} className="col-lg-4 col-md-6">
                        <div className="emirate-card h-100 p-3 rounded-3 bg-light hover-shadow transition-all">
                            <Link
                                href={`/${emirate.slug}`}
                                className="d-flex align-items-center justify-content-between text-decoration-none text-dark mb-3"
                                onClick={onClose}
                            >
                                <h6 className="fw-bold mb-0 fs-5">{emirate.name}</h6>
                                <span className="text-primary">→</span>
                            </Link>

                            <div className="areas-list">
                                <div className="text-secondary x-small fw-bold text-uppercase mb-2 ls-1">Popular Areas</div>
                                <div className="d-flex flex-wrap gap-2">
                                    {key === 'dubai' && DUBAI_AREAS.slice(0, 4).map((area) => (
                                        <AreaLink key={area.slug} href={`/dubai/${area.slug}`} name={area.name} onClose={onClose} />
                                    ))}
                                    {key === 'abu-dhabi' && ABU_DHABI_AREAS.slice(0, 4).map((area) => (
                                        <AreaLink key={area.slug} href={`/abu-dhabi/${area.slug}`} name={area.name} onClose={onClose} />
                                    ))}
                                    {key === 'sharjah' && SHARJAH_AREAS.slice(0, 4).map((area) => (
                                        <AreaLink key={area.slug} href={`/sharjah/${area.slug}`} name={area.name} onClose={onClose} />
                                    ))}
                                    {['ajman', 'ras-al-khaimah', 'fujairah', 'umm-al-quwain'].includes(key) && (
                                        <span className="text-muted small fst-italic">Coming soon...</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
        .hover-shadow:hover { box-shadow: 0 10px 20px rgba(0,0,0,0.05); transform: translateY(-2px); background: white !important; }
        .transition-all { transition: all 0.2s ease; }
        .ls-1 { letter-spacing: 0.5px; }
        .x-small { font-size: 0.7rem; }
      `}</style>
        </div>
    );
}

function AreaLink({ href, name, onClose }: { href: string, name: string, onClose?: () => void }) {
    return (
        <Link
            href={href}
            className="badge bg-white text-secondary border fw-normal text-decoration-none hover-primary"
            onClick={onClose}
        >
            {name}
        </Link>
    );
}

function CalculatorsList({ onClose }: { onClose?: () => void }) {
    const calculators = [
        { name: 'Gratuity Calculator', description: 'Standard UAE end of service calculator', url: '/', icon: '🧮' },
        { name: 'MOHRE Calculator', description: 'Official Ministry formula check', url: '/mohre-calculator', icon: '📊' },
        { name: 'Unlimited Contract', description: 'For old unlimited term contracts', url: '/unlimited-contract', icon: '♾️' },
        { name: 'Limited Contract', description: 'Fixed term contract calculations', url: '/limited-contract', icon: '📄' },
        { name: 'DIFC Gratuity', description: 'Dubai International Financial Centre rules', url: '/dubai/free-zones/difc', icon: '🏢' },
        { name: 'ADGM Gratuity', description: 'Abu Dhabi Global Market policies', url: '/abu-dhabi/free-zones/adgm', icon: '🏛️' },
    ];

    return (
        <div className="container-fluid p-4">
            <div className="row g-3">
                {calculators.map((calc) => (
                    <div key={calc.url} className="col-md-6 col-lg-4">
                        <Link
                            href={calc.url}
                            className="d-flex align-items-start gap-3 text-decoration-none p-3 rounded-3 hover-bg-light transition-all h-100 border border-transparent hover-border"
                            onClick={onClose}
                        >
                            <div className="icon-box bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}>
                                {calc.icon}
                            </div>
                            <div>
                                <h6 className="fw-bold text-dark mb-1">{calc.name}</h6>
                                <p className="text-secondary small mb-0 lh-sm">{calc.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <style jsx>{`
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .hover-border:hover { border-color: #dee2e6 !important; }
        .transition-all { transition: all 0.2s ease; }
      `}</style>
        </div>
    );
}

function ServicesColumns({ onClose }: { onClose?: () => void }) {
    return (
        <div className="container-fluid p-4">
            <div className="row g-5">
                <div className="col-md-3 border-end">
                    <h6 className="fw-bold mb-3 text-primary text-uppercase small ls-1">Calculators</h6>
                    <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        <li><MenuLink href="/" label="Gratuity Calculator" onClose={onClose} /></li>
                        <li><MenuLink href="/mohre-calculator" label="MOHRE Calculator" onClose={onClose} /></li>
                        <li><MenuLink href="/unlimited-contract" label="Unlimited Contract" onClose={onClose} /></li>
                        <li><MenuLink href="/limited-contract" label="Limited Contract" onClose={onClose} /></li>
                    </ul>
                </div>
                <div className="col-md-3 border-end">
                    <h6 className="fw-bold mb-3 text-primary text-uppercase small ls-1">Popular Free Zones</h6>
                    <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        <li><MenuLink href="/dubai/free-zones/difc" label="DIFC (Dubai)" onClose={onClose} /></li>
                        <li><MenuLink href="/dubai/free-zones/dmcc" label="DMCC (Dubai)" onClose={onClose} /></li>
                        <li><MenuLink href="/abu-dhabi/free-zones/adgm" label="ADGM (Abu Dhabi)" onClose={onClose} /></li>
                        <li><MenuLink href="/sharjah/free-zones/shams" label="Shams (Sharjah)" onClose={onClose} /></li>
                    </ul>
                </div>
                <div className="col-md-3 border-end">
                    <h6 className="fw-bold mb-3 text-primary text-uppercase small ls-1">Resources</h6>
                    <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        <li><MenuLink href="/blog" label="Latest Articles" onClose={onClose} /></li>
                        <li><MenuLink href="/faq" label="Common Questions" onClose={onClose} /></li>
                        <li><MenuLink href="/glossary" label="Legal Terms" onClose={onClose} /></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <div className="bg-light p-4 rounded-3 h-100 d-flex flex-column justify-content-center text-center">
                        <h6 className="fw-bold mb-2">Need Expert Help?</h6>
                        <p className="text-secondary small mb-3">Get professional advice on your gratuity calculation.</p>
                        <Link href="/contact" className="btn btn-primary btn-sm rounded-pill" onClick={onClose}>Contact Support</Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .ls-1 { letter-spacing: 1px; }
      `}</style>
        </div>
    );
}

function MenuLink({ href, label, onClose }: { href: string, label: string, onClose?: () => void }) {
    return (
        <Link
            href={href}
            className="text-decoration-none text-secondary hover-primary transition-colors d-block py-1"
            onClick={onClose}
        >
            {label}
        </Link>
    );
}
